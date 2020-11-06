import React from 'react';
import styles from './expander.scss';


const Expander = (props) => {

  const closeButton = (
    <svg className={styles.closeButton} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <rect fill="none" height="24" width="24"/>
      <path d="M22,3.41l-5.29,5.29L20,12h-8V4l3.29,3.29L20.59,2L22,3.41z M3.41,22l5.29-5.29L12,20v-8H4l3.29,3.29L2,20.59L3.41,22z"/>
    </svg>
  )

  const openButton = (
    <svg className={styles.expandButton} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <rect fill="none" height="24" width="24"/>
      <polygon points="21,11 21,3 13,3 16.29,6.29 6.29,16.29 3,13 3,21 11,21 7.71,17.71 17.71,7.71"/>
    </svg>
  )

  const content = props.expanded
    ? openButton
    : closeButton; 


  return (
    <button className={styles.expanderContainer} onClick={props.expandFunction}>
      {content}
    </button>
  );
}


export default Expander; 