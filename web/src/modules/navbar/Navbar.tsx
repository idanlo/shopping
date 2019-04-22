import React from 'react';
import styles from './Navbar.module.css';
import colors from '../../styles/colors';

const Navbar: React.FC = props => {
    return (
        <div
            style={{
                height: 60,
                background: colors.primary,
                color: '#000',
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <div>
                <a href="/" className={styles.link}>
                    Home
                </a>
                <a href="/products/all" className={styles.link}>
                    Shoes
                </a>
            </div>
        </div>
    );
};

export default Navbar;
