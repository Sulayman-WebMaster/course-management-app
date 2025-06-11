import React, { useEffect, useRef, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Button from "../components/Button"
import { useNavigate } from 'react-router';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

      gsap.fromTo(
        targetRef.current.querySelectorAll('.course-card'),
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
               <Button>View Details</Button>
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
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Sections: Community & Learning */}
      <section className="py-14 px-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <img
          src="/images/modern-learning.jpg"
          alt="Modern Learning"
          className="rounded-3xl shadow-xl md:w-1/2 object-cover"
        />
        <div>
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Modern Learning Experience</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Dive into interactive courses designed with the latest educational technology. 
            Experience live coding, quizzes, and real-time feedback to accelerate your skills.
          </p>
          <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">Explore Courses</Button>
        </div>
      </section>

      <section className="py-14 px-6 max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 bg-gray-100 rounded-3xl">
        <div>
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Join Our Community</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Connect with thousands of learners and experts. Share your progress, collaborate on projects,
            and get support anytime you need it.
          </p>
          <Button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white">Join Now</Button>
        </div>
        <img
          src="/images/community.jpg"
          alt="Community"
          className="rounded-3xl shadow-xl md:w-1/2 object-cover"
        />
      </section>
    </div>
  );
};

export default Home;
