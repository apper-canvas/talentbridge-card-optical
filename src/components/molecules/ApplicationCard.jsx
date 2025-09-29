import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { formatDistanceToNow } from "date-fns";

const ApplicationCard = ({ application, onViewJob, onWithdraw }) => {
  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "applied": return "info";
      case "reviewing": return "warning";
      case "shortlisted": return "primary";
      case "accepted": return "success";
      case "rejected": return "error";
      case "withdrawn": return "default";
      default: return "default";
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {application.jobTitle}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <ApperIcon name="Building" className="h-4 w-4" />
              <span>{application.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="MapPin" className="h-4 w-4" />
              <span>{application.location}</span>
            </div>
          </div>
          <Badge variant={getStatusBadgeVariant(application.status)}>
            {application.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>
            Applied {formatDistanceToNow(new Date(application.appliedDate))} ago
          </span>
        </div>

        {application.coverLetter && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            <span className="font-medium">Cover Letter:</span> {application.coverLetter}
          </p>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewJob(application)}
            className="flex-1"
          >
            <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
            View Job
          </Button>
          {application.status === "applied" && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onWithdraw(application.Id)}
              className="text-error hover:text-error hover:bg-red-50"
            >
              <ApperIcon name="X" className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;