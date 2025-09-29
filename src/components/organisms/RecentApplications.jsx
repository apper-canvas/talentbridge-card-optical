import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import ApplicationCard from "@/components/molecules/ApplicationCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { applicationService } from "@/services/api/applicationService";
import { toast } from "react-toastify";

const RecentApplications = ({ limit = 6 }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await applicationService.getAll();
      const sortedData = data.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
      setApplications(limit ? sortedData.slice(0, limit) : sortedData);
    } catch (err) {
      setError("Failed to load applications. Please try again.");
      console.error("Error loading applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewJob = (application) => {
    // In a real app, this would navigate to job details
    toast.info(`Viewing job: ${application.jobTitle}`);
  };

  const handleWithdraw = async (applicationId) => {
    if (!confirm("Are you sure you want to withdraw this application?")) {
      return;
    }

    try {
      await applicationService.update(applicationId, { status: "withdrawn" });
      toast.success("Application withdrawn successfully");
      loadApplications(); // Refresh the list
    } catch (error) {
      console.error("Error withdrawing application:", error);
      toast.error("Failed to withdraw application");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadApplications} />;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Applications</CardTitle>
          <Button variant="outline" size="sm">
            <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <Empty
            message="No applications yet"
            description="Start applying to jobs to see your applications here."
            actionText="Browse Jobs"
            onAction={() => window.location.href = "/jobs"}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.map((application) => (
              <ApplicationCard
                key={application.Id}
                application={application}
                onViewJob={handleViewJob}
                onWithdraw={handleWithdraw}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentApplications;