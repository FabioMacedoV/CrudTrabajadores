using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoTrabajadores.Data;
using ProyectoTrabajadores.Models;
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

        [HttpGet("obtener/{id}")]
        public async Task<IActionResult> ObtenerPorId(int id)
        {
            var trabajador = await _context.Trabajadores
                .Where(t => t.Id == id && t.Estado == true)
                .Select(t => new
                {
                    t.Id,
                    t.TipoDocumento,
                    t.NumeroDocumento,
                    t.Nombres,
                    t.Sexo,
                    t.IdDepartamento,
                    t.IdProvincia,
                    t.IdDistrito
                })
                .FirstOrDefaultAsync();

            if (trabajador == null)
                return NotFound();

            return Ok(trabajador);
        }

        [HttpPost("guardar")]
        public async Task<IActionResult> Guardar([FromBody] Trabajadores modelo)
        {
            try
            {
                await _context.EjecutarSP_AddUpdTrabajadorAsync(modelo);
                return Ok(new { mensaje = "Guardado correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al guardar", error = ex.Message });
            }
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            try
            {
                await _context.EliminarTrabajadorAsync(id);
                return Ok(new { mensaje = "Trabajador eliminado correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al eliminar", error = ex.Message });
            }
        }
    }
}
