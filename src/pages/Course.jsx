import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Button from '../components/Button';
import { AuthContext } from '../Provider/AuthProvider';
import useSecureAxios from '../Hooks/useSecureAxios';
import {
  FaChalkboardTeacher,
  FaClock,
  FaUsers,
  FaUserPlus,
  FaUserTimes,
} from 'react-icons/fa';
import { MdMarkEmailUnread } from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import DynamicTitle from '../components/DynamicTitle';


const Course = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();




  const fetchCourse = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/api/course/${courseId}`);
      setCourse(res.data.course);
    } catch (err) {
      setError('Failed to fetch course');
    }
    setLoading(false);
  };



  useEffect(() => {
    fetchCourse();
  }, [courseId]);



  const secureAxios = useSecureAxios();

  const handleToggleEnrollment = async () => {


    try {
      setEnrollLoading(true);
      setError('');
      setMessage('');

      const res = await secureAxios.patch(`${import.meta.env.VITE_BASE_URI}/api/courses/enroll/${courseId}/email?email=${user.email}`, {});

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
  if (loading) return <div className="text-center py-10">Loading course...</div>;
  if (error) navigate('/', { replace: true });

  const isUserEnrolled = course.enrolledUsers.some(u => u.uid === user?.uid);
  const isFull = course.enrolledUsers.length >= course.totalSeats;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
         <DynamicTitle title={`${course.title}`} />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <img
            src={course.imageURL}
            alt={course.title}
            className="rounded-2xl shadow-2xl w-full h-80 object-cover border-4 border-[#FE7743]"
          />
        </div>

        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-extrabold text-[#FE7743]">{course.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">{course.description}</p>

          <div className="space-y-2 text-gray-700 text-lg">
            <p className="flex items-center gap-2">
              <FaClock className="text-[#FE7743]" />
              <strong>Duration:</strong> {course.duration}
            </p>
            <p className="flex items-center gap-2">
              <FaUsers className="text-[#FE7743]" />
              <strong>Enrolled:</strong> {course.enrolledUsers.length} / {course.totalSeats}
            </p>
            <p className="flex items-center gap-2">
              <FaChalkboardTeacher className="text-[#FE7743]" />
              <strong>Instructor:</strong> {course.createdBy.name}
            </p>
            <p className="flex items-center gap-2">
              <MdMarkEmailUnread className="text-[#FE7743]" />
              <strong>Contact:</strong>  {course.createdBy.email}
            </p>
          </div>

          {message && <p className="text-green-600 mb-2">{message}</p>}
          {error && <p className="text-red-600 mb-2">{error}</p>}

          {/* Additional Feedback */}
          {enrollLoading && (
            <p className="text-blue-600 mb-2">Processing your request...</p>
          )}
          {!user && (
            <p className="text-red-600 mb-2">You must be logged in to enroll in a course.</p>
          )}
          {!isUserEnrolled && isFull && (
            <p className="text-red-600 mb-2">This course is full. No seats available.</p>
          )}
          <Button
            onClick={handleToggleEnrollment}
            disabled={enrollLoading || (!isUserEnrolled && isFull) || !user}
            className={`px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${isUserEnrolled
                ? 'bg-red-600 hover:bg-red-700'
                : isFull
                  ? 'bg-gray-400'
                  : 'bg-[#FE7743] hover:bg-orange-600'
              }`}
          >
            {enrollLoading ? (
              'Processing...'
            ) : isUserEnrolled ? (
              <>
                <FaUserTimes />
                Unenroll
              </>
            ) : isFull ? (
              'No seats left'
            ) : (
              <>
                <FaUserPlus className='text-2xl mr-2'/>
                Enroll Now Only {  course.totalSeats - course.enrolledUsers.length} Seat Left!
              </>
            )}
          </Button>



        </div>
      </div>
    </div>
  );
};

export default Course;