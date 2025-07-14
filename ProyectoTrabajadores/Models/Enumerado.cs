using System;
using System.Collections.Generic;

namespace ProyectoTrabajadores.Models;

public partial class Enumerado
{
    public int IdEnumerado { get; set; }

    public int IdTipoEnumerado { get; set; }

    public string Descripcion { get; set; } = null!;

    public bool Estado { get; set; }
}
