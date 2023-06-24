import { useState, useEffect } from 'react';
import styles from '../styles/Layout.module.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css'; 

type CookieHandler = 'github' | 'facebook' | 'google' | 'next' | 'experiments';

const CookieConsent: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cookieConsent, setCookieConsent] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [expandedHandlers, setExpandedHandlers] = useState<CookieHandler[]>([]);
  const [cookieDisable, setCookieDisable] = useState<boolean>(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie_consent');
    if (!hasConsented) {
      setShowModal(true);
    } else {
      setCookieConsent(true);
    }
  }, []);

  useEffect(() => {
    if(cookieDisable) {
      localStorage.setItem('cookie_statistics_disabled', 'true');
    }
  }, [cookieDisable]);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setCookieConsent(true);
    setShowModal(false);
  };

  const handleDeny = () => {
    localStorage.removeItem('cookie_consent');
    setCookieConsent(false);
    setShowModal(false);
  };

  const handleCustomize = () => {
    setSelectedOption('customize');
  };

  const handleHandlerExpand = (handler: CookieHandler) => {
    if (expandedHandlers.includes(handler)) {
      setExpandedHandlers(expandedHandlers.filter((h) => h !== handler));
    } else {
      setExpandedHandlers([...expandedHandlers, handler]);
    }
  };

  const handleHandlerClose = () => { 
    setExpandedHandlers([]);
  };

  const handleCookie = () => {
    setCookieDisable(!cookieDisable)
  }


  const renderContent = (): JSX.Element => {
    if (selectedOption === 'customize') {
      return (
        <div className={styles.cookie_details_main}>
          <h2>Details</h2>
          <div className={styles.cookie_details_container}>
            <h4>Essential Cookies</h4>
            <input type="checkbox" disabled checked/>
          </div>
          <div className={styles.cookie_details_info}>
            <div>
              <p onClick={() => handleHandlerExpand('next')} className={styles.dropdown_container}>
                  Next Auth
                  <span className={`${styles.dropdown_icon} ${expandedHandlers.includes('next') ? styles.icon_expanded : styles.icon_collapsed}`}>
                    {expandedHandlers.includes('next') ? '-' : '+'}
                  </span>
              </p>
                {expandedHandlers.includes('next') && (
                    <div onClick={() => handleHandlerClose()}>
                      <p className={styles.cookie_info}>
                        Information about next cookie handler goes here.
                      </p>
                    </div>
                  )}
             </div>
             <div>
              <p onClick={() => handleHandlerExpand('github')} className={styles.dropdown_container}>
                  GitHub Provider
                  <span className={`${styles.dropdown_icon} ${expandedHandlers.includes('github') ? styles.icon_expanded : styles.icon_collapsed}`}>
                    {expandedHandlers.includes('github') ? '-' : '+'}
                  </span>
              </p>
                {expandedHandlers.includes('github') && (
                    <div onClick={() => handleHandlerClose()}>
                      <p className={styles.cookie_info}>
                        Information about GitHub cookie handler goes here.
                      </p>
                    </div>
                  )}
             </div>
             <div>
              <p onClick={() => handleHandlerExpand('facebook')} className={styles.dropdown_container}>
                  Facebook Provider
                  <span className={`${styles.dropdown_icon} ${expandedHandlers.includes('facebook') ? styles.icon_expanded : styles.icon_collapsed}`}>
                    {expandedHandlers.includes('facebook') ? '-' : '+'}
                  </span>
              </p>
                {expandedHandlers.includes('facebook') && (
                    <div onClick={() => handleHandlerClose()}>
                      <span className={styles.cookie_info}>
                        Information about Facebook cookie handler goes here.
                      </span>
                    </div>
                  )}
             </div>
             <div>
              <p onClick={() => handleHandlerExpand('google')} className={styles.dropdown_container}>
                  Google Provider
                  <span className={`${styles.dropdown_icon} ${expandedHandlers.includes('google') ? styles.icon_expanded : styles.icon_collapsed}`}>
                    {expandedHandlers.includes('google') ? '-' : '+'}
                  </span>
              </p>
                {expandedHandlers.includes('google') && (
                    <div onClick={() => handleHandlerClose()}>
                      <span className={styles.cookie_info}>
                        Information about Google cookie handler goes here.
                      </span>
                    </div>
                  )}
             </div>
            </div>
            <div className={styles.cookie_details_container}>
              <h4>Statistics</h4>
              <input type="checkbox" onClick={() => handleCookie()} />
            </div>
            <div  className={styles.cookie_details_info}>
              <div>
                <p onClick={() => handleHandlerExpand('experiments')} className={styles.dropdown_container}>
                    Next Auth
                    <span className={`${styles.dropdown_icon} ${expandedHandlers.includes('experiments') ? styles.icon_expanded : styles.icon_collapsed}`}>
                      {expandedHandlers.includes('experiments') ? '-' : '+'}
                    </span>
                </p>
                  {expandedHandlers.includes('experiments') && (
                      <div onClick={() => handleHandlerClose()}>
                        <p className={styles.cookie_info}>
                          Information about statistics cookie handler goes here.
                        </p>
                      </div>
                    )}
              </div>
            </div>
          </div>
      );
    }

    return (
      <>
        <h2>Cookie Consent</h2>
        <p>
          This website uses cookies to improve your experience. By continuing to browse, you consent to the use of cookies. Customize your cookie settings or click "Accept" to proceed.
        </p>
      </>
    );
  };

  return (
    <>
      {showModal && (
       
        <div className={styles.cookie_modal}>
          <div className={styles.modal_content}>
            {renderContent()}
            <div className={styles.button_container}>
              {selectedOption === 'customize' ? (
                <button onClick={() => setSelectedOption(null)}>Back</button>
              ) : (
                <button onClick={handleCustomize}>Customize</button>
              )}
              <button onClick={handleAccept}>Accept Cookies</button>
              <button onClick={handleDeny}>Deny</button>
            </div>
          </div>
        </div>
  
      )}
    </>
  );
};

export default CookieConsent;
