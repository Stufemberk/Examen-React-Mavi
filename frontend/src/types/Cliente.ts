export interface Cliente {
  id: number;
  nombre_completo: string;
  email: string;
  telefono: string | null;
  empresa: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClienteFormData {
  nombre_completo: string;
  email: string;
  telefono: string;
  empresa: string;
}

export interface ApiError {
  error?: string;
  errors?: string[];
}
