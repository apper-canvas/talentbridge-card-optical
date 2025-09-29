import { useState } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterDropdown = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select option" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <span className="text-left">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          className="h-4 w-4" 
        />
      </Button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full mt-1 w-full z-20 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            <div className="py-1">
              {placeholder && (
                <button
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-500"
                  onClick={() => handleSelect("")}
                >
                  {placeholder}
                </button>
              )}
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                    value === option.value ? "bg-primary/10 text-primary" : ""
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterDropdown;