import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { applicationService } from "@/services/api/applicationService";
import { toast } from "react-toastify";

const ApplicationModal = ({ job, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    coverLetter: "",
    resume: null,
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !job) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size must be less than 5MB");
        return;
      }
      if (!file.type.includes('pdf') && !file.type.includes('doc')) {
        toast.error("Please upload a PDF or DOC file");
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.candidateName || !formData.candidateEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.resume) {
      toast.error("Please upload your resume");
      return;
    }

    try {
      setSubmitting(true);
      
      const applicationData = {
        jobId: job.Id,
        candidateId: Math.floor(Math.random() * 1000000),
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        candidatePhone: formData.candidatePhone,
        coverLetter: formData.coverLetter,
        resumeUrl: `resumes/${formData.resume.name}`,
        status: "applied",
        appliedDate: new Date().toISOString(),
      };

      await applicationService.create(applicationData);
      toast.success("Application submitted successfully!");
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        candidateName: "",
        candidateEmail: "",
        candidatePhone: "",
        coverLetter: "",
        resume: null,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">Apply for Position</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {job.title} at {job.company}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                disabled={submitting}
              >
                <ApperIcon name="X" className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="overflow-y-auto max-h-[70vh] p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                label="Full Name"
                id="candidateName"
                required
                value={formData.candidateName}
                onChange={(e) => handleInputChange("candidateName", e.target.value)}
                placeholder="Enter your full name"
              />

              <FormField
                label="Email Address"
                id="candidateEmail"
                type="email"
                required
                value={formData.candidateEmail}
                onChange={(e) => handleInputChange("candidateEmail", e.target.value)}
                placeholder="Enter your email address"
              />

              <FormField
                label="Phone Number"
                id="candidatePhone"
                type="tel"
                value={formData.candidatePhone}
                onChange={(e) => handleInputChange("candidatePhone", e.target.value)}
                placeholder="Enter your phone number"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Resume <span className="text-error">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <ApperIcon name="Upload" className="h-8 w-8 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {formData.resume ? formData.resume.name : "Click to upload your resume"}
                    </span>
                    <span className="text-xs text-gray-500">
                      PDF or DOC files, max 5MB
                    </span>
                  </label>
                </div>
              </div>

              <FormField
                label="Cover Letter"
                id="coverLetter"
              >
                <textarea
                  id="coverLetter"
                  rows={6}
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </FormField>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={submitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? (
                    <>
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="h-4 w-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationModal;