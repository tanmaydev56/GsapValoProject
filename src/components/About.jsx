import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const clipRef = useRef(null); // Reference for the clip div

  useEffect(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: clipRef.current,
        start: "center center",
        end: "+=700 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100%",
      height: "100vh",
      borderRadius: "0",
      ease: "power3.inOut",
    });

    return () => {
      ScrollTrigger.killAll(); // Cleanup on unmount
    };
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Valorant
        </h2>
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Game of Game begins </p>
          <p>
            The Game of Game begins Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Reprehenderit, minus.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip" ref={clipRef}>
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="bg"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
