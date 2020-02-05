import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
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
    radioEditor: PropTypes.string,
    chiefEditor: PropTypes.string,
    musicProducer: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadFooter: PropTypes.func.isRequired,
  };

  static async getInitialProps({ store, isServer }) {
    if (isServer) {
      store.dispatch(loadFooter());
    }

    return { isServer };
  }

  render() {
    let { radioEditor, chiefEditor, musicProducer } = this.props;

    return (
      <footer className={styles.footer}>
        <div className={styles.content}>
          <p>
            Denne tjenesten tilbys av Studentmediene i Trondheim AS. Musikken er
            gjengitt med tillatelse fra TONO/NCB.
            <br />
            Uautorisert lenking, videreføring eller kopiering er ulovlig.
          </p>
          <span className={styles.vtSupportText}>
            Radio Revolt er laget med støtte fra Velferdstinget
          </span>
          <a
            href="https://velferdstinget.no/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/vt-logo.svg"
              className={styles.vtLogo}
              alt="Velferdstinget logo"
            ></img>
          </a>
        </div>
        <div className={styles.content}>
          <h2 className={styles.contactHeader}>Kontakt oss</h2>
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
          <Link href="/om">
            <a className={styles.footerLink} href="/om">
              Om oss
            </a>
          </Link>
          <Link href="/personvern">
            <a className={styles.footerLink} href="/personvern">
              Personvern
            </a>
          </Link>
          <p>{new Date().getFullYear()} © Radio Revolt</p>
        </div>
      </footer>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
