using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrimbraNtlink5React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        [HttpPost("upload")]
        public async Task<IActionResult> UploadXmlFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            if (Path.GetExtension(file.FileName).ToLower() != ".xml")
                return BadRequest("The file must be an XML file.");

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);

                // Aquí se lee el archivo XML como una cadena de texto
                byte[] fileBytes = memoryStream.ToArray();
                string xmlContent = Encoding.UTF8.GetString(fileBytes);

                ServiceReference1.ServicioTimbradoClient cliente = new ServiceReference1.ServicioTimbradoClient();
                 var result = await cliente.TimbraCfdiSinSelloAsync("URE180429TM6@ntlink.com.mx", "NTPruebas.2021*?", xmlContent);

                return Ok(new { fileContent = result }); // Devuelves el contenido del archivo como respuesta
            }
        }
    }
}
