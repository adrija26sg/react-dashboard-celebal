# React Admin Dashboard

A modern, feature-rich React Admin Dashboard with customizable themes, interactive components, and beautiful visualizations.

## 🚀 Features

### 📊 **Dashboard Overview**

- Real-time statistics cards with trend indicators
- Interactive area charts and pie charts
- Recent activity feed with status indicators
- Responsive grid layout

### 📋 **Advanced Data Tables**

- Sortable and filterable columns
- Search functionality
- Role-based data filtering
- Add/Edit/Delete operations
- Modern table design with avatars and status chips

### 📈 **Analytics & Charts**

- Multiple chart types: Line, Area, Bar, Pie, Radar, Scatter
- Interactive chart switching
- Responsive chart containers
- Custom color schemes
- Real-time data visualization

### 📅 **Calendar & Events**

- FullCalendar integration
- Drag & drop event management
- Event creation and editing
- Multiple calendar views (Month, Week, Day)
- Event categorization with color coding

### 🎯 **Kanban Board**

- Drag & drop task management
- Multiple columns (To Do, In Progress, Review, Done)
- Task priority levels
- Assignee management
- Due date tracking
- Beautiful card-based design

### ⚙️ **Settings & Customization**

- Theme switching (Light/Dark mode)
- User profile management
- Notification preferences
- Security settings
- Language and region settings

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **Material-UI (MUI)** - UI component library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Recharts** - Chart library for React
- **React Table** - Advanced table functionality
- **FullCalendar** - Calendar component
- **React Beautiful DnD** - Drag and drop
- **Lucide React** - Modern icons
- **Framer Motion** - Animation library

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-admin-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   └── Layout/
│       └── Layout.jsx          # Main layout with sidebar and header
├── pages/
│   ├── Dashboard.jsx           # Dashboard overview page
│   ├── Tables.jsx             # Data tables page
│   ├── Charts.jsx             # Analytics and charts page
│   ├── Calendar.jsx           # Calendar and events page
│   ├── Kanban.jsx             # Kanban board page
│   └── Settings.jsx           # Settings and customization page
├── store/
│   └── themeStore.js          # Zustand store for theme management
├── App.jsx                    # Main app component with routing
├── main.jsx                   # Application entry point
└── index.css                  # Global styles
```

## 🎨 Customization

### Theme Customization

The dashboard supports both light and dark themes with customizable colors:

```javascript
// In src/store/themeStore.js
const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize primary color
    },
    secondary: {
      main: "#dc004e", // Customize secondary color
    },
  },
});
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Add navigation item in `src/components/Layout/Layout.jsx`

### Customizing Charts

Modify chart data and configurations in the respective page components:

```javascript
// Example: Customizing chart data
const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  // Add more data points
];
```

## 📱 Responsive Design

The dashboard is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Performance Features

- **Code Splitting** - Automatic route-based code splitting
- **Lazy Loading** - Components load on demand
- **Optimized Bundles** - Vite for fast builds
- **Tree Shaking** - Unused code elimination
- **Caching** - Efficient caching strategies

## 🎯 Key Features

### Interactive Components

- **Drag & Drop** - Kanban board and calendar events
- **Real-time Updates** - Live data visualization
- **Smooth Animations** - Framer Motion integration
- **Responsive Interactions** - Touch-friendly on mobile

### Data Management

- **State Management** - Zustand for lightweight state
- **Local Storage** - Theme preferences persistence
- **Form Validation** - Built-in form handling
- **Error Handling** - Graceful error states

### User Experience

- **Modern UI/UX** - Material Design principles
- **Accessibility** - WCAG compliant components
- **Keyboard Navigation** - Full keyboard support
- **Loading States** - Skeleton screens and spinners

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style

- ESLint configuration for code quality
- Prettier for consistent formatting
- TypeScript-like structure with PropTypes

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Built with ❤️ using React and Material-UI**
