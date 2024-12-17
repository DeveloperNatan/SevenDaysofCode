-- CreateTable
CREATE TABLE "aniversariante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" INTEGER NOT NULL,

    CONSTRAINT "aniversariante_pkey" PRIMARY KEY ("id")
);
