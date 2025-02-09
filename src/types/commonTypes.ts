import { Client } from "../types/clientsTypes";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  handlePageChange: (page: number) => void;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: "success" | "warning";
}

export interface ActionButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "secondary" | "white";
  className?: string;
  icon?: "plus" | "arrow-left";
  disabled?: boolean;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: "success" | "warning";
}

export interface FormTextInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export interface DropdownSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[]
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
}

export interface StatusBadgeProps {
  status: "Ativo" | "Inativo";
}

export interface FilterOption {
  key: "client" | "executive";
  options: string[];
  placeholder: string;
}


export interface ClientsFiltersProps {
  onApplyFilters: (filters: { client?: string; executive?: string }) => void;
  filtersConfig: FilterOption[];
}

export interface UsePaginationProps<T> {
  data: T[];
  initialItemsPerPage?: number;
}

export interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export interface ClientsFormFieldsProps {
  formData: Client;
  handleChange: (field: keyof Client, value: string | boolean) => void;
  isEditing: boolean;
}

export interface ClientsTableProps {
  data: Client[];
  onEdit: (client: Client) => void;
  refreshData: () => void;
}

export interface ClientsTableBodyProps {
  data: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export interface Column<T> {
  key: keyof T;
  label: string;
  icon?: JSX.Element;
  format?: (value: any) => React.ReactNode;
}

export interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  renderActions?: (item: T) => React.ReactNode;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  handlePageChange: (page: number) => void;
}