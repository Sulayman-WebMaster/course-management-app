import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import useSecureAxios from '../Hooks/useSecureAxios';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosSecure = useSecureAxios();
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axiosSecure.get(`/api/my-courses?email=${user.email}`);
      setCourses(res.data.courses || []);
    } catch (err) {
      toast.error('Failed to fetch your courses');
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
      await axiosSecure.delete(`/api/course/${id}?email=${user.email}`);
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
        <div className="text-center text-gray-500 mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Courses"
            className="w-32 mx-auto mb-4"
          />
          <p className="text-lg">You haven’t created any courses yet.</p>
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
                      onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
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
