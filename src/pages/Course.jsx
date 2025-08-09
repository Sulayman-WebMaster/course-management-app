import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import axios from 'axios';
import Button from '../components/Button';
import { AuthContext } from '../Provider/AuthProvider';
import useSecureAxios from '../Hooks/useSecureAxios';
import { FaChalkboardTeacher, FaClock, FaUsers, FaUserPlus } from 'react-icons/fa';
import { MdCheckCircle, MdMarkEmailUnread, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import DynamicTitle from '../components/DynamicTitle';
import gsap from 'gsap';

const Course = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const secureAxios = useSecureAxios();
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const cardRowRef = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/api/course/${courseId}`);
        setCourse(res.data.course);
      } catch {
        setError('Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    const fetchAllCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/api/courses`);
        setAllCourses(res.data.courses || []);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCourse();
    fetchAllCourses();
  }, [courseId]);

  useEffect(() => {
    if (cardRowRef.current) {
      gsap.fromTo(
        cardRowRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    }
  }, [allCourses]);

  const scrollCards = (direction) => {
    const container = cardRowRef.current;
    if (!container) return;
    const scrollAmount = 320;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const handleToggleEnrollment = async () => {
    try {
      setEnrollLoading(true);
      setError('');
      setMessage('');

      const res = await secureAxios.patch(
        `${import.meta.env.VITE_BASE_URI}/api/courses/enroll/${courseId}/email?email=${user.email}`,
        {}
      );

      setMessage(res.data.message);
      toast.success(res.data.message);
      setCourse(res.data.course);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Something went wrong';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setEnrollLoading(false);
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg"></span>;
  if (error) navigate('/', { replace: true });

  const isUserEnrolled = course.enrolledUsers.some((u) => u.uid === user?.uid);
  const isFull = course.enrolledUsers.length >= course.totalSeats;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-100">
      <DynamicTitle title={course.title} />

      <div className="flex flex-col md:flex-row gap-10 mb-16">
        <div className="md:w-1/2">
          <img
            src={course.imageURL}
            alt={course.title}
            className="rounded-2xl shadow-2xl w-full h-80 object-cover border-4 border-[#FE7743]"
          />
        </div>

        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-extrabold text-[#FE7743] dark:text-orange-400">{course.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{course.description}</p>

          <div className="space-y-2 text-gray-700 dark:text-gray-300 text-lg">
            <p className="flex items-center gap-2"><FaClock className="text-[#FE7743]" /><strong>Duration:</strong> {course.duration}</p>
            <p className="flex items-center gap-2"><FaUsers className="text-[#FE7743]" /><strong>Enrolled:</strong> {course.enrolledUsers.length} / {course.totalSeats}</p>
            <p className="flex items-center gap-2"><FaChalkboardTeacher className="text-[#FE7743]" /><strong>Instructor:</strong> {course.createdBy.name}</p>
            <p className="flex items-center gap-2"><MdMarkEmailUnread className="text-[#FE7743]" /><strong>Contact:</strong> {course.createdBy.email}</p>
          </div>

          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
          {enrollLoading && <p className="text-blue-600">Processing your request...</p>}
          {!user && <p className="text-red-600">You must be logged in to enroll in a course.</p>}
          {!isUserEnrolled && isFull && <p className="text-red-600">This course is full. No seats available.</p>}

          <Button
            onClick={handleToggleEnrollment}
            disabled={enrollLoading || (!isUserEnrolled && isFull) || !user}
            className={`px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${
              isUserEnrolled ? 'bg-red-600 hover:bg-red-700' : isFull ? 'bg-gray-400' : 'bg-[#FE7743] hover:bg-orange-600'
            }`}
          >
            {enrollLoading ? (
              'Processing...'
            ) : isUserEnrolled ? (
              <>
                <MdCheckCircle className="text-2xl" />
                Enrolled
              </>
            ) : isFull ? (
              'No seats left'
            ) : (
              <>
                <FaUserPlus className="text-2xl" />
                Enroll Now – Only {course.totalSeats - course.enrolledUsers.length} left!
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Explore More */}
      <h2 className="text-2xl font-bold text-left text-[#FE7743] dark:text-orange-400 mb-6">Explore More Courses</h2>
      <div className="relative">
        <button
          onClick={() => scrollCards('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 border dark:border-gray-500 rounded-full shadow-lg p-2 hover:bg-orange-100 dark:hover:bg-orange-500/20 transition"
        >
          <MdChevronLeft size={28} />
        </button>
        <div
          ref={cardRowRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-10"
          style={{ scrollBehavior: 'smooth' }}
        >
          {allCourses
            .filter((c) => c._id !== course._id)
            .map((c) => (
              <Link to={`/course/${c._id}`} key={c._id} className="h-full">
                <div className="w-80 bg-white dark:bg-gray-800 border border-orange-200 dark:border-gray-600 rounded-xl shadow-md flex-shrink-0 flex flex-col justify-between">
                  <img
                    src={c.imageURL || 'https://via.placeholder.com/300x180'}
                    alt={c.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{c.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {c.description?.slice(0, 70) || 'No description'}...
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between mt-2">
                      <span>{c.duration}</span>
                      <span>{c.totalSeats} Seats</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default Course;
