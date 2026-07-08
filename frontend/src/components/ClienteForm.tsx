import React, { useState, useEffect } from "react";
import type { ClienteFormData } from "../types/Cliente";
import "./ClienteForm.css";

interface Props {
  initialData?: ClienteFormData;
  onSubmit: (data: ClienteFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const emptyForm: ClienteFormData = {
  nombre_completo: "",
  email: "",
  telefono: "",
  empresa: "",
};

const ClienteForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const [formData, setFormData] = useState<ClienteFormData>(
    initialData || emptyForm
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = "El nombre completo es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "El formato del email no es válido";
      }
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = "La empresa es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <h2>{isEditing ? "Editar Cliente" : "Nuevo Cliente"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre_completo">Nombre Completo *</label>
            <input
              id="nombre_completo"
              type="text"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              className={errors.nombre_completo ? "input-error" : ""}
            />
            {errors.nombre_completo && (
              <span className="error-text">{errors.nombre_completo}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej: juan@empresa.com"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: +52 555 123 4567"
            />
          </div>

          <div className="form-group">
            <label htmlFor="empresa">Empresa *</label>
            <input
              id="empresa"
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Ej: Acme Corp"
              className={errors.empresa ? "input-error" : ""}
            />
            {errors.empresa && (
              <span className="error-text">{errors.empresa}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Guardar Cambios" : "Crear Cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteForm;
