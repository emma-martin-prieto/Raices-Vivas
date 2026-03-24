-- =========================================================
--  Base de datos: raicesvivas
-- =========================================================

DROP DATABASE IF EXISTS raicesvivas;
CREATE DATABASE raicesvivas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE raicesvivas;

-- =========================================================
--  1) LOCALIDAD
-- =========================================================
CREATE TABLE localidad (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  UNIQUE KEY uk_localidad_nombre (nombre)
) ENGINE=InnoDB;

-- =========================================================
--  2) PERSONA
-- =========================================================
CREATE TABLE persona (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL,
  nombre VARCHAR(60) NOT NULL,
  priApe VARCHAR(80) NOT NULL,
  segApe VARCHAR(80) NULL,
  fecha_nacimiento DATE NOT NULL,
  email VARCHAR(120) NOT NULL,
  rol ENUM('ADMIN','USER') NOT NULL,
  fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_localidad INT UNSIGNED NOT NULL,

  UNIQUE KEY uk_persona_codigo (codigo),
  CONSTRAINT fk_persona_localidad
    FOREIGN KEY (id_localidad) REFERENCES localidad(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =========================================================
--  3) ORGANIZADOR
-- =========================================================
CREATE TABLE organizador (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  tipo ENUM('empresa','asociacion','ayuntamiento','autonomo') NOT NULL
) ENGINE=InnoDB;

-- =========================================================
--  4) ACTIVIDAD (supertipo)
-- =========================================================
CREATE TABLE actividad (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion_general TEXT NOT NULL,
  precio DECIMAL(8,2) NOT NULL,
  duracion INT UNSIGNED NOT NULL,
  estado ENUM('activa','cancelada') NOT NULL DEFAULT 'activa',
  motivo_cancelacion VARCHAR(255) NULL,
  id_organizador INT UNSIGNED NOT NULL,

  CONSTRAINT ck_actividad_precio CHECK (precio >= 0),
  CONSTRAINT ck_actividad_duracion CHECK (duracion >= 0),

  CONSTRAINT fk_actividad_organizador
    FOREIGN KEY (id_organizador) REFERENCES organizador(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =========================================================
--  5) EDICION
-- =========================================================
CREATE TABLE edicion (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  anio SMALLINT UNSIGNED NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,

  UNIQUE KEY uk_edicion_anio (anio),
  CONSTRAINT ck_edicion_fechas CHECK (fecha_fin >= fecha_inicio)
) ENGINE=InnoDB;

-- =========================================================
--  6) SESION
-- =========================================================
CREATE TABLE sesion (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cupo_max TINYINT UNSIGNED NOT NULL,
  fecha_hora_inicio DATETIME NOT NULL,
  fecha_hora_fin DATETIME NOT NULL,
  id_actividad INT UNSIGNED NOT NULL,
  id_edicion INT UNSIGNED NOT NULL,

  CONSTRAINT ck_sesion_cupo CHECK (cupo_max >= 1 AND cupo_max <= 20),
  CONSTRAINT ck_sesion_fechas CHECK (fecha_hora_fin > fecha_hora_inicio),

  CONSTRAINT fk_sesion_actividad
    FOREIGN KEY (id_actividad) REFERENCES actividad(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_sesion_edicion
    FOREIGN KEY (id_edicion) REFERENCES edicion(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =========================================================
--  7) PERSONA_SESION (N:M)
-- =========================================================
CREATE TABLE persona_sesion (
  id_persona INT UNSIGNED NOT NULL,
  id_sesion INT UNSIGNED NOT NULL,

  PRIMARY KEY (id_persona, id_sesion),

  CONSTRAINT fk_persona_sesion_persona
    FOREIGN KEY (id_persona) REFERENCES persona(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_persona_sesion_sesion
    FOREIGN KEY (id_sesion) REFERENCES sesion(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
--  8) Subtipos IS/A (PK = FK a ACTIVIDAD)
-- =========================================================

-- TALLER
CREATE TABLE taller (
  id_actividad INT UNSIGNED PRIMARY KEY,
  nivel ENUM('iniciacion','medio','avanzado') NOT NULL,
  materiales_incluidos VARCHAR(255) NOT NULL,

  CONSTRAINT fk_taller_actividad
    FOREIGN KEY (id_actividad) REFERENCES actividad(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- RUTA
CREATE TABLE ruta (
  id_actividad INT UNSIGNED PRIMARY KEY,
  dificultad ENUM('baja','media','alta') NOT NULL,
  distancia_km DECIMAL(5,2) NOT NULL,
  recomendaciones TEXT NULL,
  punto_inicio VARCHAR(120) NOT NULL,
  punto_fin VARCHAR(120) NOT NULL,

  CONSTRAINT ck_ruta_distancia CHECK (distancia_km > 0),

  CONSTRAINT fk_ruta_actividad
    FOREIGN KEY (id_actividad) REFERENCES actividad(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ALOJAMIENTO
CREATE TABLE alojamiento (
  id_actividad INT UNSIGNED PRIMARY KEY,
  tipo_alojamiento VARCHAR(40) NOT NULL,
  noches TINYINT UNSIGNED NOT NULL,
  regimen ENUM('solo_alojamiento','desayuno','media_pension','pension_completa') NOT NULL,
  condiciones TEXT NULL,

  CONSTRAINT ck_alojamiento_noches CHECK (noches >= 1),

  CONSTRAINT fk_alojamiento_actividad
    FOREIGN KEY (id_actividad) REFERENCES actividad(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- CHARLA
CREATE TABLE charla (
  id_actividad INT UNSIGNED PRIMARY KEY,
  tema VARCHAR(150) NOT NULL,

  CONSTRAINT fk_charla_actividad
    FOREIGN KEY (id_actividad) REFERENCES actividad(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;