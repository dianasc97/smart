import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientsTable from "../../components/Forms/ClientsTable";
import ClientsFilters from "./ClientsFilters";
import ActionButton from "../../components/UI/ActionButton";
import { FiHome, FiUsers, FiStar } from "react-icons/fi";
import { getClients } from "../../services/ClientsService";
import { Client } from "../../types/clientsTypes";
import { FilterOption } from "../../types/commonTypes";

const ClientsPage: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await getClients();
      setClients(data);
      setFilteredClients(data);
    };
    fetchClients();
  }, []);

  const applyFilters = (filters: { client?: string; executive?: string }) => {
    const filtered = clients.filter((client) => {
      return (
        (!filters.client || client.name.toLowerCase().includes(filters.client.toLowerCase())) &&
        (!filters.executive || client.executive.toLowerCase().includes(filters.executive.toLowerCase()))
      );
    });

    setFilteredClients(filtered);
  };

  const filtersConfig: FilterOption[] = [
    {
      key: "client",
      options: Array.from(new Set(clients.map((c) => c.name).filter(Boolean))),
      placeholder: "Cliente",
    },
    {
      key: "executive",
      options: Array.from(new Set(clients.map((c) => c.executive).filter(Boolean))),
      placeholder: "Executivo(a)",
    },
  ];
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full px-6 sm:px-10 py-4">
        <nav className="text-sm text-gray-600 flex items-center gap-2">
          <FiHome className="text-gray-600" />
          <span className="text-gray-600 cursor-pointer hover:underline" onClick={() => navigate("/")}>
            Cadastros
          </span>
          &gt;
          <span className="text-gray-600">Clientes</span> &gt;
          <span className="font-semibold">Clientes</span>
        </nav>
      </div>

      <div className="w-full max-w-[95vw] bg-white shadow-lg border-2 border-gray-200 rounded-lg p-10 sm:p-14">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <FiUsers className="text-blue-600 text-xl" />
              <h1 className="font-semibold text-blue-600 text-xl">Clientes</h1>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <span>Clientes</span>
              <FiStar className="text-gray-400 text-sm ml-1" />
            </div>
          </div>

          <ActionButton
            className="px-4 py-2 text-base"
            variant="white"
            icon="plus"
            onClick={() => navigate("/clientes/novo")}
          >
            Cadastrar
          </ActionButton>
        </div>

        <div className="mb-8">
          <ClientsFilters onApplyFilters={applyFilters} filtersConfig={filtersConfig} />
        </div>

        <ClientsTable
          data={filteredClients}
          onEdit={(client) => navigate(`/clientes/editar/${client.id}`)}
          refreshData={() => {}}
        />
      </div>
    </div>
  );
};

export default ClientsPage;
