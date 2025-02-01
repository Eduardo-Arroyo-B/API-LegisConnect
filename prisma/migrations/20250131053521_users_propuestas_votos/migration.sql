-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Ciudadano', 'Legislador', 'Administrador');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BORRADOR', 'PUBLICADO', 'ARCHIVADO');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Ciudadano',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propuestas" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "Status" "Status" NOT NULL DEFAULT 'BORRADOR',
    "autorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Propuestas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votos" (
    "id" SERIAL NOT NULL,
    "propuestaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,

    CONSTRAINT "Votos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Propuestas" ADD CONSTRAINT "Propuestas_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
