import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: "Active Applications",
      value: stats.activeApplications,
      icon: "FileText",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Jobs Applied",
      value: stats.totalApplications,
      icon: "Send",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Profile Views",
      value: stats.profileViews,
      icon: "Eye",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: "Star",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-md ${stat.bgColor}`}>
              <ApperIcon name={stat.icon} className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;