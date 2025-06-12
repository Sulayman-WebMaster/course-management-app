import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import useSecureAxios from '../Hooks/useSecureAxios';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import myCoursesAnimation from '../assests/mycourse-animation.json'

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosSecure = useSecureAxios();
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axiosSecure.get(`/api/mycourses/email?email=${user.email}`);
      setCourses(res.data.courses || []);
    } catch (err) {
     
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchCourses();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/api/course/${id}/email?email=${user.email}`);
      setCourses(prev => prev.filter(course => course._id !== id));
      toast.success('Course deleted');
    } catch (err) {
      toast.error('Failed to delete course');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-[#FE7743]">My Created Courses</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : courses.length === 0 ? (
       <div className="flex flex-col items-center justify-center  text-center">
          <Lottie
            animationData={myCoursesAnimation}
            loop={true}
            className="w-100  h-100"
            ></Lottie>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">You haven't created any courses yet</h3>
          <p className="text-gray-500">Make your course Today That will be help learner!</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-[#FE7743] text-white">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{course.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.description.slice(0, 60)}...</td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      onClick={() => navigate(`/edit-courses/${course._id}`)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => setDeletingId(course._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this course?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeletingId(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
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

export default MyCourses;
