
import styles from "../styles/Experiments.module.scss";
import Link from 'next/link';
import ProgressBar from "../components/progressBar";
import Image from 'next/image';

export default function TaskDisplay({props}:any) {

    const {isHovered, disableLink , language, languageData, handleTaskStart, handleCookieWarning} = props

    const tasksData = [
        { name: 'Reaction Time', link: '/tasks/reactionTime', imgSrc: '/img/icons/svgLightning.svg', imgWidth: 60, imgHeight: 60 },
        { name: 'Flanker Task', link: '/tasks/flankerTask', imgSrc: '/img/icons/svgFlanker.svg', imgWidth: 100, imgHeight: 80 },
        { name: 'Attentional Networks', link: '/tasks/networkTask', imgSrc: '/img/icons/svgArrow.svg', imgWidth: 200, imgHeight: 60 },
        { name: 'Action Per Minute', link: '/tasks/apmTask', specialH1: 'AMP', specialH1Class: styles.amp_style },
        { name: 'Hand Eye Coordination', link: '/tasks/handEyeTask', imgSrc: '/img/icons/svgAim.svg', imgWidth: 60, imgHeight: 60 },
        { name: 'Visual Memory', link: '/tasks/visualMemoryTask', imgSrc: '/img/icons/svgWm.svg', imgWidth: 60, imgHeight: 60 },
      ];

    return (
        <div className={`${styles.main} ${isHovered ? styles.shrink : ""}`}>
        {tasksData.map((task, index) => (
            <div key={index} className={styles.task}>
            {/* Title Rendering */}
            {disableLink ? (
                <Link href="">
                <h2>{language ? languageData.hun.experiments[index] : task.name}</h2>
                </Link>
            ) : (
                <Link href={task.link}>
                <h2>{language ? languageData.hun.experiments[index] : task.name}</h2>
                </Link>
            )}
            
            {/* Special H1 or Image Rendering */}
            {task.specialH1 ? (
                <h1 className={`${task.specialH1Class} ${styles.icon_style}`}>
                {task.specialH1}
                </h1>
            ) : (
            index == 1 ? (
                task.imgSrc && (
                <Image
                    className={styles.icon_style_flanker}
                    src={task.imgSrc}
                    alt={`${task.name} Icon`}
                    width={task.imgWidth}
                    height={task.imgHeight}
                />
                )
            ) : (
                task.imgSrc && (
                <Image
                    className={styles.icon_style}
                    src={task.imgSrc}
                    alt={`${task.name} Icon`}
                    width={task.imgWidth}
                    height={task.imgHeight}
                />
                )
            )
            )}
            
            {/* Button Rendering */}
            {disableLink ? (
                <Link href={''}>
                <button className={styles.task_button} onClick={(e) => { e.preventDefault(); handleCookieWarning(); }}>
                    <p>Start</p>
                </button>
                </Link>
            ) : (
                <Link href={task.link}>
                <button className={styles.task_button} onClick={handleTaskStart}>
                    <p>Start</p>
                </button>
                </Link>
            )}
            
            <ProgressBar completed={100} />
            </div>
        ))}
    </div>
    )
}