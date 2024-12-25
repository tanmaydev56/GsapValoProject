import React, { useRef, useState } from 'react'
import Button from './Button';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);


const Hero = () => {
    const [currentIndex, setcurrentIndex] = useState(1)
    const [hasClicked, setHasClicked] = useState(false)
    const [isLoading ,setIsLoading] = useState(true); 
    const [loadedVideos,setHasLoadedVids] = useState(0);

    const totalVideos = 4;
    // too keep track of the next videso we will make use of useRef hook
    const nextVdRef = useRef(null);


    const HandleMiniVd = ()=>{
        setHasClicked(true);
        setcurrentIndex((prevIndex) => (prevIndex < totalVideos ? prevIndex + 1 : 1)); // Loop back to the first video

    }

    useGSAP(()=>{
      if(hasClicked){
      gsap.set('#next-video',{visibility:'visible'})
    gsap.to('#next-video', {
    transformOrigin: 'center center',
    scale: 1,
    width: '100%',
    height: '100%',
    
    opacity: 1, // Fade in effect
    boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.8)', // Glow effect
    filter: 'blur(0px)', // Clear any blur effect
    duration: 2, // Extended duration for smoother animation
    ease: 'power4.out', // Dynamic easing for a more natural flow
    onStart: () => {
        nextVdRef.current.play();
        gsap.set('#next-video', { opacity: 0.5, filter: 'blur(10px)' }); // Pre-animation setup
    },
});

    

      gsap.from('#current-video',{
        transformOrigin:'center center',
        scale:0,
        duration:1.5,
        ease:'power1.inOut',
        

      })
      }

    },{dependencies:[currentIndex],revertOnUpdate:true});

    useGSAP(()=>{
      gsap.set('#video-frame',{
        clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
        // we can choose any shape clip path by clippath maker (online)
        borderRadius:'0 0 40% 10%',


      })
      // we are starting the animation from 
      gsap.from('#video-frame',{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        borderRadius:'0 0 0 0',
        ease:'power1.inOut',
        scrollTrigger:{
          trigger:'#video-frame',
          start:'center center',
          end:'bottom center',
          scrub:true
        }
        })

    })

    useEffect(()=>{
      if(loadedVideos===totalVideos-1){
        setIsLoading(false);
      }

    },[loadedVideos])


    const getVideoSrc = (index) => `videos/hero-${index}.mp4`
    const  handleVideoLoad  = () => {
      setHasLoadedVids((prev)=> prev + 1);
      
    }

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>

       
        {/* Dynamic Viewport Units
The dvh & dvw units are defined as (with emphasis
mine):
The dynamic viewport-percentage units (dv$) are
defined With respect to the dynamic viewport Size:
the viewport sized with dynamic consideration of
any IJA interfaces that are dynamically expanded
and retracted. This allows authors to size content
such that it can exactly fit within the viewport
whether or not such interfaces are present.
The sizes of the dynamic viewport-percentage
units are not stable even while the viewport itself
is unchangedIUsing these units can cause
content to resize e.g. while the user scrolls the
page. Depending on usage, this can be
disturbing to the user and/or costly in terms of
performance. */}
 {isLoading && (
  <div className='flex-center absolute  z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
    <div className='three-body'>
      <div className='three-body__dot'></div>
      <div className='three-body__dot'></div>
      <div className='three-body__dot'></div>
    
    </div>
  </div>
 )}
 {/* in order to use this laoding we need to create a useEffect by that if the video is loaded it the loader will not show and if video is not loadede it will rotate */}
      <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
        <div>
             <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                <div onClick={HandleMiniVd} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                <video
    ref={nextVdRef}
    src={getVideoSrc(currentIndex === totalVideos ? 1 : currentIndex + 1)}
    muted
    autoPlay
    playsInline
    loop
    id="current-video"
    className="size-64 origin-center scale-150 object-cover object-center"
    onLoadedData={handleVideoLoad} // Call the function when the video is loaded
/>

                </div>
             </div>
             <video

             ref={nextVdRef}
             src={getVideoSrc(currentIndex)}
             muted
             loop
             autoPlay
             playsInline
             id="next-video"
             className=' absolute-center invisible absolute z-20 size-64 object-cover object-center'
             onLoadedData={handleVideoLoad}
             // this will allow us to call a fucntion when the video is loaded

             
             />

             <video  
             src={getVideoSrc(currentIndex === totalVideos -1 ?1 : currentIndex)}
             muted
             loop

             autoPlay
             className='absolute left-0 top-0 size-full object-cover object-center'
             onLoadedData={handleVideoLoad}
             />
        </div>
        <h1 className='special-font hero-heading absolute bottom-5   right-5 z-40 text-blue-75'>G<b>a</b>ming</h1>
        <div className='absolute left-0 top-0 z-40 size-full'>
            <div className='mt-24 px-5 sm:px-10'>
                <h1 className='special-font hero-heading  text-white'>Valora<b className='text-red-500'>n</b>t 
                </h1>
                <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>Enter the Metagame of Gaming</p>
                <Button 
                title='Get Started'
                containerClass=' bg-red-500 text-white'

                />
            </div>
        </div>
         
      </div>
    </div>
  )
}

export default Hero
