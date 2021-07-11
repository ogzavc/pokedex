import React, { useEffect, useState } from 'react'; 
import classNames from 'classnames';
import styles from './styles.module.scss' 
import { Pokeball, PokeballFilled } from './../../components/icons/index'
import LazyLoad from 'react-lazyload';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const PokemonCard = ({ pokeData, onPokemonClick, onPokeFavChange}) => {

    const [isFavorite, setFavorite] = useState(false);

    const {name, id, types = []} = pokeData;  
    const pokeImgBaseUrl = process.env.REACT_APP_POKEMON_IMG_URL;
    const pokeImgExtension = process.env.REACT_APP_POKEMON_IMG_EXTENSION;
    const pokeImgURl = pokeImgBaseUrl+id+pokeImgExtension; 


    useEffect(() => {
        let favoritePokemons = cookies.get('poke') ? cookies.get('poke') : [];

        if(favoritePokemons.includes(id)){
            setFavorite(true) 
        }
    }, [])


    const onPokeballClick = (pokeName,pokeId, isFav) => {  
        let newPokemonList = cookies.get('poke') ? cookies.get('poke') : [];
        isFav ? (
            newPokemonList.push(pokeId)
        ) : (
            newPokemonList.splice(newPokemonList.indexOf(pokeId), 1)
        )
       
        cookies.set('poke', JSON.stringify(newPokemonList)); 
        setFavorite(isFav)
        onPokeFavChange(pokeName,isFav,pokeId)
    }

 return(
     <>
        <div className={classNames(styles.pokeContainer, [`theme-${types[0].type.name}`])}>
            <div className={styles.pokeWrapper} onClick={() => onPokemonClick(pokeData)}>
                <div className={styles.pokeImgWrapper}>
                    <LazyLoad height={200} offset={100}>
                        <img className={styles.pokeImg} src={pokeImgURl} alt=""></img> 
                    </LazyLoad>
                </div>
            
                <div className={styles.pokeName}>{name}</div> 

                <div className={styles.pokeTypes}> 
                    {
                        types.map((type , index) => (     
                            <div className={styles.pokeType} key={`type-${name}-${index}`}>{type.type.name}</div> 
                        )) 
                    }     
                </div>  
            
            </div>
                
            {isFavorite ? (
                <PokeballFilled onClick={() => onPokeballClick(name,id,false)} className={styles.pokeBallIcon}/>
            ) : (
                <Pokeball onClick={() => onPokeballClick(name,id,true)} className={styles.pokeBallIcon}/>
            )}
                
        </div>

     </>    
 )
}

export default PokemonCard;