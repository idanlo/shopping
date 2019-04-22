import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import colors from '../../styles/colors';

const Navbar: React.FC = props => {
    return (
        <nav style={{ background: colors.primary }}>
            <ul className={styles.navbar}>
                <li className={styles.link}>
                    <Link to="/">
                        <img
                            src="https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png"
                            style={{ width: 60, height: 60 }}
                        />
                    </Link>
                </li>
                <li className={styles.link}>
                    <Link to="/catalog">Men</Link>
                    <Link to="/catalog">Women</Link>
                    <Link to="/catalog">Kids</Link>
                </li>
                <li className={styles.link}>
                    <input type="text" placeholder="Search" />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
