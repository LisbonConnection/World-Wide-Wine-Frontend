import React, { useEffect } from "react";
import { gsap } from "gsap";
import sam from "../assets/winepicbg.png";

function Hero() {
  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

    timeline.to(".hero-bg", {
      backgroundColor: "#f44336",
      boxShadow: "0 0 50px 20px rgba(255, 255, 255, 0.6)",
      duration: 3,
    })
    .to(".hero-bg", {
      background: "linear-gradient(45deg, #00bcd4, #0097a7)",
      boxShadow: "0 0 50px 20px rgba(33, 150, 243, 0.6)",
    })
    .to(".hero-bg", {
      backgroundColor: "#4caf50",
      boxShadow: "0 0 50px 20px rgba(0, 188, 212, 0.6)",
      duration: 3,
    })
    .to(".hero-bg", {
      background: "linear-gradient(45deg, #ffeb3b, #ff9800)", 
      boxShadow: "0 0 50px 20px rgba(0, 150, 136, 0.6)", 
      duration: 2,
    });


    const shakeTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

    shakeTimeline.to(".profile-img", {
      x: 10, 
      duration: 0.1,
    })
    .to(".profile-img", {
      x: -10,
      duration: 0.1,
    })
    .to(".profile-img", {
      x: 0, 
      duration: 0.1,
    });

  }, []);

  return (
    <div className="hero-bg h-full flex justify-center items-center bg-cover bg-center ml-1 mr-1 rounded">
      <div className="text-center text-white flex items-center">
        
        <img
          src={sam}
          alt="profile-pic"
          className="profile-img h-120 w-100 items-center rounded bg-cover" 
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Unveil the Richness of Our Premium Wine Collection</h1>
          <p className="text-lg m-5">
            Explore a handpicked selection of wines from renowned vineyards, perfect for any occasion. Whether you're new to wine or a connoisseur, we have something to delight your palate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
