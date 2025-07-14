using Microsoft.AspNetCore.Mvc;
using ProyectoTrabajadores.Data;
using System;

namespace ProyectoTrabajadores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrabajadorApiController : ControllerBase
    {
        private readonly TrabajadoresPruebaContext _context;
        private const int FilasPorPagina = 10;

        public TrabajadorApiController(TrabajadoresPruebaContext context)
        {
            _context = context;
        }

        [HttpGet("listar")]
        public async Task<IActionResult> Listar(string? nombre, string? sexo, string? dni, int page = 1)
        {
            var lista = await _context.ObtenerTrabajadoresSPAsync(
                nombres: nombre ?? "",
                sexo: sexo ?? "",
                numDocumento: dni ?? "",
                rows: FilasPorPagina,
                page: page
            );

            long total = lista.FirstOrDefault()?.TotalRows ?? 0;
            long totalPaginas = (long)Math.Ceiling((double)total / FilasPorPagina);

            return Ok(new
            {
                trabajadores = lista,
                paginaActual = page,
                totalPaginas = totalPaginas,
                totalRegistros = total
            });
        }
    }
}
