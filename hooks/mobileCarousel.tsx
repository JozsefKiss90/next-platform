import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import ProgressBar from '../components/progressBar';
import styles from "../styles/Experiments.module.scss";
import Image from 'next/image';


const MobileCarousel = ({ language, languageData } : any) => {
  const [mobileWarning, setMobileWarning] = useState(false);

  let slideStyle: React.CSSProperties = {
    display: 'block',
    marginTop: '100px'
  }


  const handleMobileWarningClick = () => {
    setMobileWarning(!mobileWarning);
  };

  const tasks = [
    {
      title: language ? languageData.hun.experiments[0] : 'Reaction Time',
      iconSrc: '/img/icons/svgLightning.svg',
      width: 60,
      height: 60,
    },
    {
      title: language ? languageData.hun.experiments[1] : 'Flanker Task',
      iconSrc: '/img/icons/svgFlanker.svg',
      width: 100,
      height: 80,
    },
    {
      title: language ? languageData.hun.experiments[2] : 'Attentional Networks',
      iconSrc: '/img/icons/svgArrow.svg',
      width: 200,
      height: 60,
    },
    {
      title: 'Action Per Minute',
      iconSrc: '/img/icons/svgAim.svg',
      width: 60,
      height: 60,
    },
    {
      title: language ? languageData.hun.experiments[3] : 'Hand Eye Coordination',
      iconSrc: '/img/icons/svgAim.svg',
      width: 60,
      height: 60,
    },
  ];

  return (
    <div style={{ ...slideStyle }}>
      {mobileWarning ? (
        <div className={styles.modal_2}>
          <p style={{ textAlign: 'center' }}>
            The experiments can be completed on desktop.
          </p>
          <div className={styles.modal_buttons}>
            <button
              style={{ marginTop: '20px' }}
              className={styles.task_button}
              onClick={handleMobileWarningClick}
            >
              <p>Ok</p>
            </button>
          </div>
        </div>
      ) : (
        <Carousel showStatus={false} className={styles.container_mobile}>
          {tasks.map((task, index) => (
            <div className={styles.task} key={index}>
              <h2 onClick={handleMobileWarningClick}>{task.title}</h2>
              <Image
                className={styles.icon_style}
                src={task.iconSrc}
                alt="SVG Icon"
                width={task.width}
                height={task.height}
              />
              <button className={styles.task_button}>
                <p>Start</p>
              </button>
              <ProgressBar completed={90} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MobileCarousel;
