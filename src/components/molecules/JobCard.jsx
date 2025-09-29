import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { formatDistanceToNow } from "date-fns";

const JobCard = ({ job, onViewDetails, onQuickApply }) => {
  const getJobTypeBadgeVariant = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time": return "success";
      case "part-time": return "warning";
      case "contract": return "info";
      case "remote": return "primary";
      default: return "default";
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "success";
      case "closed": return "error";
      case "draft": return "warning";
      default: return "default";
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <ApperIcon name="Building" className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <ApperIcon name="MapPin" className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
          </div>
          <Badge variant={getStatusBadgeVariant(job.status)}>
            {job.status}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant={getJobTypeBadgeVariant(job.type)}>
            {job.type}
          </Badge>
          <Badge variant="default">
            {job.experience}
          </Badge>
        </div>

        {job.salary && (
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <ApperIcon name="DollarSign" className="h-4 w-4" />
            <span>{job.salary}</span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {job.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>
            Posted {formatDistanceToNow(new Date(job.postedDate))} ago
          </span>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(job)}
            className="flex-1"
          >
            <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button 
            size="sm" 
            onClick={() => onQuickApply(job)}
            className="flex-1"
          >
            <ApperIcon name="Send" className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;