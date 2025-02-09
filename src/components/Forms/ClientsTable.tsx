import React, { useCallback, useEffect, useState } from "react";
import { Client } from "../../types/clientsTypes";
import { usePagination } from "../../hooks/usePagination";
import { removeClient } from "../../services/ClientsService";
import PaginationControls from "../UI/PaginationControls";
import { FaBuilding, FaBars } from "react-icons/fa";
import { ClientsTableProps } from "../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import ActionMenu from "../UI/ActionMenu";

const StatusBadge: React.FC<{ status: "Ativo" | "Inativo" }> = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === "Ativo" ? "bg-blue-300 text-white" : "bg-gray-400 text-white"}`}>
    {status}
  </span>
);

const ClientsTable: React.FC<ClientsTableProps> = ({ data, refreshData }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>(data);

  useEffect(() => {
    setClients(data);
  }, [data]);

  const { paginatedData, currentPage, totalPages, itemsPerPage, setItemsPerPage, handlePageChange } =
    usePagination<Client>({ data: clients });

  const handleDelete = useCallback(async (client: Client) => {
    await removeClient(client.id);
    setClients((prev) => prev.filter((c) => c.id !== client.id));
    refreshData();
  }, [refreshData]);

  const columns: {
    key: keyof Client;
    label: string;
    icon?: JSX.Element;
    format?: (value: Client[keyof Client]) => React.ReactNode;
  }[] = [
    { key: "name", label: "Cliente", icon: <FaBuilding className="text-gray-600 text-base" /> },
    { key: "cpf", label: "CNPJ" },
    { key: "type", label: "Tipo" },
    { key: "multisite", label: "Multisite", format: (v) => (v ? "Sim" : "Não") },
    { key: "status", label: "Status", format: (v) => <StatusBadge status={v as "Ativo" | "Inativo"} /> },
    { key: "executive", label: "Executiva(o)" },
  ];

  return (
    <div className="w-full">
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            {columns.map(({ key, label, icon }) => (
              <th key={key} className="p-3 text-left cursor-pointer hover:bg-gray-200 transition">
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="font-medium">{label}</span>
                  <span className="text-gray-500 text-xs">▼</span>
                </div>
              </th>
            ))}
            <th className="p-3 text-center w-12">
              <FaBars className="text-gray-600 text-lg" />
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {paginatedData.length > 0 ? (
            paginatedData.map((client) => (
              <tr key={client.id} className="border-t hover:bg-gray-50 transition">
                {columns.map(({ key, format }) => (
                  <td key={key} className="p-3">
                    {format ? format(client[key]) : client[key]}
                  </td>
                ))}
                <td className="p-3 text-center w-12">
                  <ActionMenu
                    onEdit={() => navigate(`/clientes/editar/${client.id}`)}
                    onDelete={() => handleDelete(client)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="p-6 text-center text-gray-500">
                Nenhum cliente cadastrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ClientsTable;
