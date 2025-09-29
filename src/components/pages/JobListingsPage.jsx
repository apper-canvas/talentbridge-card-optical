import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JobListings from "@/components/organisms/JobListings";
import JobFilters from "@/components/organisms/JobFilters";
import JobDetailsModal from "@/components/organisms/JobDetailsModal";
import ApplicationModal from "@/components/organisms/ApplicationModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const JobListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    type: "",
    experience: "",
    location: "",
    industry: "",
  });
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: "",
      experience: "",
      location: "",
      industry: "",
    });
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleQuickApply = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleApplyFromDetails = (job) => {
    setShowJobDetails(false);
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSuccess = () => {
    setShowApplicationModal(false);
    setSelectedJob(null);
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Opportunity</h1>
              <p className="text-gray-600">
                Discover amazing job opportunities from top companies
              </p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="lg:hidden"
            >
              <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`lg:w-80 shrink-0 ${filtersVisible ? 'block' : 'hidden lg:block'}`}
          >
            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </motion.div>

          {/* Job Listings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <JobListings
              filters={filters}
              searchTerm={searchTerm}
              onJobSelect={handleJobSelect}
              onQuickApply={handleQuickApply}
            />
          </motion.div>
        </div>
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={showJobDetails}
        onClose={() => {
          setShowJobDetails(false);
          setSelectedJob(null);
        }}
        onApply={handleApplyFromDetails}
      />

      {/* Application Modal */}
      <ApplicationModal
        job={selectedJob}
        isOpen={showApplicationModal}
        onClose={() => {
          setShowApplicationModal(false);
          setSelectedJob(null);
        }}
        onSuccess={handleApplicationSuccess}
      />
    </div>
  );
};

export default JobListingsPage;