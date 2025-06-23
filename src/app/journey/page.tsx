"use client"
import React, {useEffect} from 'react'
import Lenis from 'lenis'
import gsap from "gsap"
import {ReactLenis, useLenis} from "lenis/react"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
const page = () => {
  useEffect(() => {
    const cards = gsap.utils.toArray(".card"); // Select all cards
    const cardCount = cards.length;
    console.log(cards);
    console.log(cardCount);
    
    gsap.set(cards,{
      // opacity: 0.5,
      scale: 0,
      
      x: 0,
      y: 0,
      z: -2000,
      // filter: "blur(20px)",
      transformStyle: "preserve-3d",
      
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".canvas",
        start: "top top",
        end: `+=${window.innerHeight * cardCount}`, // Extend scroll area
        pin: true,
        scrub: 1,
      },
    });
      cards.forEach((card, index)=>{
        tl.to(
          card,{
            opacity:1,
            scale: 1,
            x: 0,
            y: 0,
            z: 0,
            rotateX : 0,
            duration: 0.8,
            ease: "power2.out"
          },`<-=0.6`
        ).to(card,{
          opacity: 0,
          scale: 1.2,
          x: index % 2 === 0 ? "-120%" : "120%",
          y: (index % 2 === 0 ? "-100%" : "100%"),
          rotateY: index % 2 === 0 ? "45deg" : "-45deg",
          z: 2000,
          duration: 0.8,
          ease: "power2.out"
        },`<+=0.4` )
      } )
    return ()=>{
      ScrollTrigger.getAll().forEach((trigger)=>trigger.kill)
    }
  }, [])
  
  const generateRows = () =>{
    const totalRows = 24; // Number of rows you want
    const totalImages = 8;
    let rows = []
    for(let i = 1; i<=totalRows; i++ ){
      rows.push(
          <div className='card' key={i}>
            <h1 className='absolute top-4'>card - {i}</h1>
            <img src={`/assets/image-${i % totalImages + 1}.jpg`} alt="" />
          </div>
      )
    }
  
    return rows
  }

  return (
    <>
    <ReactLenis root>
      <div className='bg-neutral-900 h-[90dvh] flex items-center justify-center font-mono'>Journey page</div>
      <div className='canvas font-mono flex justify-center items-center h-screen m-auto gap-4 relative perspective-[2000px] overflow-hidden'>
        {generateRows()}
      </div>
      <div className='bg-neutral-900 h-[90dvh] flex items-center justify-center font-mono'>Footer page</div>
    </ReactLenis>
    </>
  )
}

const cards = [
  {
    cardUrl: 'assets/image-1.jpg'
  }
]

export default page