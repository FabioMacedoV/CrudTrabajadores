using System;
using System.Collections.Generic;

namespace ProyectoTrabajadores.Models;

public partial class Distrito
{
    public int Id { get; set; }

    public int? IdProvincia { get; set; }

    public string? NombreDistrito { get; set; }

    public virtual Provincia? IdProvinciaNavigation { get; set; }
}
