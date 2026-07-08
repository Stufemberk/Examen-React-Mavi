# React + TypeScript + Vite

Este proyecto fue creado utilizando **React**, **TypeScript** y **Vite**, proporcionando una configuración ligera y moderna para el desarrollo de aplicaciones web.

La plantilla incluye **Hot Module Replacement (HMR)** para actualizar automáticamente la aplicación durante el desarrollo y **Oxlint** para el análisis estático del código y la detección de posibles errores.

---

## Plugins incluidos

Actualmente se incluyen dos plugins oficiales para React:

- **@vitejs/plugin-react**: Utiliza **Oxc** como compilador para ofrecer un desarrollo rápido y eficiente.

- **@vitejs/plugin-react-swc**: Utiliza **SWC**, un compilador de alto rendimiento desarrollado en Rust, que mejora la velocidad de compilación.

---

## React Compiler

Esta plantilla **no habilita React Compiler por defecto**, ya que puede afectar el rendimiento durante el desarrollo y el proceso de compilación.

Si deseas activarlo, puedes consultar la documentación oficial de React:

https://react.dev/learn/react-compiler/installation

---

## Configuración avanzada de Oxlint

Para aplicaciones destinadas a producción, se recomienda habilitar el análisis basado en tipos de TypeScript instalando el paquete:

```bash
npm install -D oxlint-tsgolint
```

Posteriormente, modifica el archivo `.oxlintrc.json` con la siguiente configuración:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": [
      "warn",
      {
        "allowConstantExport": true
      }
    ]
  }
}
```

Estas reglas permiten detectar errores relacionados con:

- Uso incorrecto de Hooks de React.
- Exportación de componentes.
- Validaciones basadas en los tipos de TypeScript.
- Buenas prácticas de desarrollo.

---

## Documentación

Para consultar todas las reglas disponibles de Oxlint puedes visitar la documentación oficial:

https://oxc.rs/docs/guide/usage/linter/rules