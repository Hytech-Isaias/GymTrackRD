import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelectStore } from "../../store/selectStore";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string | number;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedValue, setSelectedValue } = useSelectStore();
  const currentValue = value !== undefined ? value : selectedValue;

  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(
    (opt) => opt.value === String(currentValue)
  );

  // Calculate position logic updated for Portal
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 240;

      let top = rect.bottom + window.scrollY + 8;
      if (spaceBelow < dropdownHeight) {
        // If not enough space below, show above
        top = rect.top + window.scrollY - dropdownHeight - 8;
      }

      setCoords({
        top,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is on the button
      if (
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      }

      const dropdownElement = document.getElementById(
        `select-dropdown-${uniqueId.current}`
      );
      if (dropdownElement && dropdownElement.contains(event.target as Node)) {
        return;
      }

      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const uniqueId = useRef(Math.random().toString(36).substr(2, 9));

  const handleSelect = (newValue: string) => {
    if (value === undefined) {
      setSelectedValue(newValue);
    }
    setIsOpen(false);
    onChange?.(newValue);
  };

  return (
    <div ref={selectRef} className={cn("relative w-full", className)}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between rounded-xl bg-surface-primary/50 border border-surface-border px-4 py-3 text-sm text-left transition-all duration-200 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
          isOpen && "border-primary ring-2 ring-primary/20"
        )}
      >
        <span
          className={cn(
            "block truncate",
            selectedOption ? "text-text-primary" : "text-text-tertiary"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-text-tertiary transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Portal for Dropdown */}
      {isOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              id={`select-dropdown-${uniqueId.current}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-[9999] bg-surface-primary border border-surface-border rounded-xl shadow-xl overflow-hidden backdrop-blur-xl"
              style={{
                top: coords.top,
                left: coords.left,
                width: coords.width,
                maxHeight: "240px",
              }}
            >
              <div className="max-h-[240px] overflow-auto py-1">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full px-4 py-2.5 text-sm text-left transition-colors",
                      String(currentValue) === option.value
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default Select;
