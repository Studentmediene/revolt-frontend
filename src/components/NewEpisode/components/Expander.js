import React, { useState } from 'react';
import styles from './expander.scss';


const Expander = (props) => {

    const downButton = (
      <div className={styles.downButton} style= {{transform: 'rotate(45deg)'}}>
        <i></i>  
      </div>
    )

    const upButton = (
      <div className={styles.upButton} style= {{transform: 'rotate(225deg)', marginTop: '10px'}}>
        <i></i>
      </div>
    )

    const content = props.expanded
      ? upButton
      : downButton; 


    return (
      <button className={styles.expanderContainer} onClick={props.expandFunction}>
        {content}
      </button>
    );
}

export default Expander; 