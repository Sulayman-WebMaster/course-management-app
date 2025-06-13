import React, { useEffect, useRef, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Button from "../components/Button"
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import homeAnimation from '../assests/home-animation.json'
import sectionAnimation from '../assests/section-animation.json';
import DynamicTitle from '../components/DynamicTitle';
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [latestCourses, setLatestCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const latestRef = useRef(null);
  const popularRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URI}/api/latest-courses`)
      .then(res => setLatestCourses(res.data.courses || []))
      .catch(console.error);

    axios.get(`${import.meta.env.VITE_BASE_URI}/api/courses/popular`)
      .then(res => setPopularCourses(res.data.courses || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const animateCards = (targetRef) => {
      if (!targetRef.current) return;

      const cards = targetRef.current.querySelectorAll('.course-card');
      if (cards.length === 0) {
        
        return;
      }
      

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: targetRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    };

    animateCards(latestRef);
    animateCards(popularRef);
  }, [latestCourses, popularCourses]);

  return (
    <div>
      <DynamicTitle title="Home - Learn with Us" />
      <HeroSlider />
      
      {/* Latest Courses Section */}
      <section ref={latestRef} className="py-10 px-6 max-w-7xl mx-auto bg-gray-50 rounded-3xl my-16">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Latest Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestCourses.map(course => (
            <Card
              key={course._id}
              className="course-card rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img src={course.imageURL} alt={course.title} className="h-48 w-full object-cover rounded-t-xl" />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold truncate">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Added on: {new Date(course.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 mt-1">Author Name: {course.createdBy?.name}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Link to={`/course/${course._id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        
        </div>
      </section>

      {/* Popular Courses Section */}
      <section ref={popularRef} className="py-10 px-6 max-w-7xl mx-auto bg-gray-50 rounded-3xl my-16">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularCourses.map(course => (
            <Card
              key={course._id}
              className="course-card rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img src={course.imageURL} alt={course.title} className="h-48 w-full object-cover rounded-t-xl" />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold truncate">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Enrolled: {course.enrolledUsers?.length || 0}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Link to={`/course/${course._id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
          
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg">
        <div className="w-full md:w-1/2">
          <Lottie animationData={homeAnimation} loop className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">Modern Learning Experience</h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
            Dive into interactive and immersive learning designed with cutting-edge technology. 
            Engage in live coding, hands-on quizzes, and personalized real-time feedback. 
            This is the next step in your learning journey — smarter, faster, and more fun.
          </p>
           <Link to="/show-all">
            <Button>
            Explore Courses
          </Button>
           </Link>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-white backdrop-blur-xl rounded-3xl shadow-2xl my-16">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">Join Our Learning Community</h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
            Collaborate with passionate learners and industry experts around the world. 
            Share your journey, get mentorship, and grow your network — all within a supportive and thriving educational ecosystem.
          </p>
         <a href="https://www.facebook.com/" target='_blank' rel="noopener noreferrer">
            <Button>
              Join Now
            </Button>
         
         </a>
        </div>
        <div className="w-full md:w-1/2">
          <Lottie animationData={sectionAnimation} loop className="w-full h-auto" />
        </div>
      </section>
    </div>
  );
};

export default Home;
