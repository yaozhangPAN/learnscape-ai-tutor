
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Star, BookOpen } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { icon: <GraduationCap className="h-8 w-8 text-learnscape-blue" />, count: "5,000+", label: "Students Taught" },
    { icon: <Users className="h-8 w-8 text-learnscape-purple" />, count: "30+", label: "Expert Tutors" },
    { icon: <Star className="h-8 w-8 text-yellow-500" />, count: "98%", label: "Success Rate" },
    { icon: <BookOpen className="h-8 w-8 text-green-500" />, count: "10+", label: "Years Experience" },
  ];

  const values = [
    { 
      title: "Student-Centered Learning", 
      description: "We believe in putting students at the center of our teaching, adapting our methods to each student's unique learning style and pace."
    },
    { 
      title: "Academic Excellence", 
      description: "We are committed to maintaining the highest academic standards, ensuring our students achieve their fullest potential."
    },
    { 
      title: "Holistic Development", 
      description: "Beyond academics, we focus on developing critical thinking, creativity, and a love for lifelong learning."
    },
    { 
      title: "Supportive Environment", 
      description: "We create a nurturing and supportive atmosphere where students feel safe to explore, question, and grow."
    },
  ];

  const team = [
    {
      name: "Sarah Tan",
      role: "Founder & Lead Educator",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      bio: "With over 15 years of experience in Singapore's education system, Sarah founded Learnscape to transform how students learn and prepare for examinations."
    },
    {
      name: "David Lim",
      role: "Head of Mathematics",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      bio: "A former MOE teacher with a passion for making mathematics accessible and enjoyable for all students regardless of their initial aptitude."
    },
    {
      name: "Li Wei Chen",
      role: "Head of Chinese Language",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      bio: "A specialist in Chinese language education with innovative teaching methods that help students overcome language barriers and excel in their exams."
    },
    {
      name: "Michael Wong",
      role: "Head of Science",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      bio: "A science enthusiast who brings practical experiments and real-world applications into his teaching to make scientific concepts memorable."
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-learnscape-blue to-learnscape-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Learnscape</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to transform education in Singapore through personalized, AI-powered learning experiences.
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-learnscape-darkBlue mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2015, Learnscape began with a simple idea: to make high-quality education accessible to all students in Singapore.
              </p>
              <p className="text-gray-700 mb-4">
                We recognized the challenges many students face in the competitive Singapore education system and set out to create a learning platform that adapts to individual needs, focuses on conceptual understanding, and prepares students not just for exams, but for lifelong success.
              </p>
              <p className="text-gray-700">
                Today, Learnscape has helped thousands of students achieve their academic goals through our innovative approach to teaching and learning.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Learnscape classroom" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-learnscape-darkBlue">Our Impact</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We measure our success by the success of our students
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-learnscape-darkBlue mb-2">{stat.count}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-learnscape-darkBlue">Our Values</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The principles that guide our approach to education
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-learnscape-blue mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-learnscape-darkBlue">Meet Our Team</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Passionate educators dedicated to your child's success
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-learnscape-darkBlue">{member.name}</h3>
                  <p className="text-learnscape-blue mb-4">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-learnscape-darkBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Begin Your Child's Learning Journey Today</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Experience the Learnscape difference with our AI-powered learning platform.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-white text-learnscape-darkBlue hover:bg-gray-200"
          >
            <Link to="/courses">Explore Our Courses</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
