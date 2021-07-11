import React from 'react';  
import styles from './styles.module.scss'   

const Pagination = ( {pageData, onPageChange}) => {

    const {next,prev} = pageData;   

    return(
        <>
            <div className={styles.paginationWrapper}>
             
                {prev && (
                   <div className={styles.paginationButton} onClick={() => onPageChange(prev)}>
                        &lt; Previous
                    </div>
                )} 

                {next && (
                   <div className={styles.paginationButton} onClick={() => onPageChange(next)}>
                        Next &gt;
                    </div> 
                )} 

            </div>
        
        </>    
    )
}

export default Pagination;