-- VukaLink Database Schema
-- This file contains all the SQL commands to set up the database tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_type AS ENUM ('student', 'company');
CREATE TYPE internship_type AS ENUM ('remote', 'on-site', 'hybrid');
CREATE TYPE application_status AS ENUM ('applied', 'reviewed', 'interview', 'offer', 'rejected');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    user_type user_type NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE students (
    id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    major TEXT,
    graduation_year INTEGER,
    university TEXT,
    gpa DECIMAL(3,2),
    skills TEXT[],
    resume_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
    id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    company_name TEXT NOT NULL,
    industry TEXT,
    description TEXT,
    website_url TEXT,
    logo_url TEXT,
    founded_year INTEGER,
    company_size TEXT,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Internships table
CREATE TABLE internships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    location TEXT NOT NULL,
    type internship_type NOT NULL,
    duration TEXT NOT NULL,
    salary TEXT,
    skills_required TEXT[],
    benefits TEXT[],
    application_deadline DATE,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    internship_id UUID REFERENCES internships(id) ON DELETE CASCADE NOT NULL,
    status application_status DEFAULT 'applied',
    cover_letter TEXT,
    resume_url TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, internship_id)
);

-- Saved internships table
CREATE TABLE saved_internships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    internship_id UUID REFERENCES internships(id) ON DELETE CASCADE NOT NULL,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, internship_id)
);

-- Messages table
CREATE TABLE messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    subject TEXT,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interviews table
CREATE TABLE interviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE NOT NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    interview_type TEXT NOT NULL, -- 'phone', 'video', 'on-site'
    location TEXT,
    meeting_url TEXT,
    notes TEXT,
    status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- 'application', 'interview', 'message', 'system'
    related_id UUID, -- ID of related record (application, interview, etc.)
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_type ON profiles(user_type);
CREATE INDEX idx_internships_company_id ON internships(company_id);
CREATE INDEX idx_internships_location ON internships(location);
CREATE INDEX idx_internships_type ON internships(type);
CREATE INDEX idx_internships_is_active ON internships(is_active);
CREATE INDEX idx_applications_student_id ON applications(student_id);
CREATE INDEX idx_applications_internship_id ON applications(internship_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_saved_internships_user_id ON saved_internships(user_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_internships_updated_at BEFORE UPDATE ON internships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_interviews_updated_at BEFORE UPDATE ON interviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Students policies
CREATE POLICY "Students can view their own data" ON students FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Students can update their own data" ON students FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Students can insert their own data" ON students FOR INSERT WITH CHECK (auth.uid() = id);

-- Companies policies
CREATE POLICY "Companies can view their own data" ON companies FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Companies can update their own data" ON companies FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Companies can insert their own data" ON companies FOR INSERT WITH CHECK (auth.uid() = id);

-- Internships policies
CREATE POLICY "Anyone can view active internships" ON internships FOR SELECT USING (is_active = true);
CREATE POLICY "Companies can view their own internships" ON internships FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM companies WHERE companies.id = auth.uid() AND companies.id = internships.company_id
    )
);
CREATE POLICY "Companies can insert their own internships" ON internships FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM companies WHERE companies.id = auth.uid() AND companies.id = internships.company_id
    )
);
CREATE POLICY "Companies can update their own internships" ON internships FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM companies WHERE companies.id = auth.uid() AND companies.id = internships.company_id
    )
);

-- Applications policies
CREATE POLICY "Students can view their own applications" ON applications FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM students WHERE students.id = auth.uid() AND students.id = applications.student_id
    )
);
CREATE POLICY "Companies can view applications for their internships" ON applications FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM internships 
        JOIN companies ON companies.id = internships.company_id 
        WHERE companies.id = auth.uid() AND internships.id = applications.internship_id
    )
);
CREATE POLICY "Students can insert their own applications" ON applications FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM students WHERE students.id = auth.uid() AND students.id = applications.student_id
    )
);
CREATE POLICY "Students can update their own applications" ON applications FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM students WHERE students.id = auth.uid() AND students.id = applications.student_id
    )
);

-- Saved internships policies
CREATE POLICY "Users can view their own saved internships" ON saved_internships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own saved internships" ON saved_internships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own saved internships" ON saved_internships FOR DELETE USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages they sent or received" ON messages FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can insert messages they send" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample data (optional)
-- This can be used for testing and development

-- Sample companies
INSERT INTO profiles (id, full_name, user_type) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'TechCorp', 'company'),
('550e8400-e29b-41d4-a716-446655440002', 'Creative Agency', 'company'),
('550e8400-e29b-41d4-a716-446655440003', 'Analytics Inc', 'company');

INSERT INTO companies (id, company_name, industry, description, location) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'TechCorp', 'Technology', 'Leading software development company', 'San Francisco, CA'),
('550e8400-e29b-41d4-a716-446655440002', 'Creative Agency', 'Marketing', 'Full-service creative agency', 'New York, NY'),
('550e8400-e29b-41d4-a716-446655440003', 'Analytics Inc', 'Data Science', 'Data analytics and insights company', 'Austin, TX');

-- Sample internships
INSERT INTO internships (company_id, title, description, location, type, duration, salary, skills_required) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Software Engineering Intern', 'Join our engineering team to build scalable web applications using React and Node.js.', 'San Francisco, CA', 'remote', '3 months', '$25/hour', ARRAY['React', 'Node.js', 'JavaScript', 'Git']),
('550e8400-e29b-41d4-a716-446655440002', 'Marketing Intern', 'Help develop and execute marketing campaigns for our diverse client portfolio.', 'New York, NY', 'hybrid', '6 months', '$20/hour', ARRAY['Social Media', 'Content Creation', 'Analytics', 'Adobe Creative Suite']),
('550e8400-e29b-41d4-a716-446655440003', 'Data Science Intern', 'Work with large datasets to develop machine learning models and insights.', 'Austin, TX', 'on-site', '4 months', '$30/hour', ARRAY['Python', 'SQL', 'Machine Learning', 'Statistics']);