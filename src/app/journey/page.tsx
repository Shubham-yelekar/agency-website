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
    
    gsap.set(cards, () => ({
      opacity: 0.5,
      scale: 1,
      x: 0,
      y: 0,
      z: 0,
      filter: "blur(20px)",
      transformStyle: "preserve-3d",
      transform : "translate(-50%, -50%)"
    }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".canvas",
        start: "top top",
        end: `+=${window.innerHeight * cardCount}`, // Extend scroll area
        pin: true,
        scrub: 1,
      },
    });

    cards.forEach((card, index) => {
      // const randomY = Math.random() * 70+ 20;
      tl.to(card, {
        opacity: 1,
          scale: 1,
          x: index % 2 === 0 ? "-80%" : "80%", // 
          // Alternate direction
          y: 0, // Keep vertical position centered
          filter: "blur(0px)", // Remove blur
          z: 1000, // Bring forward
          duration: 0.8,
          ease: "none",
      }
    , `<-=0.4`
    ).to(
      card, {
        opacity: 0.5,
          scale: 1.2,
          x: index % 2 === 0 ? "-120%" : "120%", // Move further out
          y: 0, // Keep vertical position centered
          z: 2000, // Reset depth
          duration: 0.8,
          ease: "none",
      },
      `<+=0.1`
    );
  });

    return ()=>{
      ScrollTrigger.getAll().forEach((trigger)=>trigger.kill)
    }
  }, [])
  
  const generateRows = () =>{
    const totalRows = 1; // Number of rows you want
    const totalImages = 2;
    let rows = []
    for(let i = 1; i<=2; i++ ){
      rows.push(
  
          <div className='card' key={i}>
            <img src={`/assets/image-${i}.jpg`} alt="" />
          </div>
      )
    }
  
    return rows
  }

  return (
    <>
    <ReactLenis root>
      <div className='bg-neutral-900 h-[90dvh] flex items-center justify-center font-mono'>Journey page</div>
      <div className='canvas font-mono flex justify-between items-center h-screen m-auto gap-4 max-w-[1200px] relative perspective-distant overflow-hidden'>
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