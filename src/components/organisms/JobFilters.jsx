import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const JobFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const jobTypes = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "remote", label: "Remote" },
    { value: "freelance", label: "Freelance" },
  ];

  const experienceLevels = [
    { value: "entry", label: "Entry Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
    { value: "executive", label: "Executive" },
  ];

  const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "consulting", label: "Consulting" },
    { value: "manufacturing", label: "Manufacturing" },
  ];

  const locations = [
    { value: "new-york", label: "New York, NY" },
    { value: "san-francisco", label: "San Francisco, CA" },
    { value: "los-angeles", label: "Los Angeles, CA" },
    { value: "chicago", label: "Chicago, IL" },
    { value: "boston", label: "Boston, MA" },
    { value: "seattle", label: "Seattle, WA" },
    { value: "remote", label: "Remote" },
  ];

  const hasActiveFilters = Object.values(filters).some(filter => filter !== "");

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Job Type
          </label>
          <FilterDropdown
            options={jobTypes}
            value={filters.type}
            onChange={(value) => onFilterChange("type", value)}
            placeholder="All Types"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Experience Level
          </label>
          <FilterDropdown
            options={experienceLevels}
            value={filters.experience}
            onChange={(value) => onFilterChange("experience", value)}
            placeholder="All Levels"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Industry
          </label>
          <FilterDropdown
            options={industries}
            value={filters.industry}
            onChange={(value) => onFilterChange("industry", value)}
            placeholder="All Industries"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Location
          </label>
          <FilterDropdown
            options={locations}
            value={filters.location}
            onChange={(value) => onFilterChange("location", value)}
            placeholder="All Locations"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilters;