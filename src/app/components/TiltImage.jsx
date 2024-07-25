"use client";

import {useMotionValue,useSpring,motion,useTransform} from "framer-motion"
import Image from 'next/image';
export default function TiltImage(props){
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)
  
    const rotateX = useTransform(mouseYSpring,[-0.5,0.5],["45.5deg","-45.5deg"]);
    const rotateY = useTransform(mouseXSpring,[-0.5,0.5],["-45.5deg","45.5deg"]);
    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();

        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }
    const handleMouseLeave = () => {
        // x.set(0);
        // y.set(0);
    }
    return(<>
        <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{rotateX,rotateY,transformStyle:"preserve-3d"}} className="flex flex-row justify-center align-middle items-center my-auto">
            <div className="h-96 w-96 bg-blue-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 border border-gray-100">
                <Image src={props.src} alt={props.alt} sizes={{width:props.width,height:props.height}}/>
            </div>
        </motion.div>
    </>)
}