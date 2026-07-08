import React from "react";
import type { Cliente } from "../types/Cliente";
import "./ClienteList.css";

interface Props {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

const ClienteList: React.FC<Props> = ({
  clientes,
  onEdit,
  onDelete,
  loading,
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando clientes...</p>
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No hay clientes registrados</h3>
        <p>Crea tu primer cliente haciendo clic en el botón "Nuevo Cliente".</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="clientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Empresa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className="td-id">{cliente.id}</td>
              <td className="td-name">{cliente.nombre_completo}</td>
              <td className="td-email">{cliente.email}</td>
              <td className="td-phone">{cliente.telefono || "—"}</td>
              <td className="td-company">{cliente.empresa}</td>
              <td className="td-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => onEdit(cliente)}
                  title="Editar cliente"
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(cliente.id)}
                  title="Eliminar cliente"
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;
