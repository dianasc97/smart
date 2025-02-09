import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "../types/clientsTypes";
import { addClient, getClientById, updateClient } from "../services/ClientsService";

export const useClientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<Client | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (isEditing && id) {
        try {
          setLoading(true);
          const clientData = await getClientById(id);
          if (clientData) {
            setFormData(clientData);
          } else {
            console.warn("⚠️ Cliente não encontrado! Redirecionando...");
            navigate("/clientes");
          }
        } catch (err) {
          console.error("Erro ao buscar cliente:", err);
          setError("Erro ao carregar os dados do cliente.");
          navigate("/clientes");
        } finally {
          setLoading(false);
        }
      } else {
        setFormData({
          id: crypto.randomUUID(),
          name: "",
          cpf: "",
          type: "Varejista",
          multisite: false,
          status: "Ativo",
          executive: "",
          phone: "",
          stateRegistration: "",
          state: "",
          cep: "",
          city: "",
          neighborhood: "",
          street: "",
          number: "",
          complement: "",
        });
      }
    };

    fetchClient();
  }, [id, isEditing, navigate]);

  const handleChange = useCallback(
    (field: keyof Client, value: string | boolean) => {
      setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData) return;

      try {
        setLoading(true);
        if (isEditing) {
          await updateClient(formData);
        } else {
          await addClient(formData);
        }
        setShowSuccessModal(true);
      } catch (err) {
        console.error("Erro ao salvar cliente:", err);
        setError("Erro ao salvar os dados do cliente.");
      } finally {
        setLoading(false);
      }
    },
    [formData, isEditing]
  );

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    navigate("/clientes");
  };

  return {
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
    loading,
    error,
  };
};
