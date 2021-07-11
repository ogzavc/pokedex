import React from 'react';  
import styles from './styles.module.scss'
import logo from './../../assets/images/logo.png'

const Header = () => {
 
 return(
     <>
        <div className={styles.header}>
            <div className={styles.headerLogo}>
                <a href="/">
                    <img className={styles.headerLogoImg} src={logo} alt="logo"></img>
                </a> 
            </div>
            <div className={styles.headerMenus}>
                <a href="/" className={styles.headerMenu}>
                    Home
                </a>

                <a href="/my-pokemons" className={styles.headerMenu}>
                    My Pokemons
                </a>
            </div>
        </div>
     </>    
 )
}

export default Header;