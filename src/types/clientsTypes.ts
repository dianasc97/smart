export interface Client {
  readonly id: string;
  name: string;
  cpf: string;
  type: "Varejista" | "Atacadista";
  multisite: boolean;
  status: "Ativo" | "Inativo";
  executive: string;
  phone: string;
  stateRegistration?: string;
  state: string;
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
}
