-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150),
    "genres" VARCHAR(50),
    "year" VARCHAR(50),

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50),
    "gender" VARCHAR(50),
    "password" VARCHAR(50),
    "role" VARCHAR(50),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
