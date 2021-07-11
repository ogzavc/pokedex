import React from 'react';  
import styles from './styles.module.scss'

const ProgressBar = (props) => {
    const { completed } = props; 
    
 

    const fillerStyles = { 
        width: `${completed}%`
    } 
  
    return (
      <div className={styles.containerStyles}>
        <div className={styles.fillerStyles} style={fillerStyles}>
          <span className={styles.labelStyles}>{`${completed}`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;