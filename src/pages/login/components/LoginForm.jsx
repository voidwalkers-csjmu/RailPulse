import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLogin, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for different user roles
  const mockCredentials = {
    'controller.smith': { password: 'RailCtrl2024!', role: 'Senior Traffic Controller', name: 'Controller Smith' },
    'supervisor.jones': { password: 'SuperRail2024!', role: 'Operations Supervisor', name: 'Supervisor Jones' },
    'admin.wilson': { password: 'AdminRail2024!', role: 'System Administrator', name: 'Admin Wilson' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const credentials = mockCredentials?.[formData?.username?.toLowerCase()];
    
    if (!credentials || credentials?.password !== formData?.password) {
      setErrors({
        general: 'Invalid username or password. Please check your credentials and try again.'
      });
      return;
    }

    // Simulate authentication process
    if (onLogin) {
      await onLogin({
        username: formData?.username,
        role: credentials?.role,
        name: credentials?.name,
        rememberMe: formData?.rememberMe
      });
    }

    // Navigate to main dashboard
    navigate('/main-control-dashboard');
  };

  const handleForgotPassword = () => {
    alert('Please contact your system administrator for password reset assistance.\n\nFor immediate access, use one of the demo credentials:\n• controller.smith / RailCtrl2024!\n• supervisor.jones / SuperRail2024!\n• admin.wilson / AdminRail2024!');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error font-medium">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Username Field */}
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
          className="w-full"
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
            tabIndex={-1}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me on this device"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            size="sm"
          />
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          fullWidth
          iconName="LogIn"
          iconPosition="right"
          className="mt-6"
        >
          Sign In
        </Button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-accent hover:text-accent/80 transition-micro"
          >
            Forgot your password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;