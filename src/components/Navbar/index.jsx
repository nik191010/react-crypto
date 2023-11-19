import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Coin Price Tracker</h2>
      <p className={styles.text}>Track any changes in the market</p>
    </div>
  );
};

export default Navbar;
