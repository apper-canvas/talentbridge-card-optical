import { useState, useEffect } from "react";
import JobCard from "@/components/molecules/JobCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { jobService } from "@/services/api/jobService";
import { toast } from "react-toastify";

const JobListings = ({ 
  filters, 
  searchTerm, 
  onJobSelect, 
  onQuickApply, 
  className = "" 
}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await jobService.getAll();
      setJobs(data);
    } catch (err) {
      setError("Failed to load jobs. Please try again.");
      console.error("Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !filters.type || job.type.toLowerCase() === filters.type;
    const matchesExperience = !filters.experience || job.experience.toLowerCase() === filters.experience;
    const matchesLocation = !filters.location || 
      job.location.toLowerCase().includes(filters.location.replace("-", " "));
    const matchesStatus = job.status === "active";

    return matchesSearch && matchesType && matchesExperience && matchesLocation && matchesStatus;
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handleQuickApply = (job) => {
    onQuickApply(job);
    toast.success("Application submitted successfully!");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadJobs} />;
  if (filteredJobs.length === 0) {
    return (
      <Empty 
        message="No jobs found matching your criteria"
        description="Try adjusting your filters or search terms to find more opportunities."
        actionText="Clear Filters"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + jobsPerPage, filteredJobs.length)} of{" "}
          {filteredJobs.length} jobs
        </p>
        {(filters.type || filters.experience || filters.location || searchTerm) && (
          <p className="text-sm text-primary">
            Filtered results
          </p>
        )}
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedJobs.map((job) => (
          <JobCard
            key={job.Id}
            job={job}
            onViewDetails={onJobSelect}
            onQuickApply={handleQuickApply}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ApperIcon name="ChevronLeft" className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ApperIcon name="ChevronRight" className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobListings;