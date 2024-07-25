'use client';
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function BlurryCursor() {
    const mouse = useRef({x: 0, y: 0});
    const delayedMouse = useRef({x: 0, y: 0});
    const rafId = useRef()
    const circle = useRef();
    const size = 30;

    let value = 10;


    const lerp = (x, y, a) => x * (1 - a) + y * a
    
    value = lerp(value, 0, 2);
    
    
    console.log(value) 
    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
    
        mouse.current = {
            x: clientX,
            y: clientY
        }
        animate()
    }
    
    const animate = () => {
        const { x, y } = delayedMouse.current;
    
        delayedMouse.current = {
            x: lerp(x, mouse.current.x, 0.0075),
            y: lerp(y, mouse.current.y, 0.0075)
        }
        
        moveCircle(delayedMouse.current.x, delayedMouse.current.y);
        rafId.current = window.requestAnimationFrame(animate);
    }
    
    const moveCircle = (x, y) => {
        gsap.set(circle.current, {x, y, xPercent: -50, yPercent: -50})
    }
    useEffect( () => {
        window.addEventListener("mousemove", manageMouseMove);
        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
        }
    }, [])

    return (
            <div 
                ref={circle}
                style={{
                    backgroundColor: "#BCE4F2",
                    width: size,
                    height: size,
                }}
                className='top-0 left-0 fixed rounded-full' 
            />
    )
}