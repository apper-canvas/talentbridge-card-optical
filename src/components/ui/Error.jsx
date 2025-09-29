import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  description = "We encountered an error while loading this content.", 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 p-8">
      <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
        <ApperIcon name="AlertTriangle" className="w-10 h-10 text-red-600" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">{message}</h3>
        <p className="text-gray-600 max-w-md">{description}</p>
      </div>

      {onRetry && (
        <Button 
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;