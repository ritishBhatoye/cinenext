"use client";

import { Dropdown, type DropdownOption } from "@/components/elements/Dropdown";

interface FilterDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
}

const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  searchable = false,
  clearable = true,
  disabled = false,
}: FilterDropdownProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-netflix-text-secondary">
        {label}
      </label>
      <Dropdown
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        searchable={searchable}
        clearable={clearable}
        variant="outline"
        disabled={disabled}
      />
    </div>
  );
};

export default FilterDropdown;
