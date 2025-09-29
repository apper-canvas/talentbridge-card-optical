import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { formatDistanceToNow } from "date-fns";

const JobDetailsModal = ({ job, isOpen, onClose, onApply }) => {
  if (!isOpen || !job) return null;

  const getJobTypeBadgeVariant = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time": return "success";
      case "part-time": return "warning";
      case "contract": return "info";
      case "remote": return "primary";
      default: return "default";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <Badge variant={getJobTypeBadgeVariant(job.type)}>
                    {job.type}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ApperIcon name="Building" className="h-5 w-5" />
                    <span className="text-lg font-medium">{job.company}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <ApperIcon name="MapPin" className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Calendar" className="h-4 w-4" />
                      <span>Posted {formatDistanceToNow(new Date(job.postedDate))} ago</span>
                    </div>
                  </div>

                  {job.salary && (
                    <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                      <ApperIcon name="DollarSign" className="h-5 w-5" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="shrink-0"
              >
                <ApperIcon name="X" className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="overflow-y-auto max-h-[60vh] p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {job.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <ApperIcon name="CheckCircle" className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Job Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Briefcase" className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Experience Level:</span>
                    <Badge variant="default">{job.experience}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Clock" className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Job Type:</span>
                    <Badge variant={getJobTypeBadgeVariant(job.type)}>{job.type}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <div className="border-t border-gray-100 p-6">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={() => onApply(job)}
                className="flex-1"
              >
                <ApperIcon name="Send" className="h-4 w-4 mr-2" />
                Apply for this Job
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobDetailsModal;