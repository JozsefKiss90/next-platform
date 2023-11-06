import Image from "next/image"
import Navbar from "../components/navbar"

export default function Information() {
    
    return (
       <>
        <Navbar />
        <div style={{display:'flex', justifyContent:'center'}}>
            <Image
               // className={`${styles.icon_style} ${styles.svg_icon}`} 
                src="/img/poster.platform.jpg"
                alt="SVG Icon"
                width={700}
                height={1500}
                style={{paddingTop:'40px'}}
              />        
        </div>    
       </>
    )
}