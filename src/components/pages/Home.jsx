import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: "Search",
      title: "Find Your Dream Job",
      description: "Browse thousands of job opportunities from top companies across all industries.",
    },
    {
      icon: "Users",
      title: "Connect with Employers",
      description: "Get noticed by leading employers and recruiters looking for talent like you.",
    },
    {
      icon: "TrendingUp",
      title: "Advance Your Career",
      description: "Access resources and opportunities to take your career to the next level.",
    },
    {
      icon: "Shield",
      title: "Trusted Platform",
      description: "Join thousands of professionals who trust TalentBridge for their career growth.",
    },
  ];

  const jobCategories = [
    { name: "Technology", count: "2,847", icon: "Code" },
    { name: "Healthcare", count: "1,923", icon: "Heart" },
    { name: "Finance", count: "1,456", icon: "DollarSign" },
    { name: "Education", count: "892", icon: "GraduationCap" },
    { name: "Marketing", count: "743", icon: "Megaphone" },
    { name: "Sales", count: "656", icon: "TrendingUp" },
  ];

  const handleSearch = (searchTerm) => {
    navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-accent py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Bridge Your Way to
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Career Success
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with opportunities that match your skills and ambitions. 
              TalentBridge makes finding your next career move seamless and rewarding.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for jobs, companies, or skills..."
              className="bg-white/10 backdrop-blur-md rounded-xl p-2"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => navigate("/jobs")}
              className="bg-white text-primary hover:bg-gray-50 hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <ApperIcon name="Search" className="mr-2 h-5 w-5" />
              Browse Jobs
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/employers")}
              className="border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-200 shadow-lg backdrop-blur-md"
            >
              <ApperIcon name="Building" className="mr-2 h-5 w-5" />
              For Employers
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Opportunities by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover thousands of job opportunities across various industries and specializations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-lg group-hover:scale-110 transition-transform duration-200">
                        <ApperIcon name={category.icon} className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-gray-100 text-gray-700 font-semibold">
                        {category.count} jobs
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose TalentBridge?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to connecting talented professionals with exceptional opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ApperIcon name={feature.icon} className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully advanced their careers through TalentBridge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate("/jobs")}
                className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
              >
                <ApperIcon name="Search" className="mr-2 h-5 w-5" />
                Start Job Search
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/profile")}
                className="border-gray-400 text-white hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-200"
              >
                <ApperIcon name="User" className="mr-2 h-5 w-5" />
                Create Profile
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;