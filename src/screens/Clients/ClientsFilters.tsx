import React, { useState } from "react";
import DropdownSelect from "../../components/UI/DropdownSelect";
import ActionButton from "../../components/UI/ActionButton";
import { FiFilter } from "react-icons/fi";
import { ClientsFiltersProps } from "../../types/commonTypes";

const ClientsFilters: React.FC<ClientsFiltersProps> = ({ onApplyFilters, filtersConfig }) => {
  const [filters, setFilters] = useState<{ client?: string; executive?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleFilterChange = (key: "client" | "executive", value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  const applyFilters = () => {
    console.log("📌 Aplicando filtros na tabela:", filters);
    setIsLoading(true);
    onApplyFilters(filters);
    setIsLoading(false);
    setFiltersApplied(Object.values(filters).some((value) => value !== undefined && value !== ""));
  };

  const resetFilters = () => {
    setFilters({});
    setFiltersApplied(false);
    onApplyFilters({});
  };

  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 items-center sm:items-end w-full">
      {filtersConfig.map(({ key, options, placeholder }) => (
        <div key={`filter-${key}`} className="w-full sm:w-1/2">
          <DropdownSelect
            key={`dropdown-${key}`}
            value={filters[key] || ""}
            onChange={(value) => handleFilterChange(key, value)}
            options={options.map((option) =>
              typeof option === "string" ? { label: option, value: option } : option
            )}
            placeholder={placeholder}
            disabled={isLoading}
          />
        </div>
      ))}

      <div className="flex sm:w-auto relative">
        <ActionButton
          className="w-full sm:w-[120px] py-2 text-base flex items-center justify-center"
          onClick={applyFilters}
          disabled={isLoading}
        >
          {isLoading ? <div className="animate-pulse bg-gray-300 h-4 w-16 rounded-md" /> : "Buscar"}
        </ActionButton>

        {/* 🔥 Agora o ícone de filtro só aparece depois de clicar em "Buscar" */}
        {filtersApplied && (
          <button
            onClick={resetFilters}
            className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-white p-2 hover:bg-gray-100 transition-all flex items-center justify-center"
            disabled={isLoading}
          >
            <FiFilter className="text-blue-600 text-lg" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientsFilters;
