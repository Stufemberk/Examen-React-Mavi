import { useState, useEffect, useCallback } from "react";
import ClienteList from "./components/ClienteList";
import ClienteForm from "./components/ClienteForm";
import type { Cliente, ClienteFormData } from "./types/Cliente";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "./services/clienteService";
import "./App.css";

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchClientes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      showNotification(
        err instanceof Error ? err.message : "Error al cargar los clientes",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleCreate = async (data: ClienteFormData) => {
    try {
      await createCliente(data);
      showNotification("Cliente creado exitosamente", "success");
      setShowForm(false);
      fetchClientes();
    } catch (err) {
      showNotification(
        err instanceof Error ? err.message : "Error al crear el cliente",
        "error"
      );
    }
  };

  const handleUpdate = async (data: ClienteFormData) => {
    if (!editingCliente) return;
    try {
      await updateCliente(editingCliente.id, data);
      showNotification("Cliente actualizado exitosamente", "success");
      setEditingCliente(null);
      setShowForm(false);
      fetchClientes();
    } catch (err) {
      showNotification(
        err instanceof Error ? err.message : "Error al actualizar el cliente",
        "error"
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      return;
    }
    try {
      await deleteCliente(id);
      showNotification("Cliente eliminado exitosamente", "success");
      fetchClientes();
    } catch (err) {
      showNotification(
        err instanceof Error ? err.message : "Error al eliminar el cliente",
        "error"
      );
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCliente(null);
  };

  return (
    <div className="app">
      {/* Notificación */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>Gestor de Clientes</h1>
            <p className="subtitle">
              Administra tu cartera de clientes de forma sencilla
            </p>
          </div>
          <button
            className="btn btn-primary btn-new"
            onClick={() => {
              setEditingCliente(null);
              setShowForm(true);
            }}
          >
            + Nuevo Cliente
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="app-main">
        <ClienteList
          clientes={clientes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>

      {/* Modal de Formulario */}
      {showForm && (
        <ClienteForm
          initialData={
            editingCliente
              ? {
                  nombre_completo: editingCliente.nombre_completo,
                  email: editingCliente.email,
                  telefono: editingCliente.telefono || "",
                  empresa: editingCliente.empresa,
                }
              : undefined
          }
          onSubmit={editingCliente ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          isEditing={!!editingCliente}
        />
      )}
    </div>
  );
}

export default App;
