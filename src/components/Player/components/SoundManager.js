import { Component } from 'react';
import PropTypes from 'prop-types';

export default class SoundManager extends Component {
  constructor(props) {
    super(props);

    // Stores the soundmanager sound object
    this.soundObject = null;
    this.sound = null;
    this.soundManager = null;
  }

  static async getInitialProps({ isServer }) {
    return { isServer };
  }

  async componentDidMount() {
    if (!this.props.isServer) {
      const soundManagerModule = await import('soundmanager2');
      this.soundManager = soundManagerModule.soundManager;
      this.soundManager.setup({
        preferFlash: false,
        debugMode: false,
        html5PollingInterval: 50,
      });
    }
  }

  componentWillUnmount() {
    // stop the audio (we can't know when garbage collection will run)
    this.soundManager.stopAll();
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.setupSound();
    }
    this.updateSound(prevProps);
  }

  updateSound(prevProps) {
    if (!this.soundObject) {
      // Sound manager is not ready
      return;
    }
    if (this.soundObject.playState === 0) {
      if (!this.props.paused) {
        this.play();
      } else {
        // No audio has been loaded
        return;
      }
    } else if (this.props.paused) {
      this.pause();
    } else {
      this.resume();
    }

    if (this.props.position != null) {
      // Stolen from react-sound
      const position = this.props.position;
      const soundPosition = this.soundObject.position;
      if (
        soundPosition !== position &&
        Math.round(soundPosition) !== Math.round(position)
      ) {
        this.soundObject.setPosition(position);
      }
    }

    if (this.props.volume !== prevProps.volume) {
      this.soundObject.setVolume(this.props.volume);
    }
  }

  play() {
    this.soundObject.play();
  }

  resume() {
    if (this.soundObject.paused) {
      this.soundObject.resume();
    }
  }

  pause() {
    if (!this.soundObject.paused) {
      this.soundObject.pause();
    }
  }

  setupSound() {
    if (this.props.url === null) {
      return;
    }
    if (this.soundObject) {
      try {
        this.soundObject.destruct();
      } catch (e) {
        // For now we just fail silently
      }
    }
    // Create a new sound object
    const props = this.props;
    this.soundObject = this.soundManager.createSound({
      url: props.url,
      volume: props.volume,
      whileplaying() {
        props.whilePlaying(this);
      },
      onplay() {
        props.onPlay(this);
      },
      onpause() {
        props.onPause(this);
      },
      onresume() {
        props.onResume(this);
      },
      onstop() {
        props.onStop(this);
      },
      onfinish() {
        props.onFinishedPlaying(this);
      },
      onload() {
        props.onStop(this);
      },
      onerror() {
        props.onError(this);
      },
    });
  }

  render() {
    return null;
  }
}

// Inspired by https://www.npmjs.com/package/react-sound
SoundManager.propTypes = {
  isServer: PropTypes.bool,
  url: PropTypes.string,
  paused: PropTypes.bool.isRequired,
  position: PropTypes.number,
  volume: PropTypes.number.isRequired,
  whilePlaying: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onStop: PropTypes.func,
  onFinishedPlaying: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

SoundManager.defaultProps = {
  url: null,
  position: 0,
  whilePlaying: () => {},
  onPlay: () => {},
  onPause: () => {},
  onResume: () => {},
  onStop: () => {},
  onFinishedPlaying: () => {},
  onLoad: () => {},
  onError: () => {},
};
