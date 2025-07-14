using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ProyectoTrabajadores.Models;

namespace ProyectoTrabajadores.Data;

public partial class TrabajadoresPruebaContext : DbContext
{
    public TrabajadoresPruebaContext()
    {
    }

    public TrabajadoresPruebaContext(DbContextOptions<TrabajadoresPruebaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Departamento> Departamentos { get; set; }

    public virtual DbSet<Distrito> Distritos { get; set; }

    public virtual DbSet<Enumerado> Enumerados { get; set; }

    public virtual DbSet<Provincia> Provincia { get; set; }

    public virtual DbSet<TipoEnumerado> TipoEnumerados { get; set; }

    public virtual DbSet<Trabajadores> Trabajadores { get; set; }



    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<TrabajadorResponse>().HasNoKey();
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Departamento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Departam__3214EC0700554592");

            entity.ToTable("Departamento");

            entity.Property(e => e.NombreDepartamento)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Distrito>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Distrito__3214EC07792292DB");

            entity.ToTable("Distrito");

            entity.Property(e => e.NombreDistrito)
                .HasMaxLength(500)
                .IsUnicode(false);

            entity.HasOne(d => d.IdProvinciaNavigation).WithMany(p => p.Distritos)
                .HasForeignKey(d => d.IdProvincia)
                .HasConstraintName("FK__Distrito__IdProv__2A4B4B5E");
        });

        modelBuilder.Entity<Enumerado>(entity =>
        {
            entity.HasKey(e => e.IdEnumerado).HasName("PK__Enumerad__F754A21937B1E32D");

            entity.ToTable("Enumerado");

            entity.Property(e => e.IdEnumerado).ValueGeneratedNever();
            entity.Property(e => e.Descripcion)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Provincia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Provinci__3214EC07031CD799");

            entity.Property(e => e.NombreProvincia)
                .HasMaxLength(500)
                .IsUnicode(false);

            entity.HasOne(d => d.IdDepartamentoNavigation).WithMany(p => p.Provincia)
                .HasForeignKey(d => d.IdDepartamento)
                .HasConstraintName("FK__Provincia__IdDep__2B3F6F97");
        });

        modelBuilder.Entity<TipoEnumerado>(entity =>
        {
            entity.HasKey(e => e.IdTipoEnumerado).HasName("PK__TipoEnum__17004F3AFDCBBEF0");

            entity.ToTable("TipoEnumerado");

            entity.Property(e => e.IdTipoEnumerado).ValueGeneratedNever();
            entity.Property(e => e.Descripcion)
                .HasMaxLength(150)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Trabajadores>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Trabajad__3214EC073AB5EBE4");

            entity.Property(e => e.Estado).HasDefaultValue(true);
            entity.Property(e => e.Nombres)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.NumeroDocumento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Sexo)
                .HasMaxLength(1)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    public async Task<List<TrabajadorResponse>> ObtenerTrabajadoresSPAsync(string nombres, string sexo, string numDocumento, int rows, int page)
    {   
        var pNombres = new SqlParameter("@Nombres", nombres ?? "");
        var pSexo = new SqlParameter("@sexo", sexo ?? "");
        var pNumDoc = new SqlParameter("@NumDocumento", numDocumento ?? "");
        var pRows = new SqlParameter("@rows", rows);
        var pPage = new SqlParameter("@page", page);

        return await this.Set<TrabajadorResponse>()
            .FromSqlRaw("EXEC SP_ObtenerTrabajadores @Nombres, @sexo, @NumDocumento, @rows, @page",
                pNombres, pSexo, pNumDoc, pRows, pPage)
            .ToListAsync();
    }

    public async Task EjecutarSP_AddUpdTrabajadorAsync(Trabajadores t)
    {
        await Database.ExecuteSqlRawAsync("EXEC SP_AddUpdTrabajador @p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7",
            t.Id,
            t.TipoDocumento,
            t.NumeroDocumento,
            t.Nombres,
            t.Sexo,
            t.IdDepartamento,
            t.IdProvincia,
            t.IdDistrito
        );
    }

    public async Task EliminarTrabajadorAsync(int id)
    {
        await Database.ExecuteSqlRawAsync("EXEC SP_EliminarTrabajador @p0", id);
    }
}
