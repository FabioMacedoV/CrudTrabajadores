using Microsoft.AspNetCore.Mvc;
using ProyectoTrabajadores.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using ProyectoTrabajadores.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace ProyectoTrabajadores.Controllers
{
    public class HomeController : Controller
    {
        private readonly TrabajadoresPruebaContext _DbContext;
        private const int FilasPorPagina = 10;

        public HomeController(TrabajadoresPruebaContext context)
        {
            _DbContext = context;
        }

        public async Task<IActionResult> Index(string nombre, string sexo, string dni, int page = 1)
        {
            var (lista, totalPaginas) = await ObtenerTrabajadoresFiltrados(nombre, sexo, dni, page);

            ViewBag.FiltroNombre = nombre;
            ViewBag.FiltroSexo = sexo;
            ViewBag.filtroDoc = dni;
            ViewBag.TotalPaginas = totalPaginas;
            ViewBag.PaginaActual = page;

            return View(lista);
        }

        private async Task<(List<TrabajadorResponse> lista, long totalPaginas)> ObtenerTrabajadoresFiltrados(string nombre, string sexo, string dni, int page)
        {
            var lista = await _DbContext.ObtenerTrabajadoresSPAsync(
                nombres: nombre ?? "",
                sexo: sexo ?? "",
                numDocumento: dni ?? "",
                rows: FilasPorPagina,
                page: page
            );

            long total = lista.FirstOrDefault()?.TotalRows ?? 0;
            long totalPaginas = (long)Math.Ceiling((double)total / FilasPorPagina);

            return (lista, totalPaginas);
        }

    }
}
