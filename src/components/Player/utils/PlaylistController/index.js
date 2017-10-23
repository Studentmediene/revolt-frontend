export default class PlaylistController {
  constructor(playlist = [], position = 0) {
    this.playlist = playlist;
    this.position = position;
  }

  getPlaylist() {
    return this.playlist;
  }

  setPosition(pos) {
    if (pos < this.playlist.length && pos >= 0) {
      this.position = pos;
    }
  }

  getPosition() {
    return this.position;
  }

  getNext() {
    if (this.playlist.length < 1) {
      return null;
    }

    if (this.playlist.length < this.position + 2) {
      return null;
    }

    this.position++;

    return this.playlist[this.position];
  }

  getPrevious() {
    if (this.playlist.length < 1) {
      return null;
    }

    if (this.position - 1 < 0) {
      return null;
    }

    this.position--;

    return this.playlist[this.position];
  }

  get(index) {
    if (index >= this.playlist.length || index < 0) {
      return null;
    }

    this.position = index;

    return this.playlist[this.position];
  }

  getCurrent() {
    if (this.playlist.length < 1) {
      return null;
    }

    return this.playlist[this.position];
  }

  addShow(show) {
    this.playlist.push(show);
  }

  clearPlaylist() {
    this.playlist = [];
  }
}
