using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TimelapseAPI.Models;
using TimelapseAPI.Repositories;

namespace TimelapseAPI.Services
{
    public class UsuarioCapsulaService : IUsuarioCapsulaService
    {
        private readonly IUsuarioCapsulaRepository _usuarioCapsulaRepository;
        private readonly ICapsulaRepository _capsulaRepository;

        public UsuarioCapsulaService(
            IUsuarioCapsulaRepository usuarioCapsulaRepository,
            ICapsulaRepository capsulaRepository)
        {
            _usuarioCapsulaRepository = usuarioCapsulaRepository;
            _capsulaRepository = capsulaRepository;
        }

        public async Task<List<UsuarioCapsula>> GetAllAsync()
        {
            return await _usuarioCapsulaRepository.GetAllAsync();
        }

        public async Task<UsuarioCapsula?> GetByIdAsync(int id)
        {
            return await _usuarioCapsulaRepository.GetByIdAsync(id);
        }

        public async Task<UsuarioCapsula> CreateAsync(UsuarioCapsula usuarioCapsula)
        {
            if (usuarioCapsula.IdUsuario <= 0)
                throw new ArgumentException("El IdUsuario debe ser válido.");

            if (usuarioCapsula.IdCapsula <= 0)
                throw new ArgumentException("El IdCapsula debe ser válido.");

            if (string.IsNullOrWhiteSpace(usuarioCapsula.Rol))
                usuarioCapsula.Rol = "miembro";

            return await _usuarioCapsulaRepository.CreateAsync(usuarioCapsula);
        }

        public async Task<UsuarioCapsula?> UpdateAsync(UsuarioCapsula usuarioCapsula)
        {
            if (usuarioCapsula.IdUsuario <= 0)
                throw new ArgumentException("El IdUsuario debe ser válido.");

            if (usuarioCapsula.IdCapsula <= 0)
                throw new ArgumentException("El IdCapsula debe ser válido.");

            if (string.IsNullOrWhiteSpace(usuarioCapsula.Rol))
                usuarioCapsula.Rol = "miembro";

            return await _usuarioCapsulaRepository.UpdateAsync(usuarioCapsula);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _usuarioCapsulaRepository.DeleteAsync(id);
        }

        // Nuevo: obtiene todas las cápsulas que pertenecen a un usuario
        public async Task<List<Capsula>> GetCapsulasByUsuarioIdAsync(int idUsuario)
        {
            // Cogemos todos los registros de UsuarioCapsula de este usuario
            var registros = await _usuarioCapsulaRepository.GetAllAsync();
            var idsCapsula = registros
                .Where(uc => uc.IdUsuario == idUsuario)
                .Select(uc => uc.IdCapsula)
                .ToList();

            // Obtenemos cada cápsula por su ID
            var capsulas = new List<Capsula>();
            foreach (var idCapsula in idsCapsula)
            {
                var capsula = await _capsulaRepository.GetByIdAsync(idCapsula);
                if (capsula != null)
                    capsulas.Add(capsula);
            }

            return capsulas;
        }
    }
}