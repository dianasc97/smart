import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaEllipsisV } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";
import { ActionMenuProps } from "../../types/commonTypes";

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  const onEditClick = () => {
    onEdit();
    setIsOpen(false);
  };

  const onDeleteClick = () => {
    setShowConfirmDelete(true);
    setIsOpen(false);
  };

  const handleConfirmDelete = async () => {
    await onDelete();
    setShowConfirmDelete(false);
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <FaEllipsisV
        className="text-gray-500 text-sm cursor-pointer hover:text-gray-600 mx-auto"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 border z-10 bg-white shadow-lg rounded-lg">
          <button
            className="w-full bg-white px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700"
            onClick={onEditClick}
          >
            ✏️ Editar
          </button>
          <button
            className="w-full bg-white px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            onClick={onDeleteClick}
          >
            ❌ Inativar
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={showConfirmDelete}
        type="warning"
        title="Inativar Cliente?"
        message="Você poderá ativá-lo novamente a qualquer momento."
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        confirmText="Sim, desejo inativar"
      />
    </div>
  );
};

export default ActionMenu;
