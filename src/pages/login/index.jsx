import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import SystemStatus from './components/SystemStatus';
import DemoCredentials from './components/DemoCredentials';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginFormRef, setLoginFormRef] = useState(null);

  const handleLogin = async (userData) => {
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user data in localStorage for demo purposes
    localStorage.setItem('railcontrol_user', JSON.stringify(userData));
    localStorage.setItem('railcontrol_auth_token', 'demo_token_' + Date.now());
    
    setIsLoading(false);
  };

  const handleCredentialSelect = (username, password) => {
    // This would typically be handled by passing refs or using a form library
    // For demo purposes, we'll use a simple approach
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    
    if (usernameInput && passwordInput) {
      usernameInput.value = username;
      passwordInput.value = password;
      
      // Trigger change events
      usernameInput?.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput?.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="relative min-h-screen flex">
        {/* Left Panel - Branding & Information */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-card border-r border-border flex-col justify-between p-8">
          {/* Header */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Train" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">RailControl</h1>
                <p className="text-sm text-muted-foreground">Professional Railway Management</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  Advanced Traffic Control System
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time railway decision-support platform for train traffic controllers managing precedence and crossing operations with AI-powered recommendations and comprehensive audit trails.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Zap" size={20} className="text-accent" />
                  <div>
                    <h3 className="font-medium text-foreground">Real-time Decision Support</h3>
                    <p className="text-sm text-muted-foreground">AI-powered recommendations for optimal train precedence</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Icon name="BarChart3" size={20} className="text-success" />
                  <div>
                    <h3 className="font-medium text-foreground">Live Performance Metrics</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive KPI dashboard and analytics</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Shield" size={20} className="text-warning" />
                  <div>
                    <h3 className="font-medium text-foreground">Complete Audit Trail</h3>
                    <p className="text-sm text-muted-foreground">Full decision history and compliance tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <SecurityBadges />
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="w-full max-w-md mx-auto space-y-8">
            {/* Mobile Header */}
            <div className="lg:hidden text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Train" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">RailControl Pro</h1>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Railway Traffic Control System
              </p>
            </div>

            {/* Login Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to access the railway control dashboard
              </p>
            </div>

            {/* Demo Credentials Panel */}
            <DemoCredentials onCredentialSelect={handleCredentialSelect} />

            {/* Login Form */}
            <LoginForm 
              onLogin={handleLogin} 
              isLoading={isLoading}
              ref={setLoginFormRef}
            />

            {/* Additional Links */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <Link to="/system-administration" className="hover:text-accent transition-micro">
                  System Status
                </Link>
                <span>•</span>
                <a href="#" className="hover:text-accent transition-micro">
                  Support
                </a>
                <span>•</span>
                <a href="#" className="hover:text-accent transition-micro">
                  Documentation
                </a>
              </div>
            </div>

            {/* System Status for Mobile */}
            <div className="lg:hidden">
              <SystemStatus />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-glass border-t border-border p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>© {new Date()?.getFullYear()} RailControl Pro. All rights reserved.</span>
            <div className="hidden sm:flex items-center space-x-2">
              <Icon name="Shield" size={12} className="text-success" />
              <span>Secure Connection</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Version 2.4.1</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;