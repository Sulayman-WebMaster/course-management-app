import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DynamicTitle from '../components/DynamicTitle';
import { Link } from 'react-router';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URI}/api/courses`)
      .then((res) => {
        const data = res.data.courses || [];
        setCourses(data);
        setFilteredCourses(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case 'az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [searchTerm, sortBy, courses]);

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

      {/* Search + Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search courses by title..."
          className="w-full md:w-1/2 px-4 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
        </select>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center bg-orange-50 text-orange-800 p-6 rounded-lg shadow">
          <p className="text-lg">No courses found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {filteredCourses.map((course) => (
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
