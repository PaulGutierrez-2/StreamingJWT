# Autenticación y Autorización (Auth) en Streaming-Gab

Este proyecto implementa autenticación y autorización basada en JWT y roles usando NestJS y Prisma.

---

## ¿Cómo funciona el sistema de autenticación y autorización?

1. **Login y generación de JWT**
   - El usuario envía su `username` y `password` a `/auth/login`.
   - El sistema valida el usuario y la contraseña (hasheada con bcrypt).
   - Si es correcto, se genera un JWT que incluye el `id`, `username` y un array de `roles` (por ejemplo: `["admin"]`).

2. **Protección de rutas**
   - Se usan guards (`JwtAuthGuard` y `RolesGuard`) para proteger rutas.
   - El `JwtAuthGuard` verifica que el usuario tenga un JWT válido.
   - El `RolesGuard` verifica que el usuario tenga el rol necesario para acceder a la ruta (por ejemplo, solo `admin` puede crear o borrar recursos).

3. **Uso de roles**
   - Los roles se incluyen en el JWT al momento del login.
   - El guard compara los roles requeridos en la ruta con los roles del usuario extraídos del JWT.

---

## Archivos principales involucrados

- **auth.service.ts**  
  Lógica de validación de usuario, comparación de contraseñas y generación del JWT con los roles del usuario.

- **auth.controller.ts**  
  Controlador para el endpoint `/auth/login`.

- **jwt.strategy.ts**  
  Estrategia Passport para extraer y validar el JWT de las peticiones.

- **jwt-auth.guard.ts**  
  Guard que protege rutas y exige un JWT válido.

- **roles.guard.ts**  
  Guard que protege rutas según los roles requeridos (por ejemplo, solo admin).

---

## ¿Cómo se usa?

1. Haz login en `/auth/login` con usuario y contraseña válidos.
2. Usa el token JWT recibido en el header `Authorization: Bearer <token>` para acceder a rutas protegidas.
3. Las rutas protegidas con roles solo permiten acceso a usuarios con el rol adecuado (por ejemplo, `admin`).

---

## Endpoints principales

### Autenticación

- **POST `/auth/login`**  
  Inicia sesión y devuelve un JWT.  
  **Body:**  
  ```json
  {
    "username": "usuario",
    "password": "contraseña"
  }
  ```

---

### Usuarios (`/user`)

- **POST `/user`** (solo admin) — Crear usuario
- **GET `/user`** (solo admin) — Listar usuarios (paginación y búsqueda)
- **GET `/user/:id`** (solo admin) — Obtener usuario por ID
- **PATCH `/user/:id`** (solo admin) — Actualizar usuario
- **DELETE `/user/:id`** (solo admin) — Eliminar usuario

---

### Contenido (`/content`)

- **POST `/content`** (solo admin) — Crear contenido
- **GET `/content`** — Listar contenido (paginación y búsqueda)
- **GET `/content/:id`** — Obtener contenido por ID
- **PATCH `/content/:id`** (solo admin) — Actualizar contenido
- **DELETE `/content/:id`** (solo admin) — Eliminar contenido

---

### Películas (`/movie`)

- **POST `/movie`** (solo admin) — Crear película
- **GET `/movie`** — Listar películas (paginación y búsqueda)
- **GET `/movie/:id`** — Obtener película por ID
- **PATCH `/movie/:id`** (solo admin) — Actualizar película
- **DELETE `/movie/:id`** (solo admin) — Eliminar película

---

### Series (`/serie`)

- **POST `/serie`** (solo admin) — Crear serie
- **GET `/serie`** — Listar series (paginación y búsqueda)
- **GET `/serie/:id`** — Obtener serie por ID
- **PATCH `/serie/:id`** (solo admin) — Actualizar serie
- **DELETE `/serie/:id`** (solo admin) — Eliminar serie

---

### Roles (`/role`)

- **POST `/role`** (solo admin) — Crear rol
- **GET `/role`** (solo admin) — Listar roles (paginación y búsqueda)
- **PATCH `/role/:id`** (solo admin) — Actualizar rol
- **DELETE `/role/:id`** (solo admin) — Eliminar rol

---

### Permisos (`/permission`)

- **POST `/permission`** (solo admin) — Crear permiso
- **GET `/permission`** (solo admin) — Listar permisos (paginación y búsqueda)
- **PATCH `/permission/:id`** (solo admin) — Actualizar permiso
- **DELETE `/permission/:id`** (solo admin) — Eliminar permiso

## Paginación y operaciones lógicas

Todos los endpoints de listado (`findAll`) implementan paginación y búsqueda lógica.

- **Paginación:**  
  Usa los parámetros de query `skip` y `take` para controlar el desplazamiento y la cantidad de resultados:
  ```
  GET /recurso?skip=0&take=10
  ```
  - `skip`: cuántos registros saltar (por defecto 0)
  - `take`: cuántos registros traer (por defecto 10)

- **Búsqueda lógica:**  
  Usa el parámetro `search` para filtrar por nombre (insensible a mayúsculas/minúsculas):
  ```
  GET /recurso?search=palabra
  ```

---

## Vistas SQL

`findAllSummary`

El método `findAllSummary` en los servicios (serie, movie,content) ejecuta una consulta SQL directa sobre la vista `movie_summary`, `serie_summary`,`content_summary` en la base de datos utilizando Prisma.  
Esta vista SQL debe ser creada manualmente y contiene un resumen de los datos de las películas (por ejemplo: id, nombre, género, duración y fecha).

- **¿Para qué sirve?**  
  Permite obtener información resumida de todas las películas de forma eficiente, sin exponer todos los campos de la tabla principal ni realizar joins complejos.

- **¿Cómo funciona?**  
  Utiliza `prisma.$queryRaw` para ejecutar la consulta `SELECT * FROM movie_summary` y retorna el resultado como un arreglo de objetos con los campos definidos en la vista.

**Recuerda:**  
Debes crear la vista `movie_summary` en tu base de datos con una sentencia como:
```sql
CREATE OR REPLACE VIEW movie_summary AS
SELECT id, nombre, genero, duracion, fecha FROM "Movie";