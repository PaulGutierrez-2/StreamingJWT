-- Vista para resumen de películas
CREATE OR REPLACE VIEW movie_summary AS
SELECT 
  id,
  nombre,
  genero,
  duracion,
  fecha
FROM "Movie";

-- Vista para resumen de series
CREATE OR REPLACE VIEW serie_summary AS
SELECT 
  id,
  nombre,
  genero,
  duracion,
  fecha
FROM "Serie";

-- Vista para resumen de contenido audiovisual
CREATE OR REPLACE VIEW content_summary AS
SELECT 
  id,
  nombre,
  tipo,
  genero,
  duracion
FROM "Content";

