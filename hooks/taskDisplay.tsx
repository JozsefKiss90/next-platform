
import styles from "../styles/Experiments.module.scss";
import Link from 'next/link';
import ProgressBar from "../components/progressBar";
import Image from 'next/image';

export default function TaskDisplay({props}:any) {

    const {isHovered, disableLink , language, languageData, handleTaskStart, handleCookieWarning} = props

    const tasksData = [
        { name: 'Reaction Time', link: '/tasks/reaction_time/reactionTime', imgSrc: '/img/icons/svgLightning.svg', imgWidth: 60, imgHeight: 60 },
        { name: 'Flanker Task', link: '/tasks/flanker/flankerTask', imgSrc: '/img/icons/svgFlanker.svg', imgWidth: 100, imgHeight: 80 },
        { name: 'Attentional Networks', link: '/tasks/network/networkTask', imgSrc: '/img/icons/svgArrow.svg', imgWidth: 200, imgHeight: 60 },
        { name: 'Action Per Minute', link: '/tasks/amp/amp', specialH1: 'AMP', specialH1Class: styles.amp_style },
        { name: 'Hand Eye Coordination', link: '/tasks/hand_eye/handEye', imgSrc: '/img/icons/svgAim.svg', imgWidth: 60, imgHeight: 60 },
        { name: 'Visual Memory', link: '/tasks/visual_memory/visualMemory', imgSrc: '/img/icons/svgWm.svg', imgWidth: 60, imgHeight: 60 },
        { name: 'Simon Task', link: '/tasks/simon/simonTask', imgSrc: '/img/icons/svgSimon.svg', imgWidth: 80, imgHeight: 80 },

    ];

    return (
        <div className={`${styles.main} ${isHovered ? styles.shrink : ""}`}>
        {tasksData.map((task, index) => (
            <div key={index} className={styles.task}>
            {disableLink ? (
                <Link href="">
                <h2>{language ? languageData.hun.experiments[index] : task.name}</h2>
                </Link>
            ) : (
                <Link href={task.link}>
                <h2>{language ? languageData.hun.experiments[index] : task.name}</h2>
                </Link>
            )}
            
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
            
            {disableLink ? (
                <Link href={''}>
                <button className={styles.task_button} onClick={(e) => { e.preventDefault(), handleCookieWarning(); }}>
                    <p>Start</p>
                </button>
                </Link>
            ) : (
                <Link href={task.link}>
                <button className={styles.task_button} onClick={(e) => { e.preventDefault(), handleTaskStart(task.link) }}>
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