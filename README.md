# Train Traffic Control System

A modern, gradient-enhanced frontend for railway traffic management with real-time monitoring and AI-powered optimization.

## Features

- **Landing Page**: Professional introduction to the railway control platform
- **Secure Authentication**: Admin-only login system with pre-seeded users
- **Real-time Dashboard**: Live train monitoring with status updates
- **AI Recommendations**: Intelligent route optimization suggestions
- **Modern UI**: Gradient-enhanced design with smooth animations
- **Responsive Design**: Works seamlessly across all device sizes

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom gradients
- **Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **Authentication**: Session-based with admin users

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Navigation Flow

1. **Landing Page** (`/`) - Introduction and overview of the system
2. **Login Page** (`/login`) - Authentication for admin users
3. **Dashboard** (`/dashboard`) - Main control interface after login

### Admin Login Credentials

The system comes with pre-seeded admin users. Use any of these credentials:

- **Username**: `admin` | **Password**: `admin123`
- **Username**: `controller1` | **Password**: `control123`
- **Username**: `supervisor` | **Password**: `super123`

### Dashboard Features

- **Live Train Status**: Real-time monitoring of all active trains
- **Route Management**: View and manage train routes
- **AI Optimization**: Get intelligent suggestions for route improvements
- **System Metrics**: Monitor overall system performance
- **Emergency Controls**: Quick access to emergency procedures

## Project Structure

\`\`\`
├── app/
│   ├── page.jsx              # Landing page
│   ├── login/
│   │   └── page.jsx          # Login interface
│   ├── dashboard/
│   │   └── page.jsx          # Main dashboard
│   ├── layout.jsx            # Root layout
│   └── globals.css           # Global styles with gradients
├── components/
│   └── ui/                   # Reusable UI components
├── lib/
│   └── utils.js              # Utility functions
└── README.md                 # This file
\`\`\`

## Design System

### Colors
- **Primary**: Emerald gradients (`from-emerald-600 to-teal-600`)
- **Secondary**: Slate and gray tones
- **Accents**: Blue and amber for status indicators
- **Background**: Dark gradients for professional appearance

### Typography
- **Headings**: Bold, large text with proper hierarchy
- **Body**: Clean, readable fonts with optimal line spacing
- **Monospace**: Used for technical data and metrics

## Key Components

### Landing Page
- Hero section with animated gradients
- Feature showcase with icons
- Call-to-action leading to login

### Login System
- Secure form with validation
- Admin-only access control
- Automatic redirect to dashboard on success

### Dashboard
- Real-time train status grid
- AI recommendation cards
- System performance metrics
- Interactive controls and buttons

## Development

### Adding New Features

1. Create new components in `components/` directory
2. Add new pages in `app/` directory following Next.js App Router conventions
3. Update styles in `globals.css` for global changes
4. Use existing UI components from `components/ui/`

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Leverage gradient utilities for visual appeal
- Maintain consistent spacing with Tailwind's spacing scale
- Use semantic color classes when possible

## Deployment

This project is ready for deployment on Vercel:

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy with default settings

## License

This project is for demonstration purposes. Modify and use as needed for your railway control systems.

## Support

For questions or issues, please refer to the Next.js and Tailwind CSS documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
