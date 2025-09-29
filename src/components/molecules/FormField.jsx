import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ 
  label, 
  id, 
  error, 
  required = false, 
  className = "", 
  children,
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </Label>
      {children || <Input id={id} {...props} />}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default FormField;