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

        [HttpGet("{themeId:int}", Name = "GetTemplate")]
        public OkObjectResult GetTheme(int themeId)
        {
            var template = _themes.GetTheme(themeId);
            if (template == null) throw new KeyNotFoundException("Theme not found");
            return Ok(new { code = 200, message = "Theme found, returning data: ", data = template });
        }

        [Helpers.Authorize]
        [HttpPatch("UpdateTemplate")]
        public IActionResult UpdateTemplate([FromForm] ThemeRequest themeRequest)
        {
            try
            {
                _themes.UpdateTheme(themeRequest);

                return Ok(new { code = 200, message = "Template successfully updated" });
            }
            catch (Exception e)
            {
                return BadRequest(new
                    { code = 400, message = "Template failed to update.", exception = e.Message });
            }
        }

        [HttpPost("GetAllTemplates")]
        public IActionResult GetThemes([FromForm] GetAllThemesRequest allThemesRequest)
        {
            var dataResult = _themes.GetAllThemes(allThemesRequest);
            return Ok(new { code = 200, message = "Data received for themes.", data = dataResult });
        }

        [Helpers.Authorize]
        [HttpPost("Upload Template")]
        public IActionResult Upload([FromForm] UploadRequest texFile)
        {
            try
            {
                _themes.UploadTheme(texFile);

                return Ok(new { code = 201, message = "File has been uploaded" });
            }
            catch (Exception e)
            {
                return BadRequest(new
                    { code = 400, message = "Theme not successfully uploaded." });
            }
        }

        // DELETE: api/Theme/5
        [Helpers.Authorize]
        [HttpDelete("{themeId:int}", Name = "RemoveTemplate")]
        public IActionResult Delete(int themeId)
        {
            try
            {
                _themes.RemoveTheme(themeId);
                return Ok(new { code = 200, message = "Template successfully removed." });
            }
            catch (Exception e)
            {
                return BadRequest(new
                    { code = 400, message = "Template either not found or is already deleted" });
            }
        }
    }
}