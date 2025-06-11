import React, { use, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { updateProfile } from 'firebase/auth';

import { toast } from 'react-toastify';  
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const {createUser,user,setUser} = use(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    photoURL: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const validatePassword = (password, email) => {
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(password)) return 'Password must have at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must have at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must have at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must have at least one special character';
    if (email && password.toLowerCase().includes(email.toLowerCase())) return 'Password cannot contain the email address';
    return null;
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { name, photoURL, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }

    const passwordError = validatePassword(password, email);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUser(email, password);
        setUser(userCredential.user);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      toast.success('Registration successful!');
      navigate(from, { replace: true });
    } catch (firebaseError) {
      toast.error(firebaseError.message);
    } finally {
      setLoading(false);
    }
    console.log(user)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Register to start learning with <span className='sofia-regular font-semibold text-3xl'>Shikhun</span>
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Inputs here */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="photoURL">Photo URL (optional)</Label>
              <Input id="photoURL" name="photoURL" type="url" placeholder="https://example.com/photo.jpg" value={formData.photoURL} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
            </div>
             <div className="relative">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={togglePassword}
                          className="absolute right-3 top-6 text-gray-500 hover:text-[#FE7743]"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
            <div className="relative">
                       <Label htmlFor="confirmPassword">Confirm Password</Label>
                       <Input
                         id="confirmpassword"
                         type={showConfirmPassword ? 'text' : 'password'}
                         placeholder="Enter your password"
                       />
                       <button
                         type="button"
                         onClick={toggleConfirmPassword}
                         className="absolute right-3 top-6 text-gray-500 hover:text-[#FE7743]"
                       >
                         {showPassword ? <FaEyeSlash /> : <FaEye />}
                       </button>
                     </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button type="submit" className="w-full bg-[#FE7743] hover:bg-[#e86635] text-white" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
