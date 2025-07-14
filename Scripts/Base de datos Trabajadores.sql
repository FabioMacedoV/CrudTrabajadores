CREATE DATABASE TrabajadoresPrueba
GO

USE [TrabajadoresPrueba]
GO

/****** Object:  Table [dbo].[TipoEnumerado]    Script Date: 14/07/2025 17:21:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TipoEnumerado](
	[IdTipoEnumerado] [int] NOT NULL,
	[Descripcion] [varchar](150) NOT NULL,
	[Estado] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdTipoEnumerado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del tipo de enumerado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TipoEnumerado', @level2type=N'COLUMN',@level2name=N'IdTipoEnumerado'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del tipo de enumerado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TipoEnumerado', @level2type=N'COLUMN',@level2name=N'Descripcion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Estado del tipo de enumerado, 1: Activo 0: Inactivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TipoEnumerado', @level2type=N'COLUMN',@level2name=N'Estado'
GO

/****** Object:  Table [dbo].[Enumerado]    Script Date: 14/07/2025 17:21:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Enumerado](
	[IdEnumerado] [int] NOT NULL,
	[IdTipoEnumerado] [int] NOT NULL,
	[Descripcion] [varchar](250) NOT NULL,
	[Estado] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEnumerado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del enumerado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Enumerado', @level2type=N'COLUMN',@level2name=N'IdEnumerado'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del tipo de enumerado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Enumerado', @level2type=N'COLUMN',@level2name=N'IdTipoEnumerado'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del enumerado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Enumerado', @level2type=N'COLUMN',@level2name=N'Descripcion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Estado del enumerado, 1: Activo 0: Inactivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Enumerado', @level2type=N'COLUMN',@level2name=N'Estado'
GO

/****** Object:  Table [dbo].[Departamento]    Script Date: 14/07/2025 17:21:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Departamento](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NombreDepartamento] [varchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del departamento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Departamento', @level2type=N'COLUMN',@level2name=N'Id'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del departamento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Departamento', @level2type=N'COLUMN',@level2name=N'NombreDepartamento'
GO

/****** Object:  Table [dbo].[Provincia]    Script Date: 14/07/2025 17:21:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Provincia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdDepartamento] [int] NULL,
	[NombreProvincia] [varchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Provincia]  WITH CHECK ADD FOREIGN KEY([IdDepartamento])
REFERENCES [dbo].[Departamento] ([Id])
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador de la provincia' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Provincia', @level2type=N'COLUMN',@level2name=N'Id'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del departamento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Provincia', @level2type=N'COLUMN',@level2name=N'IdDepartamento'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre de la provincia' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Provincia', @level2type=N'COLUMN',@level2name=N'NombreProvincia'
GO

/****** Object:  Table [dbo].[Distrito]    Script Date: 14/07/2025 17:21:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Distrito](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdProvincia] [int] NULL,
	[NombreDistrito] [varchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del distrito' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Distrito', @level2type=N'COLUMN',@level2name=N'Id'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador de la provincia' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Distrito', @level2type=N'COLUMN',@level2name=N'IdProvincia'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del distrito' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Distrito', @level2type=N'COLUMN',@level2name=N'NombreDistrito'
GO

USE [TrabajadoresPrueba]
GO

/****** Object:  Table [dbo].[Trabajadores]    Script Date: 14/07/2025 17:21:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Trabajadores](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TipoDocumento] [int] NULL,
	[NumeroDocumento] [varchar](50) NULL,
	[Nombres] [varchar](500) NULL,
	[Sexo] [varchar](1) NULL,
	[IdDepartamento] [int] NULL,
	[IdProvincia] [int] NULL,
	[IdDistrito] [int] NULL,
	[Estado] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Trabajadores] ADD  CONSTRAINT [DF_Trabajadores_Estado]  DEFAULT ((1)) FOR [Estado]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del trabajador' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Trabajadores', @level2type=N'COLUMN',@level2name=N'Id'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Enumerado del tipo de documento del trabajador' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Trabajadores', @level2type=N'COLUMN',@level2name=N'TipoDocumento'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Número de documento del trabajador' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Trabajadores', @level2type=N'COLUMN',@level2name=N'NumeroDocumento'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombres y apellidos del trabajador' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Trabajadores', @level2type=N'COLUMN',@level2name=N'Nombres'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Sexo del trabajador, M: Masculino F: Femenino' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Trabajadores', @level2type=N'COLUMN',@level2name=N'Sexo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del departamento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Trabajadores', @level2type=N'COLUMN',@level2name=N'IdDepartamento'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador de la provincia' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Trabajadores', @level2type=N'COLUMN',@level2name=N'IdProvincia'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del distrito' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Trabajadores', @level2type=N'COLUMN',@level2name=N'IdDistrito'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Estado del trabajador, 1: Activo 0: Inactivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Trabajadores', @level2type=N'COLUMN',@level2name=N'Estado'
GO