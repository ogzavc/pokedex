import React from 'react'; 
import classNames from 'classnames';
import styles from './styles.module.scss'
import ProgressBar from '../../components/progressBar';

const pokemonDetailModal = ({ pokeData, showModal, onCloseClick}) => {
 
    const {name, id, height, weight, types = [], abilities = [], stats = []} = pokeData;  
    const pokeImgBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
    const pokeImgExtension = '.png';
    const pokeImgURl = pokeImgBaseUrl+id+pokeImgExtension; 

 return(
     <> 
        {showModal && (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <span className={styles.modalClose} onClick={() => onCloseClick()}>×</span> 

                <div className={classNames(styles.detailWrapper, [`theme-${types[0].type.name}`])}>
                    <div className={styles.detailLeft}>
                        <div className={styles.detailImgWrapper}>
                            <img className={styles.detailImg} src={pokeImgURl} alt=""></img>
                        </div>
                        <div className={styles.detailName}>
                            {name}
                        </div>
                        <div className={styles.detailInfos}>
                            <div className={styles.detailInfo}>
                                id : <b>{id}</b>
                            </div>
                            <div className={styles.detailInfo}>
                                height : <b>{height}</b>
                            </div>
                            <div className={styles.detailInfo}>
                                weight : <b>{weight}</b>
                            </div>
                        </div>  
                        
                    </div> 
                    <div className={styles.detailRight}>
                        <div className={styles.detailTitle}> Abilities </div>  
                        <div className={styles.detailAbilities}> 
                            {
                                abilities.map((ab , index) => (     
                                    <div className={styles.detailAbility} key={`${name}-abilty-${index}`}>
                                        {ab.ability.name}
                                    </div>  
                                )) 
                            }
                            
                        </div>  

                        <div className={styles.detailTitle}> Stats </div>  
                        <div className={styles.detailStats}> 
                            {
                                stats.map((st , index) => (     
                                    <div className={styles.detailStat} key={`${name}-stat-${index}`}>
                                        <div className={styles.detailStatLeft} >{st.stat.name} </div> 
                                        <div className={styles.detailStatRight} > <ProgressBar completed={st.base_stat > 100 ? 100 : st.base_stat  } /> </div>
                                    </div>  
                                )) 
                            } 
                        </div>   
                    </div> 
                </div>
            </div>  
        </div>
        )}
        
       
     </>    
 )
}

export default pokemonDetailModal;