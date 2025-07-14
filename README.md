# CRUD de Trabajadores - ASP.NET Core MVC

Este proyecto es una aplicación web desarrollada con **ASP.NET Core MVC** y **Entity Framework Core** que permite gestionar registros de trabajadores utilizando procedimientos almacenados (Stored Procedures) en SQL Server. Incluye operaciones de:

- Listado con paginación y filtro dinámico por AJAX
- Registro y edición en modal
- Eliminación lógica
- Carga de ubigeo (departamento, provincia, distrito)
- Validaciones y control de errores

---

## 🧰 Requisitos

- .NET SDK 8.0 o superior
- Visual Studio 2022 o superior
- SQL Server (Local o remoto)
- Base de datos con las siguientes tablas:
  - Trabajadores
  - Departamento
  - Provincia
  - Distrito
  - Enumerado
**Los Scripts de la base de datos se encuentran en la carpeta scripts**
---

## ⚙️ Configuración del proyecto

### 🔗 1. Cadena de conexión

Antes de ejecutar el proyecto, asegúrate de configurar correctamente tu cadena de conexión a la base de datos.

📍 **Ubicación:** `appsettings.json`

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=TU_SERVIDOR;Database=TU_BASEDEDATOS;User Id=USUARIO;Password=CLAVE;Encrypt=False;"
}
