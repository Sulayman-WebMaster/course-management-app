import React, { useContext, useState } from 'react';

import { AuthContext } from '../Provider/AuthProvider'; 
import { toast } from 'react-toastify';
import useSecureAxios from '../Hooks/useSecureAxios';

const AddCoursePage = () => {
  const { user } = useContext(AuthContext);
  const axios = useSecureAxios(); 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalSeats, setTotalSeats] = useState(10);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description ||  !duration || !totalSeats) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);

    const payload = {
      title,
      description,
      imageURL:imageURL || 'https://i.postimg.cc/HWFMBhBX/image.png',
      duration,
      totalSeats,
      createdBy: {
        email: user.email,
        name: user.displayName || 'Anonymous',
        uid: user?.uid,
        photoURL: user.photoURL || 'https://i.postimg.cc/WpB7mWdy/60111.jpg'
      }
    };

    try {
      const response = await axios.post(`/api/add-course/email?email=${user.email}`, payload);

      if (response.status === 201) {
        toast.success('Course added successfully!');
        setTitle('');
        setDescription('');
        setImageURL('');
        setDuration('');
      } else {
        toast.error('Failed to add course. Please try again.');
      }
    } catch (error) {
      toast.error('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-[#FE7743]">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Course Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE7743]"
            placeholder="Enter course title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Short Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE7743]"
            placeholder="Enter a brief description"
            rows={3}
            required
          />
        </div>

        <div>
          <label htmlFor="imageURL" className="block font-medium mb-1">
            Image URL
          </label>
          <input
            id="imageURL"
            type="url"
            value={imageURL}
            onChange={e => setImageURL(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE7743]"
            placeholder="https://example.com/image.jpg"
          
          />
        </div>

        <div>
          <label htmlFor="duration" className="block font-medium mb-1">
            Duration (e.g., 5 hours)
          </label>
          <input
            id="duration"
            type="text"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE7743]"
            placeholder="Enter course duration"
            required
          />
        </div>

        <div>
            <label htmlFor="totalSeats" className="block font-medium mb-1">
                Total Seats
            </label>
            <input
                id="totalSeats"
                type="number"
                value={totalSeats}
                onChange={e => setTotalSeats(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE7743]"
                placeholder="Enter total seats available"
                min="10"
                required
            />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FE7743] text-white font-semibold py-3 rounded hover:bg-[#e86635] transition disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCoursePage;
