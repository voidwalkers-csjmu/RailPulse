import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null, className = '' }) => {
  const location = useLocation();

  const routeMap = {
    '/main-control-dashboard': {
      label: 'Main Control Dashboard',
      icon: 'LayoutDashboard'
    },
    '/train-details': {
      label: 'Train Details',
      icon: 'Train'
    },
    '/decision-simulation': {
      label: 'Decision Simulation',
      icon: 'GitBranch'
    },
    '/audit-trail': {
      label: 'Audit Trail',
      icon: 'FileText'
    },
    '/system-administration': {
      label: 'System Administration',
      icon: 'Settings'
    }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    breadcrumbs?.push({
      label: 'Dashboard',
      path: '/main-control-dashboard',
      icon: 'Home'
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];
      
      if (routeInfo && currentPath !== '/main-control-dashboard') {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render if only one breadcrumb (just dashboard)
  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <div className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground" 
              />
            )}
            
            <div className="flex items-center space-x-1">
              {crumb?.icon && (
                <Icon 
                  name={crumb?.icon} 
                  size={14} 
                  className={crumb?.isLast ? 'text-foreground' : 'text-muted-foreground'}
                />
              )}
              
              {crumb?.isLast ? (
                <span className="font-medium text-foreground">
                  {crumb?.label}
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="text-muted-foreground hover:text-foreground transition-micro"
                >
                  {crumb?.label}
                </Link>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Current Time Context for Operational Awareness */}
      <div className="ml-auto flex items-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Clock" size={12} />
        <span>Last Updated: {new Date()?.toLocaleTimeString('en-US', { hour12: false })}</span>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;