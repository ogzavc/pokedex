import React, { useEffect, useState } from 'react';  
import PokemonCard from '../../components/pokemonCard';
import PokemonDetailModal from '../../components/pokemonDetailModal';
import Loader from '../../components/loader';
import styles from './styles.module.scss'

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Favorites = () => {
 
    const [isLoaded, setIsLoaded] = useState(false); 
    const [pokemons, setPokemons] = useState([]);
    const [showDetail, setShowDetail] = useState(false)
    const [showCollectMessage, setCollectMessage] = useState(false)
    const [detailData, setDetailData] = useState({}) 

    useEffect(() => {   
        setPokemonDetails();   
    }, [])

    async function setPokemonDetails () { 
        let data = cookies.get('poke') ? cookies.get('poke') : [];
        let _currentPokemons = pokemons;
        //we are going to send request for each item to set details, after promise complated isloaded state should switch to true
        await Promise.all(data.map( async (pokeId) => {
            try{
                await fetch("https://pokeapi.co/api/v2/pokemon/"+pokeId)
                .then(res => res.json())
                .then(
                    (result) => { 
                        _currentPokemons.push(result);
                        result.isFavorite = true;
                        setPokemons(currentPokemons => [...currentPokemons, result])  
                    }
                    
                )
            } catch(error) {
                console.log('error'+ error);
                return true;
            }
            
        }));  

        setPokemons(_currentPokemons)  
        pokemons.length === 0 && setCollectMessage(true);
        setIsLoaded(true);   
    }

    const onPokemonClick = (detailData) => { 
        setDetailData(detailData)
        setShowDetail(true) 
    }

    const onCloseClick = () => {  
        setShowDetail(false) 
    }

    const onPokeFavChange = (name,status,id) => {
        let newfavPokemons = pokemons;  

        newfavPokemons.find(function(poke, index) {
            if(poke.id === id) {
                poke.isFavorite = false
                return true; 
            } 
        }) 

        if(newfavPokemons.findIndex(x => x.isFavorite === true) === -1) {
            setCollectMessage(true)
        }

        setPokemons([...newfavPokemons]); 

        !status && toast.info("You set "+name+" free!")
        
    }
 
    return ( 
        <>
           {isLoaded ? (
                <div className={styles.cardContainer}>
                    {pokemons.map((pokemon) => (      
                        pokemon.isFavorite && (
                            <PokemonCard pokeData={pokemon} 
                                key={`poke-${pokemon.id}`} 
                                onPokemonClick={onPokemonClick} 
                                onPokeFavChange={onPokeFavChange} 
                            /> 
                        )  
                    ))} 
                    
                    {showCollectMessage && (
                        <div className={styles.noPokemonsText}> oh crap! you dont have any pokemons. <br/>go back to <a href="/">pokedex</a> and click pokeball on the right top to get one! </div>
                    )} 
                </div> 
           )  : (
                <Loader/>
           )}

            <ToastContainer transition={Slide} 
                autoClose={2000}
                closeButton={false}
                hideProgressBar
                newestOnTop
                pauseOnFocusLoss={false}
                pauseOnHover
            />

            {showDetail && (
                <PokemonDetailModal pokeData={detailData} showModal={showDetail} onCloseClick={onCloseClick} />
            )}
        </>
    )
}

export default Favorites;