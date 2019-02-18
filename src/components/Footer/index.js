import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { loadFooter } from './actions';
import {
  selectChiefEditor,
  selectRadioEditor,
  selectMusicProducer,
  selectFooterLoading,
  selectFooterError,
} from './selectors';

import styles from './styles.scss';
import SocialMediaContainer from 'components/common/container/SocialMediaContainer';

export class Footer extends React.Component {
  static propTypes = {
    radioEditor: PropTypes.string.isRequired,
    chiefEditor: PropTypes.string.isRequired,
    musicProducer: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadFooter: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadFooter();
  }

  render() {
    let { radioEditor, chiefEditor, musicProducer } = this.props;

    return (
      <div className={styles.footer}>
        <div className={styles.content}>
          <div>
            Denne tjenesten tilbys av Studentmediene i Trondheim AS. Musikken er
            gjengitt med tilatelse fra TONO/NCB.
          </div>
          <div>
            Uautorisert lenking, videreføring eller kopiering er ulovlig.
          </div>
          <br />
          <div className={styles.bold}>Kontakt oss</div>
          <a
            className={styles.footerLink}
            href="mailto:radioredaktor@studentmediene.no"
          >
            Radioredaktør: {radioEditor}
          </a>
          <a
            className={styles.footerLink}
            href="mailto:ansvarligredaktor@studentmediene.no"
          >
            Ansvarlig redaktør: {chiefEditor}
          </a>
          <a
            className={styles.footerLink}
            href="mailto:musikkprodusent@studentmediene.no"
          >
            Musikkprodusent: {musicProducer}
          </a>
          <br />
          <div className={styles.socialMediaLinks}>
            <SocialMediaContainer />
            <br />
          </div>
          <Link className={styles.footerLink} to="/om">
            Om oss
          </Link>
          <Link className={styles.footerLink} to="/personvern">
            Personvern
          </Link>
          <p>{new Date().getFullYear()} © Radio Revolt</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  chiefEditor: selectChiefEditor(),
  radioEditor: selectRadioEditor(),
  musicProducer: selectMusicProducer(),
  loading: selectFooterLoading(),
  error: selectFooterError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadFooter: () => dispatch(loadFooter()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
