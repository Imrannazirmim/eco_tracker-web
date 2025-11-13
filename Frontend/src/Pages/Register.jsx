 import React, { useState, useContext } from "react";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Loader, Image } from "lucide-react";
import { AuthContext } from "../Contexts/RootContext.jsx";
import { useNavigate } from "react-router";
 
 const Register = () => {
  const navigate = useNavigate();
  const { createUserAccount, googleSignUser } = useContext(AuthContext);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: ''
  });

  const passwordRequirements = {
    minLength: formData.password.length >= 6,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
//     if (formData.photoUrl && !/^https?:\/\/.+/.test(formData.photoUrl)) {
//       newErrors.photoUrl = 'Please enter a valid URL';
//     }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRequirements.minLength) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!passwordRequirements.hasUppercase) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!passwordRequirements.hasLowercase) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await createUserAccount(formData.email, formData.password, formData.name, formData.photoUrl);
      showToast('Account created successfully! Welcome to EcoTrack.', 'success');
      setTimeout(() => navigate('/challenges'), 1500);
    } catch (error) {
      showToast(error.message || 'Registration failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsSubmitting(true);
    try {
      await googleSignUser();
      showToast('Registration successful!', 'success');
      setTimeout(() => navigate('/challenges'), 1500);
    } catch (error) {
      showToast(error.message || 'Google sign-up failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        
        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
            alt="Forest path"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent flex items-end p-8">
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-2">Join EcoTrack</h3>
              <p className="text-green-100">Start your sustainable living journey today.</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 lg:p-12 max-h-screen overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">EcoTrack</h2>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join our community and start making a difference.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo URL <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="url"
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                    errors.photoUrl ? 'border-red-500' : 'border-gray-300'
                  } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
              </div>
              {errors.photoUrl && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.photoUrl}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <PasswordRequirement met={passwordRequirements.minLength} text="At least 6 characters" />
                  <PasswordRequirement met={passwordRequirements.hasUppercase} text="One uppercase letter" />
                  <PasswordRequirement met={passwordRequirements.hasLowercase} text="One lowercase letter" />
                  <PasswordRequirement met={passwordRequirements.hasSpecial} text="One special character" />
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.password}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or register with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignUp}
              disabled={isSubmitting}
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.335z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs text-gray-500 text-center">
              By registering, you agree to our{' '}
              <button className="text-green-600 hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-green-600 hover:underline">Privacy Policy</button>
            </p>
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/sign')}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
};
export default Register



const PasswordRequirement = ({ met, text }) => (
  <div className="flex items-center gap-2 text-xs">
    {met ? (
      <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
    ) : (
      <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />
    )}
    <span className={met ? 'text-green-600' : 'text-gray-500'}>{text}</span>
  </div>
);

let toastTimeout;
const Toast = () => {
  const [toast, setToast] = React.useState(null);
  
  React.useEffect(() => {
    window.showToast = (message, type = 'info') => {
      setToast({ message, type });
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => setToast(null), 3000);
    };
  }, []);
  
  if (!toast) return null;
  
  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  };
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
      <div className={`${colors[toast.type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
        {toast.type === 'success' && <CheckCircle size={20} />}
        {toast.type === 'error' && <AlertCircle size={20} />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

const showToast = (message, type) => {
  if (window.showToast) window.showToast(message, type);
};