import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <ApperIcon 
          name="Briefcase" 
          className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
        />
      </div>
      <p className="text-gray-600 font-medium">{message}</p>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
};

export default Loading;