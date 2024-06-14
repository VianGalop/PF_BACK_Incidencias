-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3308
-- Tiempo de generación: 14-06-2024 a las 19:30:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `incidencias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id_estado` int(11) NOT NULL,
  `estado` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id_estado`, `estado`) VALUES
(1, 'Iniciado'),
(2, 'En proceso'),
(3, 'Atendido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id_img` int(11) NOT NULL,
  `imagen` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id_img`, `imagen`) VALUES
(1, 0x66756761312e6a7067),
(2, 0x66756761322e6a7067),
(3, 0x66756761332e6a7067),
(4, 0x313731383232333432333833322d646f732e6a7067),
(5, 0x313731383232333732363239342d646f732e6a7067),
(6, 0x313731383232333733353138382d646f732e6a7067),
(7, 0x313731383232333836373838382d646f732e6a7067),
(8, 0x313731383232333933333334322d646f732e6a7067),
(9, 0x313731383232343033333938362d646f732e6a7067),
(10, 0x313731383232343039363033342d646f732e6a7067),
(11, 0x313731383232343132333434312d646f732e6a7067),
(12, 0x313731383232343333313537302d646f732e6a7067),
(13, 0x313731383232343430393230352d646f732e6a7067),
(14, 0x313731383232343536333333382d6573747564696172636c6f75642870726f6772616d6173656e6c616e756265292e706e67),
(15, 0x313731383232343633353130382d6573747564696172636c6f75642870726f6772616d6173656e6c616e756265292e706e67),
(16, 0x313731383232343633353135352d6573747564696172706172616d6f76696c2e706e67),
(17, 0x313731383232343633353137312d7461626c65766973696f6e2e706e67),
(18, 0x313731383236313534383136392d342e6a7067),
(19, 0x313731383236313534383131382d313336365f323030302e6a7067),
(20, 0x313731383331303639313230352d342e6a7067),
(21, 0x313731383331303639313234302d313336365f323030302e6a7067);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencia`
--

CREATE TABLE `incidencia` (
  `id_inci` int(11) NOT NULL,
  `asunto` varchar(250) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `ubicacion` longtext DEFAULT NULL,
  `comentario` varchar(250) DEFAULT NULL,
  `estado_id` int(11) DEFAULT NULL,
  `fecha` varchar(100) DEFAULT NULL,
  `tipo_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencia`
--

INSERT INTO `incidencia` (`id_inci`, `asunto`, `descripcion`, `ubicacion`, `comentario`, `estado_id`, `fecha`, `tipo_id`, `usuario_id`) VALUES
(1, 'Fuga', 'Fuga de gas en el edificion 2A', '232312323', NULL, 1, '2024/06/11', 1, 3),
(4, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 3, '2024/06/12', 2, 3),
(5, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 1, '2024/06/12', 2, 12),
(6, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 2, '2024/06/12', 2, 3),
(8, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 1, '2024/06/12', 2, 3),
(10, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 1, '2024/06/12', 2, 3),
(12, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 1, '2024/06/12', 2, 3),
(13, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 3, '2024/06/12', 2, 3),
(17, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 3, '2024/06/12', 2, 3),
(21, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 1, '2024/06/12', 2, 3),
(24, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 1, '2024/06/12', 2, 3),
(26, 'Daños', 'Se empeoro la calle', '23545665676', 'hola', 1, '2024/06/12', 2, 3),
(30, 'aaaaaaa', 'dddddddd', '345546587678', '', 1, '2024/06/13', 3, 15),
(31, 'incidencia del 16', 'asdasdasd', '23435435', 'jhjhjhj', 1, '2024/06/13', 6, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias_imagenes`
--

CREATE TABLE `incidencias_imagenes` (
  `id` int(11) NOT NULL,
  `incidencia_id` int(11) DEFAULT NULL,
  `imagen_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencias_imagenes`
--

INSERT INTO `incidencias_imagenes` (`id`, `incidencia_id`, `imagen_id`) VALUES
(1, 26, 13),
(6, 30, 19),
(7, 30, 18),
(8, 31, 20),
(9, 31, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `rol`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoincidencias`
--

CREATE TABLE `tipoincidencias` (
  `id_tipo` int(11) NOT NULL,
  `nombre_tipo_incidencia` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipoincidencias`
--

INSERT INTO `tipoincidencias` (`id_tipo`, `nombre_tipo_incidencia`) VALUES
(1, 'Domestico'),
(2, 'Vial'),
(3, 'Electrico'),
(4, 'Salud'),
(5, 'Inseguridad'),
(6, 'Rural'),
(7, 'Rural'),
(8, 'Edificio'),
(9, 'Edificio'),
(10, 'Edificio'),
(11, 'Edificio'),
(12, 'XXXX'),
(13, 'XXXX'),
(14, 'XXXX'),
(15, 'AAAAA'),
(16, 'Escuela');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellidos` varchar(250) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `rol_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `nombre`, `apellidos`, `telefono`, `correo`, `password`, `rol_type`) VALUES
(1, 'Alberto', 'Juarez Ramirez', 24234234, 'alberto@gmail.com', 'Alber123', 1),
(3, 'Karla', 'Gonzalez Bautista', 456546, 'karla@gmail.com', 'Karla123', 2),
(12, 'Fernando', 'Gonzalez', 342456, 'fernando@gmail.com', 'Fernando123', 2),
(15, 'Jose', 'Garcia', 2147483647, 'jose@gmail.com', '$2b$10$7O9aT2gyVvO8NJsRQIxphOuVS6aW7IrbK4Af7c/QfuHVAfaHjC2mq', 1),
(16, 'Florencia', 'Flores Garcia', 5555555, 'Florencia@gmail.com', '$2b$10$rJxJSiGZlWOvMHt7fSc0bu2xRTHvVBeOWmfD0LFE84naw25dRZnmG', 2),
(17, 'Alejandro', 'Lombardo', 2147483647, 'alejandro@gmail.com', '$2b$10$JRhLBQ3ektOxHPztRoMhbu8eVV8gW.p7HLgQ9VKjYpUVXAP2F4u9C', 2),
(20, 'Abisai', 'Lopez', 2147483647, 'abisai@gmail.com', '$2b$10$JBzPqafeGjpgnYD5413asuJ2m4pKDJJZ2CkEDxSTFWWyLerx4LWP2', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id_img`);

--
-- Indices de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD PRIMARY KEY (`id_inci`),
  ADD KEY `incidencia_ibfk_1` (`estado_id`),
  ADD KEY `incidencia_ibfk_2` (`tipo_id`),
  ADD KEY `incidencia_ibfk_3` (`usuario_id`);

--
-- Indices de la tabla `incidencias_imagenes`
--
ALTER TABLE `incidencias_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `incidencias_imagenes_ibfk_1` (`incidencia_id`),
  ADD KEY `incidencias_imagenes_ibfk_2` (`imagen_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tipoincidencias`
--
ALTER TABLE `tipoincidencias`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `rol_type` (`rol_type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id_img` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  MODIFY `id_inci` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `incidencias_imagenes`
--
ALTER TABLE `incidencias_imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipoincidencias`
--
ALTER TABLE `tipoincidencias`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD CONSTRAINT `incidencia_ibfk_1` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id_estado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `incidencia_ibfk_2` FOREIGN KEY (`tipo_id`) REFERENCES `tipoincidencias` (`id_tipo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `incidencia_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `incidencias_imagenes`
--
ALTER TABLE `incidencias_imagenes`
  ADD CONSTRAINT `incidencias_imagenes_ibfk_1` FOREIGN KEY (`incidencia_id`) REFERENCES `incidencia` (`id_inci`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `incidencias_imagenes_ibfk_2` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id_img`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_type`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
