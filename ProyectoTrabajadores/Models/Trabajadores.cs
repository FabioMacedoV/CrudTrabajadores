using System;
using System.Collections.Generic;

namespace ProyectoTrabajadores.Models;

public partial class Trabajadores
{
    public int Id { get; set; }

    public int? TipoDocumento { get; set; }

    public string? NumeroDocumento { get; set; }

    public string? Nombres { get; set; }

    public string? Sexo { get; set; }

    public int? IdDepartamento { get; set; }

    public int? IdProvincia { get; set; }

    public int? IdDistrito { get; set; }

    public bool Estado { get; set; }
}
