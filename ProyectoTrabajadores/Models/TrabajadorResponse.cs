namespace ProyectoTrabajadores.Models
{
    public class TrabajadorResponse
    {
        public long Fila { get; set; }
        public int Id { get; set; }
        public string TipoDocumento { get; set; }
        public string NroDocumento { get; set; }
        public string Nombres { get; set; }
        public string Sexo { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public long TotalRows { get; set; }
    }
}
