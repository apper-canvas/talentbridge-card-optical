import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  message = "No data found", 
  description = "There's nothing to display right now.", 
  actionText = "Get Started",
  onAction,
  icon = "Search"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 p-8">
      <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full">
        <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">{message}</h3>
        <p className="text-gray-600 max-w-md">{description}</p>
      </div>

      {onAction && (
        <Button 
          onClick={onAction}
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default Empty;