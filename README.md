# Streaming-Gab

## Requisitos

- Node.js 18 o superior
- PostgreSQL
- Git

---

## Instalación del proyecto

1. **Clona el repositorio:**
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd streaming-gab
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura la base de datos:**
   - Crea una base de datos PostgreSQL (ejemplo: `streaming_gab`).
   - Copia `.env.example` a `.env` y edita la variable `DATABASE_URL`:
     ```
     DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/streaming_gab"
     ```

---

## Migraciones y generación de cliente Prisma

1. **Genera el cliente Prisma:**
   ```sh
   npx prisma generate
   ```

2. **Ejecuta las migraciones para crear las tablas:**
   ```sh
   npx prisma migrate dev --name init
   ```

---

## Creación de vistas SQL

Ejecuta estos comandos en tu cliente SQL para crear las vistas necesarias:

```sql
CREATE OR REPLACE VIEW movie_summary AS
SELECT id, nombre, genero, duracion, fecha FROM "Movie";

CREATE OR REPLACE VIEW serie_summary AS
SELECT id, nombre, genero, duracion, fecha FROM "Serie";

CREATE OR REPLACE VIEW content_summary AS
SELECT id, nombre, tipo, genero, duracion FROM "Content";
```

---

## Sembrar datos (seed)

1. **Ejecuta el seed para poblar la base de datos:**
   ```sh
   npx prisma db seed
   ```
   > Asegúrate de tener en tu `package.json`:
   > ```json
   > "prisma": {
   >   "seed": "ts-node prisma/seed.ts"
   > }
   > ```

---

## Levantar el servidor

```sh
npm run start:dev
```

El servidor estará disponible en [http://localhost:3000](http://localhost:3000)

---

## Comandos útiles

- Instalar dependencias:
  ```sh
  npm install
  ```
- Generar cliente Prisma:
  ```sh
  npx prisma generate
  ```
- Migrar base de datos:
  ```sh
  npx prisma migrate dev --name <nombre>
  ```
- Sembrar datos:
  ```sh
  npx prisma db seed
  ```
- Ver la base de datos con Prisma Studio:
  ```sh
  npx prisma studio
  ```

---

## Notas

- Si cambias el archivo `prisma/schema.prisma`, ejecuta siempre:
  ```sh
  npx prisma generate
  ```
- Si tienes errores de cliente Prisma, elimina `node_modules` y vuelve a instalar:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  npx prisma generate
  ```

---

## Probar endpoints

- Usa Postman o cualquier cliente HTTP.
- Para rutas protegidas, primero haz login en `/auth/login` y usa el token JWT en el header:
  ```
  Authorization: Bearer <token>
  ```
- Consulta los comentarios en los controladores para ejemplos de uso y body en formato JSON.

## Más información

- Consulta los comentarios en los controladores para ejemplos de uso, rutas y formato de los bodies en JSON.
- El sistema es extensible: puedes agregar más roles y permisos según tus necesidades.
- [Ver detalles de autenticación, roles y ejemplos de endpoints en el README de `src`](./src/README.md)