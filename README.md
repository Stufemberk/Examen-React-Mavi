# Gestor de Clientes

Aplicación web para la gestión de clientes (CRUD completo) con **Backend** en Node.js (Express + TypeScript + Prisma + SQLite) y **Frontend** en React (Vite + TypeScript).

## Estructura del Proyecto

```
examen-mavi/
├── backend/          # API REST con Express y Prisma
│   ├── prisma/       # Esquema y migraciones de la BD
│   ├── src/
│   │   ├── config/   # Configuración de la base de datos
│   │   ├── routes/   # Rutas del CRUD de clientes
│   │   └── index.ts  # Punto de entrada del servidor
│   └── package.json
├── frontend/         # Aplicación React con Vite
│   ├── src/
│   │   ├── components/  # Componentes de la UI
│   │   ├── services/    # Capa de comunicación con la API
│   │   ├── types/       # Interfaces TypeScript
│   │   └── App.tsx      # Componente principal
│   └── package.json
└── README.md
```

## Requisitos Previos

- **Node.js** v18 o superior
- **npm** v9 o superior

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd examen-mavi
```

### 2. Backend

```bash
# Entrar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Ejecutar migraciones de la base de datos (crea el archivo SQLite)
npx prisma migrate dev --name init

# Iniciar el servidor de desarrollo (puerto 3001)
npm run dev
```

El servidor estará disponible en: `http://localhost:3001`

### 3. Frontend

Abrir una **nueva terminal** y ejecutar:

```bash
# Entrar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo (puerto 5173)
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## Endpoints de la API

| Método | Ruta                | Descripción              |
| ------ | ------------------- | ------------------------ |
| GET    | /api/clientes       | Listar todos los clientes |
| GET    | /api/clientes/:id   | Obtener un cliente por ID |
| POST   | /api/clientes       | Crear un nuevo cliente    |
| PUT    | /api/clientes/:id   | Actualizar un cliente     |
| DELETE | /api/clientes/:id   | Eliminar un cliente       |
| GET    | /api/health         | Health check del servidor |

## Modelo de Datos

| Campo             | Tipo     | Requerido | Notas           |
| ----------------- | -------- | --------- | --------------- |
| id                | Integer  | Auto      | Autoincremental |
| nombre_completo   | String   | Sí        |                 |
| email             | String   | Sí        | Único           |
| telefono          | String   | No        |                 |
| empresa           | String   | Sí        |                 |
| createdAt         | DateTime | Auto      |                 |
| updatedAt         | DateTime | Auto      |                 |

## Tecnologías Utilizadas

### Backend
- **Node.js** + **TypeScript**
- **Express** - Framework HTTP
- **Prisma** - ORM
- **SQLite** - Base de datos

### Frontend
- **React** + **TypeScript**
- **Vite** - Bundler y servidor de desarrollo
- **CSS nativo** - Estilos
