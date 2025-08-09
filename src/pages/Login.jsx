import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import DynamicTitle from '../components/DynamicTitle';

const Login = () => {
  const { loginUser, handleGoogleSignIn, githubLogin,setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';
  

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;  
    setLoading(true);
    try {
      const result = await handleGoogleSignIn();
        setUser(result.user); 
      toast.success('Google login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  // handle GitHub login
  // This function will be called when the user clicks the GitHub login button

  const handleGithubLogin = async () => {
    if (loading) return;  
    setLoading(true);
    try {
      const result =  await githubLogin();
      setUser(result.user);
      toast.success('GitHub login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <DynamicTitle title="Login your account" />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Login to <span className='sofia-regular font-semibold text-3xl'>Shikhun</span>
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Please enter your email and password to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-6 text-gray-500 hover:text-[#FE7743]"
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FE7743] hover:bg-[#e86635] text-white"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <Link to="/register"  state={{ from: location.state?.from || '/' }} replace className="text-[#FE7743] hover:underline">Register</Link>
          </p>

          
          <div className="flex space-x-4 justify-center mt-2">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <FaGoogle className="text-red-500" />
              <span>Google</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={handleGithubLogin}
              disabled={loading}
            >
              <FaGithub className="text-gray-800" />
              <span>GitHub</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
