import React from "react";
import { FiArrowLeft, FiHome, FiUsers } from "react-icons/fi";
import ClientsFormFields from "../../components/Forms/ClientsFormFields";
import ActionButton from "../../components/UI/ActionButton";
import ConfirmationModal from "../../components/UI/ConfirmationModal";
import { useClientForm } from "../../hooks/useClientForm";

const ClientsForm: React.FC = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleCancel,
    confirmCancel,
    navigate,
    isEditing,
    showSuccessModal,
    setShowSuccessModal,
    showCancelModal,
    setShowCancelModal,
  } = useClientForm();

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* 🔹 Breadcrumb */}
      <div className="w-full px-6 sm:px-10 py-4">
        <nav className="text-sm text-gray-600 flex items-center gap-2">
          <FiHome className="text-gray-600" />
          <span className="text-gray-600 cursor-pointer hover:underline" onClick={() => navigate("/")}>
            Cadastros
          </span>
          &gt;
          <span className="text-gray-600 cursor-pointer hover:underline" onClick={() => navigate("/clientes")}>
            Clientes
          </span>
          &gt;
          <span className="font-semibold">{isEditing ? "Editar Cliente" : "Cadastrar Cliente"}</span>
        </nav>
      </div>

      <div className="w-full max-w-[95vw] bg-white shadow-lg border-2 border-gray-200 rounded-lg p-10 sm:p-14">
        {/* 🔹 Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <FiUsers className="text-blue-600 text-xl" />
              <h1 className="font-semibold text-blue-600 text-xl">
                {isEditing ? "Editar Cliente" : "Cadastrar Cliente"}
              </h1>
            </div>
            <p className="text-gray-500 text-sm">(*) Campos obrigatórios</p>
          </div>

          {/* ✅ Botão de voltar */}
          <ActionButton variant="white" className="flex items-center" onClick={() => navigate("/clientes")}>
            <FiArrowLeft className="mr-2 text-blue-600" size={16} />
            Voltar
          </ActionButton>
        </div>

        {/* 🔹 Formulário */}
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          {/* Campos do formulário */}
          <ClientsFormFields formData={formData} handleChange={handleChange} isEditing={isEditing} />

          {/* 🔥 Botões */}
          <div className="flex justify-end gap-4">
            <ActionButton
              variant="secondary"
              className="px-6 py-3 h-[44px] min-w-[110px] text-gray-700 border border-gray-300 rounded-md text-base"
              onClick={handleCancel}
            >
              Cancelar
            </ActionButton>

            <ActionButton
              type="submit"
              className="px-6 py-3 h-[44px] min-w-[100px] bg-blue-600 text-white hover:bg-blue-700 rounded-md text-base"
            >
              {isEditing ? "Atualizar" : "Salvar"}
            </ActionButton>
          </div>
        </form>
      </div>

      {/* 🔹 Modais de Confirmação */}
      {showSuccessModal && (
        <ConfirmationModal
          isOpen={showSuccessModal}
          type="success"
          title="Sucesso!"
          message={`Cliente ${isEditing ? "atualizado" : "cadastrado"} com sucesso.`}
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/clientes");
          }}
        />
      )}

      {showCancelModal && (
        <ConfirmationModal
          isOpen={showCancelModal}
          type="warning"
          title="Ações não foram concluídas"
          message="Deseja realmente sair?"
          onClose={() => setShowCancelModal(false)}
          onConfirm={confirmCancel}
          confirmText="Sim, desejo sair"
        />
      )}
    </div>
  );
};

export default ClientsForm;
