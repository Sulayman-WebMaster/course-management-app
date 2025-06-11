// import { useContext, useEffect, useState } from 'react';

// import CourseCard from './CourseCard';
// import { AuthContext } from '../Provider/AuthProvider';
// import useSecureAxios from '../Hooks/useSecureAxios';

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const { user } = useContext(AuthContext); 
//   const axios = useSecureAxios();

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get(`/api/courses`);
//       setCourses(res.data.courses);
//     } catch (err) {
//       console.error('Error fetching courses:', err.message);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {courses.map(course => (
//         <CourseCard
//           key={course._id}
//           course={course}
//           user={user}
//           fetchCourses={fetchCourses}
//         />
//       ))}
//     </div>
//   );
// };

// export default Courses;

import React from 'react'

const Courses = () => {
  return (
    <div>Courses</div>
  )
}

export default Courses
