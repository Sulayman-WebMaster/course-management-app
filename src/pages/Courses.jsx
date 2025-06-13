import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DynamicTitle from '../components/DynamicTitle';
import { Link } from 'react-router'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URI}/api/courses`)
      .then((res) => setCourses(res.data.courses || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <DynamicTitle title="All Courses" />
      <h2 className="text-4xl font-extrabold text-[#FE7743] mb-8 text-center">Explore Courses</h2>

      {courses.length === 0 ? (
        <div className="text-center bg-orange-50 text-orange-800 p-6 rounded-lg shadow">
          <p className="text-lg">No courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {courses.map((course) => (
            <Link to={`/course/${course._id}`} key={course._id} className="h-full">
              <div className="h-full flex bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-orange-100 overflow-hidden">
                {/* Text content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {course.description.length > 100
                        ? course.description.slice(0, 100) + '...'
                        : course.description}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700 font-medium mt-auto">
                    <span>Duration: {course.duration}</span>
                    <span>Seats: {course.totalSeats}</span>
                  </div>
                </div>

                {/* Image */}
                <div className="w-40 h-auto flex-shrink-0">
                  <img
                    src={course.imageURL || 'https://via.placeholder.com/160x120?text=Course'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
