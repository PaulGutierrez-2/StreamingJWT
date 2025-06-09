import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crear roles
  const adminRole = await prisma.role.create({
    data: { name: 'admin' },
  });
  const userRole = await prisma.role.create({
    data: { name: 'user' },
  });

  // Hashear contraseñas
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // Crear usuarios
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin@example.com',
      password: adminPassword,
      userRoles: {
        create: { roleId: adminRole.id },
      },
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      username: 'user@example.com',
      password: userPassword,
      userRoles: {
        create: { roleId: userRole.id },
      },
    },
  });

  // Insertar películas
  await prisma.movie.createMany({
    data: [
      {
        nombre: 'Avengers: Endgame',
        tipo: 'movie',
        genero: 'Acción',
        duracion: 181,
        fecha: new Date('2019-04-26'),
        actores: 'Robert Downey Jr., Chris Evans',
        productora: 'Marvel Studios',
      },
      {
        nombre: 'Inception',
        tipo: 'movie',
        genero: 'Ciencia Ficción',
        duracion: 148,
        fecha: new Date('2010-07-16'),
        actores: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
        productora: 'Warner Bros.',
      },
      {
        nombre: 'Interstellar',
        tipo: 'movie',
        genero: 'Ciencia Ficción',
        duracion: 169,
        fecha: new Date('2014-11-07'),
        actores: 'Matthew McConaughey, Anne Hathaway',
        productora: 'Paramount Pictures',
      },
    ],
  });

  // Insertar series
  await prisma.serie.createMany({
    data: [
      {
        nombre: 'Stranger Things',
        tipo: 'serie',
        genero: 'Ciencia Ficción',
        duracion: 50,
        fecha: new Date('2016-07-15'),
        actores: 'Millie Bobby Brown, Finn Wolfhard',
        productora: 'Netflix',
      },
      {
        nombre: 'Breaking Bad',
        tipo: 'serie',
        genero: 'Drama',
        duracion: 47,
        fecha: new Date('2008-01-20'),
        actores: 'Bryan Cranston, Aaron Paul',
        productora: 'AMC',
      },
      {
        nombre: 'The Mandalorian',
        tipo: 'serie',
        genero: 'Acción',
        duracion: 40,
        fecha: new Date('2019-11-12'),
        actores: 'Pedro Pascal, Gina Carano',
        productora: 'Lucasfilm',
      },
    ],
  });

  // Insertar contenido general
  await prisma.content.createMany({
    data: [
      {
        nombre: 'Documental Planeta Tierra',
        tipo: 'documental',
        genero: 'Naturaleza',
        duracion: 60,
        fecha: new Date('2006-03-05'),
        actores: 'David Attenborough',
        productora: 'BBC',
      },
      {
        nombre: 'TED Talk: Cómo aprender',
        tipo: 'charla',
        genero: 'Educativo',
        duracion: 18,
        fecha: new Date('2015-09-10'),
        actores: 'Barbara Oakley',
        productora: 'TED',
      },
      {
        nombre: 'Concierto Coldplay',
        tipo: 'concierto',
        genero: 'Música',
        duracion: 120,
        fecha: new Date('2022-05-01'),
        actores: 'Coldplay',
        productora: 'Live Nation',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });