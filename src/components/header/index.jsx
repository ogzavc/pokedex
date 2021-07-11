import React from 'react';  
import styles from './styles.module.scss'
import logo from './../../assets/images/logo.png'
import { Link } from "react-router-dom";

const Header = () => {
 
 return(
     <>
        <div className={styles.header}>
            <div className={styles.headerLogo}>
                <Link to="/">
                    <img className={styles.headerLogoImg} src={logo} alt="logo"></img>
                </Link> 
            </div>
            <div className={styles.headerMenus}>
                <Link to="/" className={styles.headerMenu}>
                    Home
                </Link>

                <Link to="/my-pokemons" className={styles.headerMenu}>
                    My Pokemons
                </Link>
            </div>
        </div>
     </>    
 )
}

export default Header;