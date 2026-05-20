using System;

namespace TimelapseAPI.Models
{
    public class Comentario
    {
        public int IdComentario { get; set; }
        public string Texto { get; set; } = string.Empty;
        public DateTime FechaComentario { get; set; }

        //Añadimos el iduser para que este relacionado con un usuario
        public int IdUsuario { get; set; } 
    }
}

