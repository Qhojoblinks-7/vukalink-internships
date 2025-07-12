# VukaLink Deployment Guide

This guide covers deploying the VukaLink internship platform to various hosting platforms.

## Prerequisites

1. **Supabase Account**: Set up a Supabase project for authentication and database
2. **Git Repository**: Push your code to a Git repository (GitHub, GitLab, etc.)
3. **Environment Variables**: Prepare your environment variables

## 1. Supabase Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Note down your project URL and anon key

### Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL commands from `database/schema.sql`
4. This will create all necessary tables, indexes, and security policies

### Authentication Setup

1. Go to Authentication > Settings
2. Configure your site URL (e.g., `https://yourdomain.com`)
3. Add redirect URLs for OAuth:
   - `https://yourdomain.com/auth`
   - `https://yourdomain.com/dashboard`
4. Enable Google OAuth (optional):
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

## 2. Environment Variables

Create a `.env` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Configuration
VITE_APP_NAME=VukaLink
VITE_APP_URL=https://yourdomain.com
```

## 3. Deployment Options

### Option A: Vercel (Recommended)

Vercel provides the best experience for React applications with automatic deployments.

#### Setup Steps:

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your Git account
   - Import your repository

2. **Configure Project**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**:
   - Go to Project Settings > Environment Variables
   - Add all variables from your `.env` file
   - Make sure to add them to Production, Preview, and Development

4. **Deploy**:
   - Vercel will automatically deploy on every push to main branch
   - Your app will be available at `https://your-project.vercel.app`

#### Custom Domain (Optional):

1. Go to Project Settings > Domains
2. Add your custom domain
3. Update your DNS settings as instructed
4. Update Supabase redirect URLs with your custom domain

### Option B: Netlify

Netlify is another excellent option for static site hosting.

#### Setup Steps:

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up and connect your Git account
   - Click "New site from Git"

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 (or your preferred version)

3. **Environment Variables**:
   - Go to Site Settings > Environment Variables
   - Add all variables from your `.env` file

4. **Deploy**:
   - Netlify will build and deploy automatically
   - Your site will be available at `https://random-name.netlify.app`

### Option C: Manual Deployment

For traditional web hosting or VPS deployment.

#### Build Process:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The built files will be in the `dist` directory
```

#### Upload to Server:

1. Upload the contents of the `dist` directory to your web server
2. Configure your web server to serve `index.html` for all routes (SPA routing)
3. Set up environment variables on your server

#### Nginx Configuration Example:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/vukalink/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 4. Post-Deployment Checklist

### ✅ Verify Deployment

1. **Check Homepage**: Visit your domain and verify the landing page loads
2. **Test Authentication**: Try signing up and signing in
3. **Test Protected Routes**: Ensure dashboard pages require authentication
4. **Check Console**: Look for any JavaScript errors in browser console
5. **Mobile Responsiveness**: Test on mobile devices

### ✅ Security Checklist

1. **Environment Variables**: Ensure sensitive data is not exposed in client-side code
2. **HTTPS**: Verify your site uses HTTPS
3. **CORS**: Check that Supabase CORS settings include your domain
4. **Rate Limiting**: Consider implementing rate limiting for auth endpoints

### ✅ Performance Optimization

1. **Enable Compression**: Configure gzip/brotli compression
2. **CDN**: Consider using a CDN for static assets
3. **Caching**: Set up proper caching headers
4. **Monitoring**: Set up error monitoring (e.g., Sentry)

## 5. Monitoring and Maintenance

### Error Monitoring

Set up error monitoring to track issues in production:

```bash
# Install Sentry CLI
npm install -g @sentry/cli

# Initialize Sentry
sentry-cli init
```

### Analytics

Consider adding analytics to track user behavior:

- Google Analytics
- Plausible Analytics
- Simple Analytics

### Regular Maintenance

1. **Dependencies**: Regularly update npm packages
2. **Security**: Monitor for security vulnerabilities
3. **Backups**: Ensure Supabase data is backed up
4. **Performance**: Monitor Core Web Vitals

## 6. Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Environment Variables Not Working

- Ensure variables are prefixed with `VITE_`
- Check that variables are set in your hosting platform
- Verify no typos in variable names

#### Authentication Issues

- Check Supabase project URL and keys
- Verify redirect URLs in Supabase settings
- Check browser console for CORS errors

#### Routing Issues

- Ensure your hosting platform supports SPA routing
- Check that `index.html` is served for all routes
- Verify React Router configuration

### Getting Help

1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Review [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
3. Check hosting platform documentation
4. Create an issue in the project repository

## 7. Scaling Considerations

### Database Scaling

- Supabase automatically handles database scaling
- Monitor query performance and add indexes as needed
- Consider read replicas for high-traffic applications

### Application Scaling

- Use CDN for static assets
- Implement caching strategies
- Consider server-side rendering for SEO
- Monitor Core Web Vitals

### Cost Optimization

- Monitor Supabase usage and costs
- Optimize database queries
- Use appropriate hosting plan for your traffic
- Consider static site generation for content pages