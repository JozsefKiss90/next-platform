import React from 'react';
import styles from "../styles/Navbar.module.scss";
import styles2 from "../styles/Index.module.scss"
import { LanguageProps } from '../types/types';

const LanguageToggler: React.FC<LanguageProps> = ({ language, setLanguage, session }) => {
    return (
        <>
            <div className={styles.credentials_container}>
                <h4 className={styles2.email}>{session.user?.email}</h4>
            </div>
            <div onClick={() => setLanguage(!language)} className={styles.flag}>
                <div className={styles.flagItem}>
                    <p className={language ? styles.flagBorderStyle : styles.flagDefaultStyle}>
                        <span className={styles.flagText}>hun</span>
                    </p>
                    <span style={{ scale: '1.1' }} className="fi fi-hu"></span>
                </div>
                <div className={styles.flagItem}>
                    <p className={!language ? styles.flagBorderStyle : styles.flagDefaultStyle}>
                        <span className={styles.flagText}>eng</span>
                    </p>
                    <span style={{ scale: '1.1' }} className="fi fi-gb"></span>
                </div>
            </div>
        </>
    );
};

export default LanguageToggler;
