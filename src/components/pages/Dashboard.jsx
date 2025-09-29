import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardStats from "@/components/organisms/DashboardStats";
import RecentApplications from "@/components/organisms/RecentApplications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import { applicationService } from "@/services/api/applicationService";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeApplications: 0,
    totalApplications: 0,
    profileViews: 0,
    shortlisted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load applications
      const applicationsData = await applicationService.getAll();
      setApplications(applicationsData);
      
      // Calculate stats
      const activeCount = applicationsData.filter(app => 
        ["applied", "reviewing", "shortlisted"].includes(app.status.toLowerCase())
      ).length;
      
      const shortlistedCount = applicationsData.filter(app => 
        app.status.toLowerCase() === "shortlisted"
      ).length;

      setStats({
        activeApplications: activeCount,
        totalApplications: applicationsData.length,
        profileViews: Math.floor(Math.random() * 100) + 50, // Mock data
        shortlisted: shortlistedCount,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "applied": return "info";
      case "reviewing": return "warning";
      case "shortlisted": return "primary";
      case "accepted": return "success";
      case "rejected": return "error";
      default: return "default";
    }
  };

  if (loading) return <Loading message="Loading your dashboard..." />;

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">
                Track your job applications and career progress
              </p>
            </div>
<Button onClick={() => navigate('/jobs')}>
              <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
              Apply to More Jobs
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <DashboardStats stats={stats} />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:col-span-2"
          >
            <RecentApplications />
          </motion.div>

          {/* Quick Actions & Profile Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <ApperIcon name="Search" className="h-4 w-4 mr-2" />
                  Browse New Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ApperIcon name="User" className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ApperIcon name="FileText" className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ApperIcon name="Bell" className="h-4 w-4 mr-2" />
                  Set Job Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profile Completeness</span>
                    <Badge variant="warning">75%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-3/4"></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Check" className="h-4 w-4 text-success" />
                      <span className="text-gray-600">Basic information added</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Check" className="h-4 w-4 text-success" />
                      <span className="text-gray-600">Resume uploaded</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon name="X" className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">Add skills and experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon name="X" className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">Complete preferences</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Application Status Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applications.slice(0, 5).map((app, index) => (
                    <div key={app.Id} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {app.jobTitle}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {app.company}
                        </p>
                      </div>
                      <Badge 
                        variant={getStatusBadgeVariant(app.status)}
                        className="shrink-0 ml-2"
                      >
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No applications yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;