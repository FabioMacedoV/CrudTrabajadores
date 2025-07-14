using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoTrabajadores.Data;
using System;

namespace ProyectoTrabajadores.Controllers
{
    [Route("api/ubigeo")]
    [ApiController]
    public class UbigeoApiController : ControllerBase
    {
        private readonly TrabajadoresPruebaContext _context;

        public UbigeoApiController(TrabajadoresPruebaContext context)
        {
            _context = context;
        }

        [HttpGet("departamentos")]
        public async Task<IActionResult> GetDepartamentos()
        {
            var lista = await _context.Departamentos
                .OrderBy(d => d.NombreDepartamento)
                .Select(d => new { d.Id, Nombre = d.NombreDepartamento })
                .ToListAsync();

            return Ok(lista);
        }

        [HttpGet("provincias/{idDepartamento}")]
        public async Task<IActionResult> GetProvincias(int idDepartamento)
        {
            var lista = await _context.Provincia
                .Where(p => p.IdDepartamento == idDepartamento)
                .OrderBy(p => p.NombreProvincia)
                .Select(p => new { p.Id, Nombre = p.NombreProvincia })
                .ToListAsync();

            return Ok(lista);
        }

        [HttpGet("distritos/{idProvincia}")]
        public async Task<IActionResult> GetDistritos(int idProvincia)
        {
            var lista = await _context.Distritos
                .Where(d => d.IdProvincia == idProvincia)
                .OrderBy(d => d.NombreDistrito)
                .Select(d => new { d.Id, Nombre = d.NombreDistrito })
                .ToListAsync();

            return Ok(lista);
        }
    }
}
