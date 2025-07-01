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
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <DynamicTitle title="Home - Learn with Us" />
      <HeroSlider />

      {/* Latest Courses */}
      <section
        ref={latestRef}
        className="py-10 px-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-3xl my-16"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center flex items-center justify-center gap-2 text-gray-900 dark:text-gray-100">
          <FaBolt className="text-yellow-500" /> Latest Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestCourses.map(course => (
            <Card
              key={course._id}
              className="course-card p-0 rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 cursor-pointer transform hover:-translate-y-1 bg-white dark:bg-gray-700"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img
                src={course.imageURL}
                alt={course.title}
                className="w-full h-44 object-cover rounded-t-xl"
              />
              <CardContent className="pt-0 px-4 pb-2">
                <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-gray-100">{course.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Added: {new Date(course.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Author: {course.createdBy?.name}</p>
              </CardContent>
              <CardFooter className="px-4 pb-4 bg-white dark:bg-gray-700">
                <Link to={`/course/${course._id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Courses */}
      <section
        ref={popularRef}
        className="py-10 px-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-3xl my-16"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center flex items-center justify-center gap-2 text-gray-900 dark:text-gray-100">
          <FaStar className="text-orange-500" /> Popular Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularCourses.map(course => (
            <Card
              key={course._id}
              className="course-card p-0 rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 cursor-pointer transform hover:-translate-y-1 bg-white dark:bg-gray-700"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img
                src={course.imageURL}
                alt={course.title}
                className="w-full h-44 object-cover rounded-t-xl"
              />
              <CardContent className="pt-0 px-4 pb-2">
                <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-gray-100">{course.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Enrolled: {course.enrolledUsers?.length || 0}</p>
              </CardContent>
              <CardFooter className="px-4 pb-4 bg-white dark:bg-gray-700">
                <Link to={`/course/${course._id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Modern Learning Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900 rounded-3xl shadow-lg">
        <div className="w-full md:w-1/2">
          <Lottie animationData={homeAnimation} loop className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">Modern Learning Experience</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-6 leading-relaxed">
            Dive into interactive and immersive learning with live coding, hands-on quizzes, and personalized feedback.
          </p>
          <Link to="/show-all">
            <Button>Explore Courses</Button>
          </Link>
        </div>
      </section>

      {/* Summer Sale Section */}
      <section className="w-full bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-200 dark:from-yellow-700 dark:via-orange-700 dark:to-pink-700 py-16 px-6 text-center rounded-2xl shadow-xl mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold text-orange-600 dark:text-orange-400 drop-shadow mb-6 flex items-center justify-center gap-4">
            <MdLocalOffer className="text-pink-500 dark:text-pink-400" /> Summer Sale: 50% OFF
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Get 50% discount on <strong>ALL courses</strong> this summer. Start learning for half the price!
          </p>
          <a
            href="/show-all"
            className="inline-block bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300"
          >
            Browse Courses
          </a>
        </div>
      </section>

      {/* Why Learn With Us */}
      <section className="py-20 px-6 max-w-7xl mx-auto mb-10 flex flex-col md:flex-row items-center gap-12 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-2xl mt-20">
        <div className="w-full md:w-1/2">
          <Lottie animationData={whyAnimation} loop className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">Why Learn With Us?</h2>
          <ul className="text-gray-700 dark:text-gray-300 text-lg md:text-xl space-y-3">
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

      {/* Community Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl my-16">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">Join Our Learning Community</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
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
    </div>
  );
};

export default Home;
