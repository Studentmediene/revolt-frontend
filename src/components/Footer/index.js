import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { loadFooter } from './actions';
import {
  selectChiefEditor,
  selectRadioEditor,
  selectFooterLoading,
  selectFooterError,
} from './selectors';

import styles from './styles.scss';
import SocialMediaContainer from 'components/common/container/SocialMediaContainer';

export class Footer extends React.Component {
  static propTypes = {
    radioEditor: PropTypes.string.isRequired,
    chiefEditor: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadFooter: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadFooter();
  }

  render() {
    let radioEditor = this.props.radioEditor;
    let chiefEditor = this.props.chiefEditor;

    if (this.props.loading) {
      radioEditor = 'Laster inn...';
      chiefEditor = 'Laster inn...';
    } else if (this.props.error) {
      radioEditor = 'Feil ved innlasting, prøv igjen senere';
      chiefEditor = 'Feil ved innlasting, prøv igjen senere';
    }

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
          <div>Radioredaktør: {radioEditor}</div>
          <div>Ansvarlig redaktør: {chiefEditor}</div>
          <br />
          <div className={styles.socialMediaLinks}>
            <SocialMediaContainer />
            <br />
          </div>
          <a
            className={styles.footerLink}
            href="mailto:redaktor@radiorevolt.no"
          >
            Kontakt oss
          </a>
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
  loading: selectFooterLoading(),
  error: selectFooterError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadFooter: () => dispatch(loadFooter()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
