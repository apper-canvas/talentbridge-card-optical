import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { jobService } from "@/services/api/jobService";
import { employerService } from "@/services/api/employerService";
import { shortlistRequestService } from "@/services/api/shortlistRequestService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Employers = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    experience: "mid",
    salary: "",
    description: "",
    requirements: [""],
  });
  const [shortlistForm, setShortlistForm] = useState({
    jobTitle: "",
    criteria: "",
    candidateCount: 5,
  });
  const [companyProfile, setCompanyProfile] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    industry: "",
    size: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: "LayoutDashboard" },
    { id: "post-job", label: "Post Job", icon: "PlusCircle" },
    { id: "request-shortlist", label: "Request Shortlist", icon: "Users" },
    { id: "company-profile", label: "Company Profile", icon: "Building" },
  ];

  const features = [
    {
      icon: "Target",
      title: "Targeted Candidate Matching",
      description: "Our advanced matching algorithm connects you with the most qualified candidates for your specific roles.",
    },
    {
      icon: "Clock",
      title: "Fast Hiring Process",
      description: "Streamline your recruitment with our efficient application management and shortlisting services.",
    },
    {
      icon: "Shield",
      title: "Pre-Screened Candidates",
      description: "All candidates go through our verification process to ensure quality and authenticity.",
    },
    {
      icon: "BarChart",
      title: "Analytics & Insights",
      description: "Get detailed analytics on your job postings and candidate engagement to optimize your hiring strategy.",
    },
  ];

  const handleJobFormChange = (field, value) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRequirementChange = (index, value) => {
    setJobForm(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const addRequirement = () => {
    setJobForm(prev => ({
      ...prev,
      requirements: [...prev.requirements, ""]
    }));
  };

  const removeRequirement = (index) => {
    if (jobForm.requirements.length > 1) {
      setJobForm(prev => ({
        ...prev,
        requirements: prev.requirements.filter((_, i) => i !== index)
      }));
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    
    if (!jobForm.title || !jobForm.company || !jobForm.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const jobData = {
        ...jobForm,
        Id: Math.floor(Math.random() * 1000000),
        requirements: jobForm.requirements.filter(req => req.trim() !== ""),
        status: "active",
        postedDate: new Date().toISOString(),
      };

      await jobService.create(jobData);
      toast.success("Job posted successfully!");
      
      // Reset form
      setJobForm({
        title: "",
        company: "",
        location: "",
        type: "full-time",
        experience: "mid",
        salary: "",
        description: "",
        requirements: [""],
      });
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShortlistSubmit = async (e) => {
    e.preventDefault();
    
    if (!shortlistForm.jobTitle || !shortlistForm.criteria) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const requestData = {
        Id: Math.floor(Math.random() * 1000000),
        employerId: Math.floor(Math.random() * 1000),
        jobTitle: shortlistForm.jobTitle,
        criteria: shortlistForm.criteria,
        candidateCount: shortlistForm.candidateCount,
        status: "pending",
        requestDate: new Date().toISOString(),
      };

      await shortlistRequestService.create(requestData);
      toast.success("Shortlist request submitted successfully!");
      
      // Reset form
      setShortlistForm({
        jobTitle: "",
        criteria: "",
        candidateCount: 5,
      });
    } catch (error) {
      console.error("Error submitting shortlist request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!companyProfile.companyName || !companyProfile.contactPerson || !companyProfile.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const profileData = {
        ...companyProfile,
        Id: Math.floor(Math.random() * 1000000),
      };

      await employerService.create(profileData);
      toast.success("Company profile saved successfully!");
    } catch (error) {
      console.error("Error saving company profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Find the Perfect Talent</h2>
              <p className="text-lg mb-6 max-w-2xl">
                Connect with qualified candidates and build your dream team. Our placement service 
                makes hiring efficient, effective, and tailored to your needs.
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => setActiveTab("post-job")}
                  className="bg-white text-primary hover:bg-gray-50"
                >
                  <ApperIcon name="PlusCircle" className="mr-2 h-4 w-4" />
                  Post a Job
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setActiveTab("request-shortlist")}
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  <ApperIcon name="Users" className="mr-2 h-4 w-4" />
                  Request Shortlist
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-lg">
                          <ApperIcon name={feature.icon} className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-gray-600">Active Candidates</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-success mb-2">95%</div>
                  <div className="text-gray-600">Success Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">7 Days</div>
                  <div className="text-gray-600">Average Fill Time</div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "post-job":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Post a New Job</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJobSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Job Title"
                    id="title"
                    required
                    value={jobForm.title}
                    onChange={(e) => handleJobFormChange("title", e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                  />

                  <FormField
                    label="Company Name"
                    id="company"
                    required
                    value={jobForm.company}
                    onChange={(e) => handleJobFormChange("company", e.target.value)}
                    placeholder="Your company name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Location"
                    id="location"
                    value={jobForm.location}
                    onChange={(e) => handleJobFormChange("location", e.target.value)}
                    placeholder="City, State or Remote"
                  />

                  <FormField
                    label="Job Type"
                    id="type"
                  >
                    <select
                      id="type"
                      value={jobForm.type}
                      onChange={(e) => handleJobFormChange("type", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="remote">Remote</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </FormField>

                  <FormField
                    label="Experience Level"
                    id="experience"
                  >
                    <select
                      id="experience"
                      value={jobForm.experience}
                      onChange={(e) => handleJobFormChange("experience", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive</option>
                    </select>
                  </FormField>
                </div>

                <FormField
                  label="Salary Range"
                  id="salary"
                  value={jobForm.salary}
                  onChange={(e) => handleJobFormChange("salary", e.target.value)}
                  placeholder="e.g. $80,000 - $120,000"
                />

                <FormField
                  label="Job Description"
                  id="description"
                  required
                >
                  <textarea
                    id="description"
                    rows={6}
                    value={jobForm.description}
                    onChange={(e) => handleJobFormChange("description", e.target.value)}
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
                  />
                </FormField>

                {/* Requirements */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700 block">
                    Requirements
                  </label>
                  {jobForm.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                        placeholder="Enter a requirement"
                        className="flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      />
                      {jobForm.requirements.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeRequirement(index)}
                        >
                          <ApperIcon name="X" className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addRequirement}
                    className="w-full"
                  >
                    <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      Posting Job...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="h-4 w-4 mr-2" />
                      Post Job
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        );

      case "request-shortlist":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Request Candidate Shortlist</CardTitle>
              <p className="text-sm text-gray-600">
                Let our team curate a list of qualified candidates based on your specific criteria.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleShortlistSubmit} className="space-y-6">
                <FormField
                  label="Job Title/Position"
                  id="jobTitle"
                  required
                  value={shortlistForm.jobTitle}
                  onChange={(e) => setShortlistForm(prev => ({ ...prev, jobTitle: e.target.value }))}
                  placeholder="e.g. Marketing Manager"
                />

                <FormField
                  label="Candidate Criteria"
                  id="criteria"
                  required
                >
                  <textarea
                    id="criteria"
                    rows={6}
                    value={shortlistForm.criteria}
                    onChange={(e) => setShortlistForm(prev => ({ ...prev, criteria: e.target.value }))}
                    placeholder="Describe your ideal candidate: skills, experience, qualifications, soft skills, etc."
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
                  />
                </FormField>

                <FormField
                  label="Number of Candidates"
                  id="candidateCount"
                >
                  <select
                    id="candidateCount"
                    value={shortlistForm.candidateCount}
                    onChange={(e) => setShortlistForm(prev => ({ ...prev, candidateCount: parseInt(e.target.value) }))}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value={3}>3 Candidates</option>
                    <option value={5}>5 Candidates</option>
                    <option value={10}>10 Candidates</option>
                    <option value={15}>15 Candidates</option>
                  </select>
                </FormField>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <ApperIcon name="Info" className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">How it works</h4>
                      <p className="text-sm text-blue-800">
                        Our recruitment team will review your criteria and provide you with a curated 
                        list of qualified candidates within 3-5 business days. Each candidate profile 
                        includes resume, skills assessment, and our team's evaluation notes.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="h-4 w-4 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        );

      case "company-profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanyProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Company Name"
                    id="companyName"
                    required
                    value={companyProfile.companyName}
                    onChange={(e) => setCompanyProfile(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Your company name"
                  />

                  <FormField
                    label="Contact Person"
                    id="contactPerson"
                    required
                    value={companyProfile.contactPerson}
                    onChange={(e) => setCompanyProfile(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="HR Manager or hiring contact"
                  />
                </div>

                <FormField
                  label="Email Address"
                  id="email"
                  type="email"
                  required
                  value={companyProfile.email}
                  onChange={(e) => setCompanyProfile(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Contact email address"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Industry"
                    id="industry"
                  >
                    <select
                      id="industry"
                      value={companyProfile.industry}
                      onChange={(e) => setCompanyProfile(prev => ({ ...prev, industry: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </FormField>

                  <FormField
                    label="Company Size"
                    id="size"
                  >
                    <select
                      id="size"
                      value={companyProfile.size}
                      onChange={(e) => setCompanyProfile(prev => ({ ...prev, size: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Select Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </FormField>
                </div>

                <FormField
                  label="Company Description"
                  id="description"
                >
                  <textarea
                    id="description"
                    rows={4}
                    value={companyProfile.description}
                    onChange={(e) => setCompanyProfile(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your company, culture, and values..."
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
                  />
                </FormField>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      Saving Profile...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                      Save Company Profile
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Hub</h1>
          <p className="text-gray-600">
            Post jobs, request candidate shortlists, and manage your hiring process
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <ApperIcon name={tab.icon} className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Employers;