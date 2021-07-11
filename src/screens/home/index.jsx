import React, { useEffect, useState } from 'react';  
import PokemonCard from '../../components/pokemonCard';
import PokemonDetailModal from '../../components/pokemonDetailModal';
import Pagination from '../../components/pagination';
import Loader from '../../components/loader';
import styles from './styles.module.scss'

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Home = () => {
 
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [showDetail, setShowDetail] = useState(false)
    const [detailData, setDetailData] = useState({}) 
    const [pageData, setPageData] = useState({})

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=48")
          .then(res => res.json())
          .then(
            (data) => { 
                //we have only names and urls on our pokemons, we will pas them to get details
                console.log(data);
                setPageData({
                    next: data.next,
                    prev: data.previous
                })
                setPokemonDetails(data);  
            }, 
            (error) => {
              setIsLoaded(true); 
            }
          ) 
    }, [])

    async function setPokemonDetails (data) {
        let _currentPokemons = [];
        //we are going to send request for each item to set details, after promise complated isloaded state should switch to true
        await Promise.all(data.results.map( async (poke) => {
            try{
                await fetch(poke.url)
                .then(res => res.json())
                .then(
                    (result) => { 
                        _currentPokemons.push(result);
                        setPokemons(currentPokemons => [...currentPokemons, result])  
                    }
                    
                )
            } catch(error) {
                console.log('error'+ error);
                return true;
            }
            
        }));  

        setPokemons([..._currentPokemons]);
        setIsLoaded(true);   
    }

    const onPokemonClick = (detailData) => { 
        setDetailData(detailData)
        setShowDetail(true) 
    }

    const onCloseClick = () => {  
        setShowDetail(false) 
    }

    const onPageChange = (pageUrl) => {  
        setIsLoaded(false);  
        fetch(pageUrl)
        .then(res => res.json())
        .then(
          (data) => { 
              //we have only names and urls on our pokemons, we will pas them to get details
              console.log(data);
              setPageData({
                  next: data.next,
                  prev: data.previous
              })
              setPokemonDetails(data);  
          } 
        ) 
    }

    const onPokeFavChange = (name, status) => {
        status ? (
            toast.success("Cool! You've collected "+ name +" via pokeball") 
            ): (
            toast.info("You set "+name+" free!"))  
    }
 
    return ( 
        <>
           {isLoaded ? (
                   <>
                        <div className={styles.cardContainer}>
                            {pokemons.map((pokemon) => (   
                                <PokemonCard pokeData={pokemon} 
                                    key={`poke-${pokemon.id}`} 
                                    onPokemonClick={onPokemonClick} 
                                    onPokeFavChange={onPokeFavChange}
                                />
                            ))} 
                        </div> 

                        <Pagination pageData={pageData} onPageChange={onPageChange}/>
                    </>
                )   : (
                    <Loader/>
                )
            
            }

            {showDetail && (
                <PokemonDetailModal pokeData={detailData} 
                    showModal={showDetail} 
                    onCloseClick={onCloseClick} 
                />
            )}

        <ToastContainer transition={Slide} 
            autoClose={2000}
            closeButton={false}
            hideProgressBar
            newestOnTop
            pauseOnFocusLoss={false}
            pauseOnHover
        /> 
            
        </>
    )
}

export default Home;