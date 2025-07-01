import React, { useEffect, useRef, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Button from "../components/Button";
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import homeAnimation from '../assests/home-animation.json';
import sectionAnimation from '../assests/section-animation.json';
import whyAnimation from '../assests/why-us.json';
import DynamicTitle from '../components/DynamicTitle';
import { FaBolt, FaStar, FaFireAlt } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';

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
  }, []);

  useEffect(() => {
    const fetchPopularCourses = () => {
      axios.get(`${import.meta.env.VITE_BASE_URI}/api/courses/popular`)
        .then(res => setPopularCourses(res.data.courses || []))
        .catch(console.error);
    };

    fetchPopularCourses();
    
  }, []);

  useEffect(() => {
    const animateCards = (ref) => {
      if (!ref.current) return;
      const cards = ref.current.querySelectorAll('.course-card');
      if (!cards.length) return;

      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        });
    };

    animateCards(latestRef);
    animateCards(popularRef);
  }, [latestCourses, popularCourses]);

  return (
    <div>
      <DynamicTitle title="Home - Learn with Us" />
      <HeroSlider />

      {/* Latest Courses */}
      <section ref={latestRef} className="py-10 px-6 max-w-7xl mx-auto bg-gray-50 rounded-3xl my-16">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 flex items-center justify-center gap-2">
          <FaBolt className="text-yellow-500" /> Latest Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestCourses.map(course => (
            <Card
              key={course._id}
              className="course-card p-0 rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img src={course.imageURL} alt={course.title} className="w-full h-44 object-cover rounded-t-xl" />
              <CardContent className="pt-0 px-4 pb-2">
                <h3 className="text-lg font-semibold truncate">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Added: {new Date(course.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 mt-1">Author: {course.createdBy?.name}</p>
              </CardContent>
              <CardFooter className="px-4 pb-4">
                <Link to={`/course/${course._id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Courses */}
      <section ref={popularRef} className="py-10 px-6 max-w-7xl mx-auto bg-gray-50 rounded-3xl my-16">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 flex items-center justify-center gap-2">
          <FaStar className="text-orange-500" /> Popular Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularCourses.map(course => (
            <Card
              key={course._id}
              className="course-card p-0 rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img src={course.imageURL} alt={course.title} className="w-full h-44 object-cover rounded-t-xl" />
              <CardContent className="pt-0 px-4 pb-2">
                <h3 className="text-lg font-semibold truncate">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Enrolled: {course.enrolledUsers?.length || 0}</p>
              </CardContent>
              <CardFooter className="px-4 pb-4">
                <Link to={`/course/${course._id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Modern Learning Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg">
        <div className="w-full md:w-1/2">
          <Lottie animationData={homeAnimation} loop className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Modern Learning Experience</h2>
          <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
            Dive into interactive and immersive learning with live coding, hands-on quizzes, and personalized feedback.
          </p>
          <Link to="/show-all">
            <Button>Explore Courses</Button>
          </Link>
        </div>
      </section>

      

  

      {/* Community Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl shadow-2xl my-16">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Join Our Learning Community</h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
            Collaborate with passionate learners and industry experts. Share your journey, get mentorship, and grow your network.
          </p>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <Button>Join Now</Button>
          </a>
        </div>
        <div className="w-full md:w-1/2">
          <Lottie animationData={sectionAnimation} loop className="w-full h-auto" />
        </div>
      </section>

      {/* Summer Sale Section */}
      <section className="w-full bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-200 py-16 px-6 text-center rounded-2xl shadow-xl mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold text-orange-600 drop-shadow mb-6 flex items-center justify-center gap-4">
            <MdLocalOffer className="text-pink-500" /> Summer Sale: 50% OFF
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Get 50% discount on <strong>ALL courses</strong> this summer. Start learning for half the price!
          </p>
          <a
            href="/show-all"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300"
          >
            Browse Courses
          </a>
        </div>
      </section>
          {/* Why Learn With Us */}
      <section className="py-20 px-6 max-w-7xl mx-auto mb-10 flex flex-col md:flex-row items-center gap-12 bg-gray-50 rounded-3xl shadow-2xl mt-20">
        <div className="w-full md:w-1/2">
          <Lottie animationData={whyAnimation} loop className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Why Learn With Us?</h2>
          <ul className="text-gray-700 text-lg md:text-xl space-y-3">
            <li><FaFireAlt className="inline-block mr-2 text-red-500" /> Industry-expert instructors</li>
            <li><FaFireAlt className="inline-block mr-2 text-red-500" /> Real-world projects</li>
            <li><FaFireAlt className="inline-block mr-2 text-red-500" /> Lifetime access to all courses</li>
            <li><FaFireAlt className="inline-block mr-2 text-red-500" /> Certifications & support</li>
          </ul>
          <Link to="/" className="inline-block mt-6">
            <Button>Learn More</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
