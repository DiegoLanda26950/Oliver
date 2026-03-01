using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TimelapseAPI.Models;
using TimelapseAPI.Services;

namespace TimelapseAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioCapsulaController : ControllerBase
    {
        private readonly IUsuarioCapsulaService _usuarioCapsulaService;
        private readonly ICapsulaService _capsulaService;

        public UsuarioCapsulaController(
            IUsuarioCapsulaService usuarioCapsulaService,
            ICapsulaService capsulaService)
        {
            _usuarioCapsulaService = usuarioCapsulaService;
            _capsulaService = capsulaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<UsuarioCapsula>>> GetAll()
        {
            var lista = await _usuarioCapsulaService.GetAllAsync();
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioCapsula>> GetById(int id)
        {
            var item = await _usuarioCapsulaService.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // GET api/UsuarioCapsula/usuario/5/capsulas
        // Devuelve solo las cápsulas del usuario con idUsuario = 5
        [HttpGet("usuario/{idUsuario}/capsulas")]
        public async Task<ActionResult<List<Capsula>>> GetCapsulasByUsuario(int idUsuario)
        {
            try
            {
                var capsulas = await _usuarioCapsulaService.GetCapsulasByUsuarioIdAsync(idUsuario);
                return Ok(capsulas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = ex.Message });
            }
        }

        // POST api/UsuarioCapsula/capsulas/crear
        // Crea la cápsula Y el registro UsuarioCapsula en un solo paso
        [HttpPost("capsulas/crear")]
        public async Task<ActionResult<Capsula>> CrearCapsulaParaUsuario([FromBody] CrearCapsulaConUsuarioDTO dto)
        {
            try
            {
                // 1. Crear la cápsula
                var capsula = new Capsula
                {
                    Titulo = dto.Titulo,
                    Descripcion = dto.Descripcion,
                    FechaCreacion = dto.FechaCreacion,
                    FechaApertura = dto.FechaApertura,
                    Estado = dto.Estado,
                    Visibilidad = dto.Visibilidad
                };
                await _capsulaService.AddAsync(capsula);

                // 2. Vincular la cápsula al usuario en UsuarioCapsula
                var usuarioCapsula = new UsuarioCapsula
                {
                    IdUsuario = dto.IdUsuario,
                    IdCapsula = capsula.IdCapsula,
                    Rol = "propietario"
                };
                await _usuarioCapsulaService.CreateAsync(usuarioCapsula);

                return Ok(capsula);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<UsuarioCapsula>> Create([FromBody] UsuarioCapsula usuarioCapsula)
        {
            try
            {
                var nuevo = await _usuarioCapsulaService.CreateAsync(usuarioCapsula);
                return CreatedAtAction(nameof(GetById), new { id = nuevo.IdUsuarioCapsula }, nuevo);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UsuarioCapsula>> Update(int id, [FromBody] UsuarioCapsula usuarioCapsula)
        {
            if (id != usuarioCapsula.IdUsuarioCapsula)
                return BadRequest(new { mensaje = "El ID no coincide con el cuerpo de la solicitud." });

            try
            {
                var updated = await _usuarioCapsulaService.UpdateAsync(usuarioCapsula);
                if (updated == null) return NotFound();
                return Ok(updated);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _usuarioCapsulaService.DeleteAsync(id);
            if (!result) return NotFound(new { mensaje = "No se encontró el registro con ese ID." });
            return NoContent();
        }
    }

    public class CrearCapsulaConUsuarioDTO
    {
        public int IdUsuario { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaApertura { get; set; }
        public string Estado { get; set; } = string.Empty;
        public string Visibilidad { get; set; } = string.Empty;
    }
}