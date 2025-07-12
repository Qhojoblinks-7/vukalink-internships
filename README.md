# VukaLink - Internship Platform

A modern React-based platform connecting students with internship opportunities. Built with React, Redux Toolkit, Supabase, and Tailwind CSS.

## 🚀 Features

### ✅ Implemented
- **Authentication System**
  - Email/password sign up and sign in
  - Google OAuth integration
  - Email confirmation flow
  - Protected routes with automatic redirects

- **Landing Page**
  - Responsive design (desktop and mobile)
  - Hero sections, testimonials, call-to-action
  - Modern UI with Tailwind CSS

- **Student Dashboard**
  - Overview with statistics and recent activity
  - Application tracking with status management
  - Upcoming interviews display
  - Quick action buttons

- **Internship Discovery**
  - Search and filter functionality
  - Save/unsave internships
  - Detailed internship cards with company info
  - Apply functionality (UI ready)

- **Application Management**
  - View all applications in a table format
  - Filter by status, search, and sort
  - Pagination support
  - Bulk actions (withdraw, export)

### 🔄 In Progress / Coming Soon
- Profile management
- Messaging system
- Resources section
- Company dashboard
- Real-time notifications
- Advanced search filters

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 4
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router DOM
- **Forms**: Formik + Yup validation
- **Icons**: React Icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vukalink-internships
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🗄️ Database Schema

The application uses Supabase with the following main tables:

### `profiles`
- `id` (UUID, references auth.users)
- `full_name` (text)
- `user_type` (enum: 'student', 'company')
- `created_at` (timestamp)

### `students`
- `id` (UUID, references profiles.id)
- `major` (text)
- `graduation_year` (integer)
- `skills` (text[])

### `companies`
- `id` (UUID, references profiles.id)
- `company_name` (text)
- `industry` (text)
- `description` (text)

### `internships`
- `id` (UUID)
- `company_id` (UUID, references companies.id)
- `title` (text)
- `description` (text)
- `location` (text)
- `type` (enum: 'remote', 'on-site', 'hybrid')
- `duration` (text)
- `salary` (text)
- `skills_required` (text[])
- `created_at` (timestamp)

### `applications`
- `id` (UUID)
- `student_id` (UUID, references students.id)
- `internship_id` (UUID, references internships.id)
- `status` (enum: 'applied', 'reviewed', 'interview', 'offer', 'rejected')
- `applied_at` (timestamp)
- `updated_at` (timestamp)

## 🏗️ Project Structure

```
src/
├── app/
│   └── store.js                 # Redux store configuration
├── components/
│   ├── Auth/                    # Authentication components
│   ├── Dashboard/               # Dashboard components
│   ├── DesktopHome/             # Landing page components
│   ├── ErrorBoundary.jsx        # Error handling
│   ├── Layout.jsx               # Main layout wrapper
│   ├── ProtectedRoute.jsx       # Route protection
│   └── MobileHeroSection.jsx    # Mobile landing page
├── features/
│   └── auth/
│       └── authSlice.js         # Authentication state management
├── lib/
│   └── supabaseClient.js        # Supabase client configuration
├── pages/
│   ├── AuthPage.jsx             # Authentication page
│   ├── Dashboard.jsx            # Main dashboard
│   ├── FindInternships.jsx      # Internship discovery
│   └── MyApplications.jsx       # Application management
├── services/
│   └── authService.js           # Authentication service
├── App.jsx                      # Main app component
└── main.jsx                     # App entry point
```

## 🔐 Authentication Flow

1. **Sign Up**: User creates account with email/password or Google OAuth
2. **Email Confirmation**: Email verification required (configurable)
3. **Profile Creation**: Automatic creation of profile and role-specific records
4. **Session Management**: Persistent sessions with automatic refresh
5. **Route Protection**: Automatic redirects based on authentication status

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Ready for theme implementation
- **Loading States**: Smooth loading indicators throughout
- **Error Handling**: Graceful error boundaries and user feedback
- **Accessibility**: ARIA labels and keyboard navigation support
- **Modern Animations**: Subtle transitions and hover effects

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure environment variables on your server

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration included
- Prettier formatting (recommended)
- Component-based architecture
- Consistent naming conventions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@vukalink.com or create an issue in the repository.

## 🔮 Roadmap

- [ ] Company dashboard for posting internships
- [ ] Real-time messaging between students and companies
- [ ] Advanced search and recommendation engine
- [ ] Resume builder and portfolio features
- [ ] Interview scheduling system
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Multi-language support
