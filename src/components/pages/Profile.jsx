import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { candidateService } from "@/services/api/candidateService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    skills: [],
    resumeUrl: "",
    bio: "",
    profileComplete: false,
  });
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const candidates = await candidateService.getAll();
      if (candidates.length > 0) {
        setProfile(candidates[0]);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      if (!file.type.includes('pdf') && !file.type.includes('doc')) {
        toast.error("Please upload a PDF or DOC file");
        return;
      }
      setProfile(prev => ({
        ...prev,
        resumeUrl: `resumes/${file.name}`
      }));
      toast.success("Resume uploaded successfully!");
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    if (!profile.name || !profile.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const profileData = {
        ...profile,
        profileComplete: !!(profile.name && profile.email && profile.phone && profile.location && profile.experience && profile.skills.length > 0)
      };

      if (profile.Id) {
        await candidateService.update(profile.Id, profileData);
      } else {
        profileData.Id = Math.floor(Math.random() * 1000000);
        const newProfile = await candidateService.create(profileData);
        setProfile(newProfile);
      }

      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const experienceLevels = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (2-5 years)" },
    { value: "senior", label: "Senior Level (5-10 years)" },
    { value: "executive", label: "Executive (10+ years)" },
  ];

  const calculateProfileCompletion = () => {
    const fields = [
      profile.name,
      profile.email,
      profile.phone,
      profile.location,
      profile.experience,
      profile.skills.length > 0,
      profile.resumeUrl,
      profile.bio,
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  const completionPercentage = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">
            Complete your profile to get noticed by employers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Full Name"
                      id="name"
                      required
                      value={profile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                    />

                    <FormField
                      label="Email Address"
                      id="email"
                      type="email"
                      required
                      value={profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Phone Number"
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                    />

                    <FormField
                      label="Location"
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="City, State"
                    />
                  </div>

                  <FormField
                    label="Experience Level"
                    id="experience"
                  >
                    <select
                      id="experience"
                      value={profile.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <option value="">Select experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    label="Bio"
                    id="bio"
                  >
                    <textarea
                      id="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Tell us about yourself, your experience, and career goals..."
                      className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
                    />
                  </FormField>

                  {/* Skills Section */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700 block">
                      Skills
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        className="flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      />
                      <Button type="button" onClick={handleAddSkill}>
                        <ApperIcon name="Plus" className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="primary"
                          className="flex items-center gap-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 hover:text-red-600"
                          >
                            <ApperIcon name="X" className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Resume
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <ApperIcon name="Upload" className="h-8 w-8 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {profile.resumeUrl ? "Resume uploaded" : "Click to upload your resume"}
                        </span>
                        <span className="text-xs text-gray-500">
                          PDF or DOC files, max 5MB
                        </span>
                      </label>
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                        Save Profile
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <Badge variant={completionPercentage === 100 ? "success" : "warning"}>
                      {completionPercentage}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <ApperIcon 
                        name={profile.name ? "Check" : "X"} 
                        className={`h-4 w-4 ${profile.name ? "text-success" : "text-gray-400"}`} 
                      />
                      <span className={profile.name ? "text-gray-600" : "text-gray-400"}>
                        Basic information
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon 
                        name={profile.resumeUrl ? "Check" : "X"} 
                        className={`h-4 w-4 ${profile.resumeUrl ? "text-success" : "text-gray-400"}`} 
                      />
                      <span className={profile.resumeUrl ? "text-gray-600" : "text-gray-400"}>
                        Resume uploaded
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon 
                        name={profile.skills.length > 0 ? "Check" : "X"} 
                        className={`h-4 w-4 ${profile.skills.length > 0 ? "text-success" : "text-gray-400"}`} 
                      />
                      <span className={profile.skills.length > 0 ? "text-gray-600" : "text-gray-400"}>
                        Skills added
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon 
                        name={profile.bio ? "Check" : "X"} 
                        className={`h-4 w-4 ${profile.bio ? "text-success" : "text-gray-400"}`} 
                      />
                      <span className={profile.bio ? "text-gray-600" : "text-gray-400"}>
                        Bio completed
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <ApperIcon name="Lightbulb" className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                    <span className="text-gray-600">
                      Complete profiles get 3x more views from employers
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ApperIcon name="Target" className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-gray-600">
                      Add relevant skills to match job requirements
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ApperIcon name="FileText" className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span className="text-gray-600">
                      Keep your resume updated with latest experience
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;