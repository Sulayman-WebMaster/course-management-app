import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import useSecureAxios from '../Hooks/useSecureAxios';
import { AuthContext } from '../Provider/AuthProvider';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import EnrollmentAnimation from '../assests/enrollment-page.json'; 
import DynamicTitle from '../components/DynamicTitle';
const Enrollment = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosSecure = useSecureAxios();

  const fetchCourses = async () => {
    try {
      const res = await axiosSecure.get(`/api/myEnrollments/email?email=${user.email}`);
      setCourses(res.data.courses || []);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchCourses();
  }, [user]);

  const handleUnenroll = async (id) => {
    try {
      await axiosSecure.patch(`/api/unenroll/${id}/email?email=${user.email}`); 
      setCourses(prev => prev.filter(course => course._id !== id));
      toast.success('Unenrolled successfully');
    } catch (err) {
      toast.error('Failed to unenroll');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg"></span>

  return (
    <div className=" max-w-6xl mx-auto px-4 py-8">
      <DynamicTitle title="Enroll new courses" />
      <h2 className="text-4xl font-bold mb-8 text-[#FE7743] text-center">My Enrolled Courses</h2>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center  text-center">
          <Lottie
            animationData={EnrollmentAnimation}
            loop={true}
            className="w-100  h-100"
            ></Lottie>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">You haven't enrolled in any courses yet</h3>
          <p className="text-gray-500">Browse our course catalog and start learning today!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {courses.map(course => (
            <div
              key={course._id}
              className="bg-white border border-gray-200 shadow-md rounded-xl flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={course.imageURL}
                alt={course.title}
                className="w-full md:w-64 h-48 object-cover"
              />
              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <p className="text-sm text-gray-500">Duration: {course.duration}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setDeletingId(course._id)}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                  >
                    <FaTrash /> Remove Enrollment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for confirmation */}
      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to unenroll from this course?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeletingId(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUnenroll(deletingId)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollment;
