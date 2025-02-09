import React from "react";
import ActionButton from "./ActionButton";
import { ConfirmationModalProps } from "../../types/commonTypes";

const typeStyles = {
  success: { icon: "✅", text: "text-green-600", button: "bg-blue-600 hover:bg-blue-700" },
  warning: { icon: "⚠️", text: "text-red-600", button: "bg-red-600 hover:bg-red-700" },
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  type = "warning",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 text-center" onClick={(e) => e.stopPropagation()}>
        <div className={`${typeStyles[type].text} text-5xl mb-4`}>{typeStyles[type].icon}</div>

        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-3">{message}</p>

        <div className="flex justify-center gap-6 mt-6">
          <ActionButton variant="secondary" className="px-5 py-2 text-lg" onClick={onClose}>
            Cancelar
          </ActionButton>
          {onConfirm && (
            <ActionButton className={`text-white ${typeStyles[type].button} px-5 py-2 text-lg`} onClick={onConfirm}>
              {confirmText}
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
