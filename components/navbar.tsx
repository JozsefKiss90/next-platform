import { symbolName } from "typescript"
import styles from "../styles/Navbar.module.scss"
import Link from "next/link"

export default function Navbar(){
    return(         
    <>
        <div className={styles.area}></div>
        <nav className={styles.mainMenu}>
            <ul>
                <li className={styles.linkTag}>
                    <Link  href={{ pathname:"/experiments"}}>
                    <i className="fa fa-home fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                            Dashboard
                        </span>
                    </Link>
                  
                  
                </li>
                <li className={styles.linkTag}>
                    <Link href="#">
                        <i className="fa fa-laptop fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                            Stars Components
                        </span>
                    </Link>
                    
                </li>
                <li className={styles.linkTag}>
                    <Link href="#">
                       <i className="fa fa-list fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                            Forms
                        </span>
                    </Link>
                    
                </li>
                <li className={styles.linkTag}>
                    <Link href="#">
                       <i className="fa fa-folder-open fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                            Pages
                        </span>
                    </Link>
                   
                </li>
                <li className={styles.linkTag}>
                    <Link href="#">
                        <i className="fa fa-bar-chart-o fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                            Graphs and Statistics
                        </span>
                    </Link>
                </li>
                <li className={styles.linkTag}>
                    <Link href="#">
                        <i className="fa fa-font fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                           Quotes
                        </span>
                    </Link>
                </li>
                <li className={styles.linkTag}>
                   <Link href="#">
                       <i className="fa fa-table fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                            Tables
                        </span>
                    </Link>
                </li>
                <li className={styles.linkTag}>
                   <Link href="#">
                        <i className="fa fa-map-marker fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                            Maps
                        </span>
                    </Link>
                </li>
                <li className={styles.linkTag}>
                    <Link href="#">
                       <i className="fa fa-info fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                            Documentation
                        </span>
                    </Link>
                </li>
            </ul> 

            <ul className={styles.logout}>
                <li className={styles.linkTag}>
                   <Link href="#">
                         <i className="fa fa-power-off fa-2x fa-fw"></i>
                        <span className={styles.navText}>
                            Logout
                        </span>
                    </Link>
                </li>  
            </ul>
        </nav>
    </>
    )
}