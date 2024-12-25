import { useRef, useState } from "react";

 const BentoCard = ({ src, title, description, isComingSoon }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);
  
    const handleMouseMove = (event) => {
      if (!hoverButtonRef.current) return;
      const rect = hoverButtonRef.current.getBoundingClientRect();
  
      setCursorPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };
  
    const handleMouseEnter = () => {
      setHoverOpacity(1);
    };
  
    const handleMouseLeave = () => {
      setHoverOpacity(0);
    };
  
    return (
      <div className="bento-tilt_1" onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="bento-tilt_2">
          <img src={src} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-50 transition-opacity duration-300" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <h2 className="bento-title text-white">{title}</h2>
          <p className="text-white">{description}</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"
            style={{ opacity: hoverOpacity }}
          />
          <div
            ref={hoverButtonRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
            style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)` }}
          >
            {isComingSoon ? <p className="text-white">Coming Soon</p> : <p className="text-white">View</p>}
          </div>
        </div>
      </div>
    );
    };
    
    export default BentoCard
    