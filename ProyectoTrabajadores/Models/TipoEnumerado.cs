using System;
using System.Collections.Generic;

namespace ProyectoTrabajadores.Models;

public partial class TipoEnumerado
{
    public int IdTipoEnumerado { get; set; }

    public string Descripcion { get; set; } = null!;

    public bool Estado { get; set; }
}
