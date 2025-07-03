"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ReactLenis, useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const page = () => {
  useEffect(() => {
    const cards = gsap.utils.toArray(".card"); // Select all cards
    const cardCount = cards.length;

    gsap.set(cards, {
      // opacity: 0.5,
      scale: 0,
      x: 0,
      y: 0,
      z: -2000,
      // filter: "blur(20px)",
      transformOrigin: "center",
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
    cards.forEach((card, index) => {
      // const random =Math.random()%4 ;
      const direction = index % 4;
      const scaleStart = 0.5;
      const scaleUp = 1;
      const opacityStart = 1;
      const opacityEnd = 0.8;
      if (direction === 0) {
        // top card
        tl.to(
          card,
          {
            opacity: opacityStart,
            scale: scaleStart,
            x: 0,
            y: 0,
            z: -1000,
            rotateX: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          `<-=0.6`,
        ).to(
          card, // top card
          {
            opacity: opacityEnd,
            scale: scaleUp,
            x: 0,
            y: "-120%",
            z: 2000,
            rotateX: -90,
            duration: 0.8,
            ease: "power2.out",
          },
          `<+=0.4`,
        );
      } else if (direction === 1) {
        // Left card
        tl.to(
          card,
          {
            opacity: opacityStart,
            scale: scaleStart,
            x: 0,
            y: 0,
            z: -1000,
            rotateY: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          `<-=0.6`,
        ).to(
          card, // Left card
          {
            opacity: opacityEnd,
            scale: scaleUp,
            x: "-120%",
            y: 0,
            z: 2000,
            rotateY: 100,
            duration: 0.8,
            ease: "power2.out",
          },
          `<+=0.4`,
        );
      } else if (direction === 2) {
        // Bottom card
        tl.to(
          card,
          {
            opacity: opacityStart,
            scale: scaleStart,
            x: 0,
            y: 0,
            z: -1000,
            rotateX: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          `<-=0.6`,
        ).to(
          card, // Bottom card
          {
            opacity: opacityEnd,
            scale: scaleUp,
            x: 0,
            y: "100%",
            z: 2000,
            rotateX: 90,
            duration: 0.8,
            ease: "power2.out",
          },
          `<+=0.4`,
        );
      } else if (direction === 3) {
        // right Card
        tl.to(
          card,
          {
            opacity: opacityStart,
            scale: scaleStart,
            x: 0,
            y: 0,
            z: -1000,
            rotateY: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          `<-=0.6`,
        ).to(
          card, // Right Card
          {
            opacity: opacityStart,
            scale: scaleUp,
            x: "120%",
            y: 0,
            z: 2000,
            rotateY: -100,
            duration: 0.8,
            ease: "power2.out",
          },
          `<+=0.4`,
        );
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill);
    };
  }, []);

  const generateRows = () => {
    const totalRows = 12; // Number of rows you want
    const totalImages = 12;
    let rows = [];
    for (let i = 1; i <= totalRows; i++) {
      rows.push(
        <div className="card" key={i}>
          <h1 className="absolute top-4">card - {i}</h1>
          <img src={`/assets/image-${(i % totalImages) + 1}.jpg`} alt="" />
        </div>,
      );
    }

    return rows;
  };

  return (
    <>
      <ReactLenis root>
        <div className="flex h-[90dvh] items-center justify-center bg-neutral-900 font-mono">
          Journey page
        </div>
        <div className="canvas relative m-auto flex h-screen items-center justify-center gap-4 overflow-hidden font-mono perspective-[2000px]">
          {generateRows()}
        </div>
        <div className="flex h-[90dvh] items-center justify-center bg-neutral-900 font-mono">
          Footer page
        </div>
      </ReactLenis>
    </>
  );
};

const cards = [
  {
    cardUrl: "assets/image-1.jpg",
  },
];

export default page;
