import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

import styles from './styles.scss';

import logo from 'components/Header/Logo/RR_logo.png';

export class NavDrawer extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    links: PropTypes.array.isRequired,
    onNavigation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.navigate = this.navigate.bind(this);
    this.preventInteraction = this.preventInteraction.bind(this);
  }

  navigate(e, destination) {
    this.props.onNavigation(e);
    this.props.navigate(destination);
    // Stop browser from acting on the link click
    return false;
  }

  preventInteraction(e) {
    e.stopPropagation();
  }

  render() {
    const navbarComponents = links =>
      links.map(link => (
        <a
          href={link.path}
          key={link.path}
          className={styles.navItem}
          onClick={e => this.navigate(e, link.path)}
        >
          {link.title}
        </a>
      ));

    return (
      <div
        className={classNames({
          [styles.navDrawer]: true,
          [styles.open]: this.props.open,
        })}
        onClick={this.preventInteraction}
      >
        <a
          href="/"
          className={styles.logoRow}
          onClick={e => this.navigate(e, '/')}
        >
          <img src={logo} className={styles.logo} />
        </a>
        {navbarComponents(this.props.links)}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    navigate: destination => dispatch(push(destination)),
  }
}


export default connect(null, mapDispatchToProps)(NavDrawer);
