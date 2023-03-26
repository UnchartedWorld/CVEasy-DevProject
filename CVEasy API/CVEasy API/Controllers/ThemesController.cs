using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CVEasy_API.DTOs;
using CVEasy_API.Interfaces;
using Microsoft.AspNetCore.Http;
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
        [HttpGet]
        public IActionResult GetThemes([FromBody] GetAllThemesRequest allThemesRequest)
        {
            var dataResult = _themes.GetAllThemes(allThemesRequest);
            return Ok(new { code = 200, message = "Data received for themes.", data = dataResult });
        }

        // // GET: api/Theme/5
        // [HttpGet("{id}", Name = "Get")]
        // public string Get(int id)
        // {
        //     return "value";
        // }

        // POST: api/Theme
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
