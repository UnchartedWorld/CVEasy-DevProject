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
            try
            {
                var template = _themes.GetTheme(themeId);
                if (template == null)
                {
                    throw new KeyNotFoundException("Template not found");
                }

                return Ok(new { code = 200, message = "Template found, returning data: ", data = template });
            }
            catch (KeyNotFoundException e)
            {
                return new OkObjectResult(NotFound(new { code = 404, message = "Template not found." }));
            }
        }

        [HttpGet("GetAllTemplates")]
        public IActionResult GetThemes([FromQuery] GetAllThemesRequest allThemesRequest)
        {
            try
            {
                var dataResult = _themes.GetAllThemes(allThemesRequest);
                return Ok(new { code = 200, message = "Data received for templates.", data = dataResult });
            }
            catch (Exception e)
            {
                return BadRequest(new
                    { code = 400, message = "Something unknown went wrong. See error: " + e.Message });
            }
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

        [Helpers.Authorize]
        [HttpPost("UploadTemplate")]
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