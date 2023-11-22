-- Creamos la base de datos
CREATE DATABASE IF NOT EXISTS votos_db;

-- Usamos la base de datos
USE votos_db;

-- Creamos la tabla para los votos
CREATE TABLE IF NOT EXISTS votos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_apellido VARCHAR(255),
    alias VARCHAR(50),
    rut VARCHAR(15) UNIQUE, -- Con el valor UNIQUE evitamos valores duplicados
    email VARCHAR(100),
    region VARCHAR(50),
    comuna VARCHAR(50),
    candidato VARCHAR(50),
    referencia TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
