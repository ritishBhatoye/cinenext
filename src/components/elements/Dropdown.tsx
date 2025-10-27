"use client";

import * as React from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dropdownVariants = cva("relative inline-block text-left w-full", {
  variants: {
    size: {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const dropdownTriggerVariants = cva(
  "inline-flex w-full justify-between items-center rounded-md border px-4 py-2 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-netflix-gray border-netflix-light-gray text-white hover:border-netflix-text-secondary",
        outline:
          "bg-transparent border-netflix-light-gray text-white hover:border-primary",
        ghost:
          "bg-transparent border-transparent text-white hover:bg-netflix-gray/50",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const dropdownContentVariants = cva(
  "absolute z-50 mt-1 w-full rounded-md border bg-netflix-dark-gray border-netflix-light-gray shadow-lg overflow-hidden",
  {
    variants: {
      position: {
        bottom: "top-full",
        top: "bottom-full mb-1",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps
  extends Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof dropdownVariants> {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  variant?: "default" | "outline" | "ghost";
  triggerSize?: "sm" | "default" | "lg";
  position?: "top" | "bottom";
  maxHeight?: string;
  renderOption?: (
    option: DropdownOption,
    isSelected: boolean
  ) => React.ReactNode;
  renderTrigger?: (
    selectedOption: DropdownOption | null,
    isOpen: boolean
  ) => React.ReactNode;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      options,
      value,
      defaultValue,
      placeholder = "Select an option...",
      onChange,
      onOpenChange,
      disabled = false,
      searchable = false,
      clearable = false,
      multiple = false,
      variant = "default",
      triggerSize = "default",
      position = "bottom",
      size,
      maxHeight = "200px",
      renderOption,
      renderTrigger,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || ""
    );
    const [searchQuery, setSearchQuery] = React.useState("");
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const currentValue = value !== undefined ? value : internalValue;
    const selectedOption =
      options.find((option) => option.value === currentValue) || null;

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchQuery) {
        return options;
      }
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery, searchable]);

    const handleToggle = React.useCallback(() => {
      if (disabled) {
        return;
      }
      const newOpen = !isOpen;
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);

      if (newOpen && searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    }, [isOpen, disabled, onOpenChange, searchable]);

    const handleSelect = React.useCallback(
      (optionValue: string) => {
        if (multiple) {
          // Handle multiple selection logic here if needed
          return;
        }

        const newValue = optionValue;
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        setIsOpen(false);
        onOpenChange?.(false);
        setSearchQuery("");
      },
      [multiple, value, onChange, onOpenChange]
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        const newValue = "";
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        setSearchQuery("");
      },
      [value, onChange]
    );

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          onOpenChange?.(false);
          setSearchQuery("");
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
      return undefined;
    }, [isOpen, onOpenChange]);

    // Handle keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen) {
          return;
        }

        switch (event.key) {
          case "Escape":
            setIsOpen(false);
            onOpenChange?.(false);
            setSearchQuery("");
            break;
          case "Enter":
            event.preventDefault();
            if (filteredOptions.length > 0 && filteredOptions[0]) {
              handleSelect(filteredOptions[0].value);
            }
            break;
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
      return undefined;
    }, [isOpen, filteredOptions, handleSelect, onOpenChange]);

    return (
      <div
        ref={ref}
        className={cn(dropdownVariants({ size, className }))}
        {...props}
      >
        <div ref={dropdownRef}>
          {/* Trigger */}
          <div
            className={cn(
              dropdownTriggerVariants({ variant, size: triggerSize }),
              isOpen && "ring-2 ring-primary/20 border-primary",
              disabled && "pointer-events-none opacity-50",
              "cursor-pointer"
            )}
            onClick={handleToggle}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
              }
            }}
          >
            {renderTrigger ? (
              renderTrigger(selectedOption, isOpen)
            ) : (
              <>
                <span className="flex items-center gap-2 truncate">
                  {selectedOption?.icon}
                  <span
                    className={cn(!selectedOption && "text-netflix-text-muted")}
                  >
                    {selectedOption?.label || placeholder}
                  </span>
                </span>
                <div className="flex items-center gap-1">
                  {clearable && selectedOption && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-0.5 hover:bg-netflix-light-gray rounded transition-colors"
                      aria-label="Clear selection"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </div>
              </>
            )}
          </div>

          {/* Dropdown Content */}
          {isOpen && (
            <div className={cn(dropdownContentVariants({ position }))}>
              {searchable && (
                <div className="p-2 border-b border-netflix-light-gray">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search options..."
                    className="w-full px-3 py-2 bg-netflix-gray border border-netflix-light-gray rounded text-white placeholder-netflix-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              )}

              <div
                className="py-1 overflow-y-auto scrollbar-hide"
                style={{ maxHeight }}
              >
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-netflix-text-muted text-center">
                    {searchQuery ? "No options found" : "No options available"}
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = option.value === currentValue;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          !option.disabled && handleSelect(option.value)
                        }
                        disabled={option.disabled}
                        className={cn(
                          "w-full px-4 py-2 text-left flex items-center justify-between transition-colors",
                          "hover:bg-netflix-gray focus:bg-netflix-gray focus:outline-none",
                          isSelected && "bg-netflix-gray text-primary",
                          option.disabled && "opacity-50 cursor-not-allowed"
                        )}
                        role="option"
                        aria-selected={isSelected}
                      >
                        {renderOption ? (
                          renderOption(option, isSelected)
                        ) : (
                          <>
                            <span className="flex items-center gap-2 truncate">
                              {option.icon}
                              <span>{option.label}</span>
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-primary shrink-0" />
                            )}
                          </>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export {
  Dropdown,
  dropdownVariants,
  dropdownTriggerVariants,
  dropdownContentVariants,
};
