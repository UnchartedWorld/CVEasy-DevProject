using CVEasy_API.DTOs;
using CVEasy_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CVEasy_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThemesController : ControllerBase
    {
        private IThemes _themes;

        public ThemesController(IThemes themes)
        {
            _themes = themes;
        }

        // GET: api/Theme

        // // GET: api/Theme/5
        [HttpGet("{themeId:int}", Name = "GetTemplate")]
        public OkObjectResult GetTheme(int themeId)
        {
            var template = _themes.GetTheme(themeId);
            if (template == null) throw new KeyNotFoundException("Theme not found");
            return Ok(new { code = 200, message = "Theme found, returning data: ", data = template });
        }

        //[HttpPost("GetTemplate")]
        //public IActionResult GetTheme([FromForm] GetThemeRequest themeRequest)
        //{
        //    var result = _themes.GetTheme(themeRequest);
        //    return Ok(new { code = 200, message = "Returning theme: ", data = result });
        //}

        [HttpPost("GetAllThemes")]
        public IActionResult GetThemes([FromForm] GetAllThemesRequest allThemesRequest)
        {
            var dataResult = _themes.GetAllThemes(allThemesRequest);
            return Ok(new { code = 200, message = "Data received for themes.", data = dataResult });
        }

        [HttpPost("Upload Template")]
        public IActionResult Upload([FromForm] UploadRequest texFile)
        {
            _themes.UploadTheme(texFile);

            return Ok("File has been uploaded");
        }

        // PUT: api/Theme/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }


        // DELETE: api/Theme/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}