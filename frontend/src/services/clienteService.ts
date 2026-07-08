import type { Cliente, ClienteFormData, ApiError } from "../types/Cliente";

const API_URL = "http://localhost:3001/api/clientes";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ApiError = await response.json();
    const message =
      errorData.errors?.join(", ") ||
      errorData.error ||
      "Error desconocido del servidor";
    throw new Error(message);
  }
  return response.json();
}

export async function getClientes(): Promise<Cliente[]> {
  const response = await fetch(API_URL);
  return handleResponse<Cliente[]>(response);
}

export async function getClienteById(id: number): Promise<Cliente> {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse<Cliente>(response);
}

export async function createCliente(
  data: ClienteFormData
): Promise<Cliente> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Cliente>(response);
}

export async function updateCliente(
  id: number,
  data: ClienteFormData
): Promise<Cliente> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Cliente>(response);
}

export async function deleteCliente(
  id: number
): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ message: string }>(response);
}
