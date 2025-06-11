import React, { useEffect, useState } from 'react';
import useSecureAxios from '../Hooks/useSecureAxios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URI}/api/courses`)
      .then(res => setCourses(res.data.courses || []))
      .catch(console.error);
      setLoading(false);

  }, [courses]);

  if (loading) return <span className="loading loading-spinner loading-lg"></span>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-[#FE7743]">All Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#FE7743] text-white">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-center">Duration</th>
                <th className="px-6 py-3 text-center">Total Seats</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{course.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {course.description.slice(0, 60)}...
                  </td>
                  <td className="px-6 py-4 text-center">{course.duration}</td>
                  <td className="px-6 py-4 text-center">{course.totalSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


export default Courses