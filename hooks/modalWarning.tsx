import styles from "../styles/Experiments.module.scss";
import React, { useState } from 'react';

const ModalWarning = () => {
   
    const [disableLink, setDisableLink] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCookieDelete = () => {
        setDisableLink(false)
        localStorage.removeItem('cookie_statistics_disabled')
    };

    const handleCookieWarning = () => {
        setShowModal(!showModal);
      };
    

    return(
        <div className={styles.modal}>
              <p>
                Cookies for statistical data was disabled. Do you want to enable it?
              </p> 
              <div className={styles.modal_buttons}>
                <div>
                  <button onClick={(e)=> {e.preventDefault(); handleCookieWarning(); handleCookieDelete()}}>
                      <p> 
                        Yes
                      </p>
                  </button>
                </div>
               <div>
                <button onClick={(e)=> {e.preventDefault(); handleCookieWarning()}}>
                    <p>
                      No
                    </p>
                  </button>
               </div>
              </div>  
            </div>
    )
}

export default ModalWarning