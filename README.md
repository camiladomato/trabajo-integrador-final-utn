# ⚙️ Servidor de Roles y Gestión de Tareas - Backend (Node.js + Express + MongoDB)

Este proyecto corresponde al desarrollo de la API REST para el **Trabajo Integrador Final** de la Tecnicatura en Programación (**UTN**). Provee una arquitectura robusta para la autenticación basada en roles, el manejo de sesiones seguras y el control total sobre un modelo de datos relacional implementado en una base de datos NoSQL.

---

## 🚀 Características del Proyecto y Requisitos Cumplidos

* **Arquitectura Estricta MVC:** Organización modular que separa las responsabilidades de configuración, ruteo, control, esquemas y modelos de persistencia.
* **Autenticación y Autorización (RBAC):** Sistema seguro basado en JSON Web Tokens (JWT) con middlewares interceptores que restringen el acceso a los recursos según los roles de usuario (`user` y `admin`).
* **Validación de Datos con Zod:** Sanitización y validación estricta en tiempo de ejecución para todos los payloads de entrada (`body` de los requests), garantizando la integridad de los modelos.
* **Soporte de Query Params:** Endpoints de lectura preparados para procesar parámetros opcionales de filtrado por categoría, ordenamiento y paginación en el clúster.
* **Manejo Centralizado de Errores:** Middleware global encargado de capturar las excepciones operativas y de base de datos para unificar el formato de respuesta HTTP.

---

## 🛠️ Tecnologías Utilizadas

* **Node.js** & **Express.js** (Entorno de ejecución y Framework).
* **MongoDB Atlas** & **Mongoose** (Base de datos NoSQL y ODM).
* **Zod** (Validación de esquemas en endpoints).
* **jsonwebtoken (JWT)** & **bcrypt** (Cifrado y seguridad de sesión).
* **dotenv** (Gestión estricta de variables de entorno).

---

## 📁 Estructura del Proyecto (Patrón MVC)

```text
src/
├── config/
│   └── db.js                 # Conexión persistente a MongoDB Atlas con Mongoose
├── controllers/
│   ├── auth.controller.js    # Lógica de Login, Registro y hash de claves
│   └── task.controller.js    # Operaciones CRUD y filtrados avanzados de tareas
├── middlewares/
│   ├── auth.middleware.js    # Verificación de firmas JWT y validación de roles
│   ├── error.middleware.js   # Manejador global de excepciones y respuestas HTTP
│   └── validate.middleware.js # Validador interceptor de datos de entrada (Schemas)
├── models/
│   ├── Task.js               # Esquema Mongoose de tareas con referencia al autor
│   └── User.js               # Esquema Mongoose de usuarios y asignación de roles
├── routes/
│   ├── auth.routes.js        # Endpoints públicos de identidad (Login/Registro)
│   ├── task.routes.js        # Endpoints protegidos para tareas (CRUD y Admin)
├── schemas/
│   ├── auth.schema.js        # Reglas de validación Zod para registro y login
│   └── task.schema.js        # Reglas de validación Zod para creación/edición de tareas
└── app.js                    # Inicialización de Express, Middlewares globales y puerto

## 💻 Instalación y Configuración LocalInstalar dependencias del servidor:Bashnpm install
Configurar Variables de Entorno:

Cree un archivo .env en la raíz del directorio base (tomando como guía el archivo .env.example provisto) con la siguiente estructura:  Fragmento de códigoPORT=3000
MONGO_URI=mongodb://<USUARIO>:<PASSWORD>@<REPLICAS>/utn_tp?ssl=true&authSource=admin&retryWrites=true&w=majority
JWT_SECRET=una_clave_secreta_super_segura_para_utn_2026

Iniciar en entorno de desarrollo (Nodemon):Bashnpm run dev
La API iniciará su escucha activa en: http://localhost:3000.

## 📑 Documentación de la API y Ejemplos de Requests🔓 Endpoints Públicos (Autenticación)

1. Registrar UsuarioURL: POST /api/auth/register   
Body (JSON - Validado con Zod):   
JSON{
  "name": "Camila Domato",
  "email": "camila@test.com",
  "password": "admin123password",
  "role": "user"
}
Respuesta Exitosa (201): 
Devuelve el objeto creado junto al token de acceso.  2. Iniciar SesiónURL: POST /api/auth/login   Body (JSON):JSON{
  "email": "camila@test.com",
  "password": "admin123password"
}
Respuesta Exitosa (200): Devuelve el JSON Web Token (JWT) indispensable para las rutas privadas.  🔒 Endpoints Privados (Rol: user)Requieren cabecera de autorización: Authorization: Bearer <TOKEN_JWT>3. Listar Tareas del Usuario Autenticado (Soporta Query Params)URL: GET /api/tasks   Parámetros Opcionales de Consulta (Query Params):   Paginación: ?page=1&limit=5   Ordenamiento: ?sort=asc u ?sort=desc   Filtrado por Categoría: ?filter=category:estudio   Ejemplo Completo Integrado: GET /api/tasks?page=1&limit=10&sort=asc&filter=category:utn   4. Crear Nueva TareaURL: POST /api/tasks   Body (JSON - Validado con Zod):   JSON{
  "title": "Entrega TP Integrador Backend",
  "description": "Subir el repositorio y el archivo README completo",
  "category": "utn"
}
5. Actualizar Tarea PropiaURL: PATCH /api/tasks/:id   Body (JSON): Modificaciones parciales permitidas (ej. {"completed": true}).6. Eliminar Tarea PropiaURL: DELETE /api/tasks/:id   👑 Endpoints de Administración (Rol: admin)Requieren cabecera de autorización: Authorization: Bearer <TOKEN_ADMIN_JWT>7. Monitoreo Global de Tareas (Uso de populate)URL: GET /api/tasks/all   Descripción: Lista la totalidad de tareas existentes en el sistema independientemente de su autor, inyectando de forma relacional mediante Mongoose la información extendida del creador (name y email). Soporta parámetros opcionales de ordenamiento y filtrado.  8. Eliminación Administrativa DefinitivaURL: DELETE /api/tasks/:id   Descripción: Permite al administrador purgar cualquier elemento de la base de datos de manera directa.  

## 🧪 Colección de Pruebas (Postman / Thunder Client)En la raíz del proyecto se incluye el archivo JSON correspondiente a la colección oficial de pruebas de integración. Dicha suite contiene estructurados todos los escenarios contemplados (peticiones correctas, fallos de validación Zod, accesos denegados por falta de firma y restricciones de roles) con variables automatizadas para el manejo dinámico del Token.  Archivo de importación: utn_tasks_collection.json

🎓 Institución y Alumna
Universidad Tecnológica Nacional (UTN)
Materia: Trabajo Integrador Final - Programación Backend   
Año: 2026
Alumna: Camila Domato.
***

