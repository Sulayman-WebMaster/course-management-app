import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import useSecureAxios from '../Hooks/useSecureAxios';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import DynamicTitle from '../components/DynamicTitle';

const EditCourses = () => {
  const { courseId } = useParams();
  const axiosSecure = useSecureAxios();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: '',
    description: '',
    imageURL: '',
    duration: '',
    totalSeats: '',
  });
  const [loading, setLoading] = useState(true);

  // Fetch course details on mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/api/course/${courseId}`);
        const course = res.data.course;
        setForm({
          title: course.title,
          description: course.description,
          imageURL: course.imageURL,
          duration: course.duration,
          totalSeats: course.totalSeats,
        });
      } catch (err) {
        toast.error('Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.put(`/api/updatecourse/${courseId}/email?email=${user.email}`, form);
      toast.success('Course updated successfully!');
      navigate('/my-courses');
    } catch (err) {
      toast.error('Failed to update course');
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <DynamicTitle title="Edited your courses" />

      <h2 className="text-2xl font-bold mb-6 text-[#FE7743]">Edit Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="imageURL"
            value={form.imageURL}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-medium mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium mb-1">Total Seats</label>
            <input
              type="number"
              name="totalSeats"
              value={form.totalSeats}
              onChange={handleChange}
              min="1"
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#FE7743] text-white px-6 py-2 rounded hover:bg-[#e05f2d] mt-4"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourses;
