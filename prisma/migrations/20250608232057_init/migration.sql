-- CreateTable
CREATE TABLE "movie_summary" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "serie_summary" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "content_summary" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL
);
