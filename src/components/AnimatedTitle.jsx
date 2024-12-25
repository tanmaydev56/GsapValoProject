import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Trigger when the container is 80% in the viewport
          end: "center 50%", // End when the container reaches the center
          scrub: 1.5, // Increase scrub for smoother scroll-based animation
          toggleActions: "play none none reverse",
        },
      });
  
      // Add animations to the timeline
      titleAnimation
        .fromTo(
          ".animated-word",
          {
            opacity: 0,
            transform: "translate3d(0, 40px, 0) rotateY(60deg) rotateX(15deg) scale(0.7)", // More pronounced starting state
          },
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg) scale(1)", // Animate to normal position
            ease: "power3.out", // Use a smoother easing function
            stagger: 0.1, // Slightly increase stagger for a slower sequence
            duration: 2, // Increase duration for slower animation
          }
        )
        .to(
          ".animated-word",
          {
            color: "#00ff88", // Add a color transition for visual pop
            duration: 1, // Slow down the color change
            ease: "power3.out", // Smooth easing for color transition
          },
          "-=1.5" // Overlap this animation slightly with the previous one
        );
    }, containerRef);
  
    return () => ctx.revert(); // Clean up on unmount
  }, []);
  
  

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;