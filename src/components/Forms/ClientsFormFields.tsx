import React from "react";
import FormTextInput from "../UI/FormTextInput";
import DropdownSelect from "../UI/DropdownSelect";
import { FiPhone } from "react-icons/fi";
import { Client } from "../../types/clientsTypes";
import { ClientsFormFieldsProps } from "../../types/commonTypes";

const ClientsFormFields: React.FC<ClientsFormFieldsProps> = ({ formData, handleChange, isEditing }) => {
  const isInactive = isEditing && formData.status === "Inativo";

  const inputFields = [
    { name: "name", label: "Cliente", colSpan: 1, required: true },
    {
      name: "status",
      label: "Status",
      colSpan: 1,
      type: "select",
      options: ["Ativo", "Inativo"],
      required: true,
      disabled: isInactive,
    },
    { name: "type", label: "Razão Social", colSpan: 1, required: true },
    { name: "cpf", label: "CNPJ", colSpan: 1, required: true },
    {
      name: "phone",
      label: "Telefone",
      colSpan: 1,
      required: true,
      icon: <FiPhone className="absolute right-3 bottom-2 text-gray-400" size={18} />,
    },
    { name: "stateRegistration", label: "Inscrição Estadual", colSpan: 1, required: false },
  ];

  const selectFields = [
    { name: "executive", label: "Executivo(a)", options: ["Executivo", "Outro Executivo"], required: true },
    { name: "multisite", label: "Multisite", options: ["Sim", "Não"], required: true, transform: (v: string) => v === "Sim" },
    { name: "type", label: "Tipo", options: ["Varejista", "Atacadista"], required: true },
  ];

  const addressFields = [
    { name: "cep", label: "CEP", colSpan: 1, required: true },
    { name: "state", label: "Estado", colSpan: 1, required: true },
    { name: "city", label: "Cidade", colSpan: 1, required: true },
    { name: "neighborhood", label: "Bairro", colSpan: 1, required: true },
    { name: "street", label: "Logradouro", colSpan: 2, required: true },
    { name: "number", label: "Número", colSpan: 1, required: false },
    { name: "complement", label: "Complemento", colSpan: 1, required: false },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Dados Gerais</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {inputFields.map(({ name, label, colSpan, type, options, required, icon }) => (
          <div key={name} className={`relative ${colSpan === 2 ? "col-span-2" : ""}`}>
            {type === "select" ? (
              <DropdownSelect
                label={label}
                required={required}
                value={formData[name as keyof Client] as string}
                onChange={(value) => handleChange(name as keyof Client, value)}
                options={options?.map((opt) => ({ label: opt, value: opt })) || []}
                disabled={isInactive}
              />
            ) : (
              <FormTextInput
                label={label}
                required={required}
                value={formData[name as keyof Client] as string}
                onChange={(e) => handleChange(name as keyof Client, e.target.value)}
                disabled={isInactive}
              />
            )}
            {icon && icon}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        {selectFields.map(({ name, label, options, required, transform }) => (
          <DropdownSelect
            key={name}
            label={label}
            required={required}
            value={formData[name as keyof Client] as string}
            onChange={(value) => handleChange(name as keyof Client, transform ? transform(value) : value)}
            options={options.map((opt) => ({ label: opt, value: opt }))}
            disabled={isInactive}
          />
        ))}
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-4 mt-6">Endereço</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {addressFields.map(({ name, label, colSpan, required }) => (
          <div key={name} className={colSpan === 2 ? "col-span-2" : ""}>
            <FormTextInput
              label={label}
              required={required}
              value={formData[name as keyof Client] as string}
              onChange={(e) => handleChange(name as keyof Client, e.target.value)}
              disabled={isInactive}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsFormFields;
