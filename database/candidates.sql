-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2023 a las 22:00:24
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
-- Estructura de tabla para la tabla `candidates`
--

CREATE TABLE `candidates` (
  `id_candidate` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `region_id` int(10) UNSIGNED NOT NULL,
  `party` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `candidates`
--

INSERT INTO `candidates` (`id_candidate`, `name`, `region_id`, `party`) VALUES
(1, 'Candidato 1', 1, 'Partido A'),
(2, 'Candidato 2', 1, 'Partido B'),
(3, 'Candidato 3', 2, 'Partido C'),
(4, 'Candidato 4', 2, 'Partido A'),
(5, 'Candidato 5', 3, 'Partido B'),
(6, 'Candidato 6', 3, 'Partido C'),
(7, 'Candidato 7', 4, 'Partido A'),
(8, 'Candidato 8', 4, 'Partido B'),
(9, 'Candidato 9', 5, 'Partido C'),
(10, 'Candidato 10', 5, 'Partido A'),
(11, 'Candidato 11', 6, 'Partido B'),
(12, 'Candidato 12', 6, 'Partido C'),
(13, 'Candidato 13', 7, 'Partido A'),
(14, 'Candidato 14', 7, 'Partido B'),
(15, 'Candidato 15', 8, 'Partido C'),
(16, 'Candidato 16', 8, 'Partido A'),
(17, 'Candidato 17', 9, 'Partido B'),
(18, 'Candidato 18', 9, 'Partido C'),
(19, 'Candidato 19', 10, 'Partido A'),
(20, 'Candidato 20', 10, 'Partido B'),
(21, 'Candidato 21', 11, 'Partido C'),
(22, 'Candidato 22', 11, 'Partido A'),
(23, 'Candidato 23', 12, 'Partido B'),
(24, 'Candidato 24', 12, 'Partido C'),
(25, 'Candidato 25', 13, 'Partido A'),
(26, 'Candidato 26', 13, 'Partido B'),
(27, 'Candidato 27', 14, 'Partido C'),
(28, 'Candidato 28', 14, 'Partido A'),
(29, 'Candidato 29', 15, 'Partido B'),
(30, 'Candidato 30', 15, 'Partido C'),
(31, 'Candidato 31', 16, 'Partido A'),
(32, 'Candidato 32', 16, 'Partido B');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`id_candidate`),
  ADD KEY `idx_region` (`region_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `candidates`
--
ALTER TABLE `candidates`
  MODIFY `id_candidate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `candidates_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id_region`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
