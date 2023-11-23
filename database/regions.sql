-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2023 a las 22:01:09
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `votos_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regions`
--

CREATE TABLE `regions` (
  `id_region` int(10) UNSIGNED NOT NULL,
  `id_country` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `regions`
--

INSERT INTO `regions` (`id_region`, `id_country`, `name`) VALUES
(1, 1, 'Región de Arica y Parinacota'),
(2, 1, 'Región de Tarapacá'),
(3, 1, 'Región de Antofagasta'),
(4, 1, 'Región de Atacama'),
(5, 1, 'Región de Coquimbo'),
(6, 1, 'Región de Valparaíso'),
(7, 1, 'Región Metropolitana de Santiago'),
(8, 1, 'Región del Libertador General Bernardo O\'Higgins'),
(9, 1, 'Región del Maule'),
(10, 1, 'Región de Ñuble'),
(11, 1, 'Región del Biobío'),
(12, 1, 'Región de La Araucanía'),
(13, 1, 'Región de Los Ríos'),
(14, 1, 'Región de Los Lagos'),
(15, 1, 'Región Aysén del General Carlos Ibáñez del Campo'),
(16, 1, 'Región de Magallanes y de la Antártica Chilena');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id_region`),
  ADD KEY `FK_regions_countries` (`id_country`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `regions`
--
ALTER TABLE `regions`
  MODIFY `id_region` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `regions`
--
ALTER TABLE `regions`
  ADD CONSTRAINT `FK_regions_countries` FOREIGN KEY (`id_country`) REFERENCES `countries` (`id_country`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
