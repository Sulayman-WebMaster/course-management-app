import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const slides = [
  {
    title: "Learn Anytime, Anywhere",
    subtitle: "Unlock your potential with Shikhun's flexible courses",
    bgImage:
      "https://i.postimg.cc/kMyjRhLv/pexels-divinetechygirl-1181298.jpg",
  },
  {
    title: "Expert Instructors",
    subtitle: "Get guided by industry professionals and mentors",
    bgImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Track Your Progress",
    subtitle: "Stay motivated by monitoring your learning journey",
    bgImage:
      "https://i.postimg.cc/mrx35Q0r/pexels-anastasiya-gepp-654466-1462630.jpg",
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const titleAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const subtitleAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } },
  };

  return (
    <section className="relative w-full h-[400px]  md:h-[600px]">
      <Slider {...settings} className="h-full">
        {slides.map(({ title, subtitle, bgImage }, idx) => (
          <div key={idx} className="relative h-[400px] md:h-[600px]">
            {/* Background image */}
            <div
              className="bg-gray-700 bg-blend-overlay absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${bgImage})` }}
            />

            {/* Content */}
            <div className="relative z-20 px-6 md:px-12 h-full flex flex-col justify-center max-w-4xl open-sans-bold text-white">
              <motion.h2
                className="text-3xl md:text-6xl font-bold mb-4"
                initial="hidden"
                animate="visible"
                variants={titleAnim}
                key={`title-${idx}`}
              >
                {title.toUpperCase()}
              </motion.h2>
              <motion.p
                className="text-lg md:text-2xl max-w-xl"
                initial="hidden"
                animate="visible"
                variants={subtitleAnim}
                key={`subtitle-${idx}`}
              >
                {subtitle}
               
              </motion.p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
