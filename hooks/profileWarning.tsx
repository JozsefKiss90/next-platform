import styles from "../styles/Experiments.module.scss";
import React, { useState } from 'react';
import Link from "next/link";
const ProfileWarning = ({ language, languageData } : any) => {
    return(
        <div className={styles.popup}>
        <h4 style={{padding:"20px"}}>
            Még nem töltötted ki a profil adatokat!
          </h4>
          <Link href="/user_form" style={{display:'flex', justifyContent:'center'}}>
            <button  className={styles.popup_button}>
              <p>{language ? languageData.hun.index[2] : "Profile"}</p>
            </button>
          </Link>
      </div>
    )
}

export default ProfileWarning