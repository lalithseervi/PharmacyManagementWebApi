using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyManagementAppWebAPI.Data;
using PharmacyManagementAppWebAPI.Models;

namespace PharmacyManagementAppWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class adminsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public adminsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/admins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<admin>>> GetadminSet()
        {
            return await _context.adminSet.ToListAsync();
        }

        // GET: api/admins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<admin>> Getadmin(int id)
        {
            var admin = await _context.adminSet.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return admin;
        }

        // PUT: api/admins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putadmin(int id, admin admin)
        {
            if (id != admin.id)
            {
                return BadRequest();
            }

            _context.Entry(admin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!adminExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/admins
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<admin>> Postadmin(admin admin)
        {
            _context.adminSet.Add(admin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getadmin", new { id = admin.id }, admin);
        }

        // DELETE: api/admins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteadmin(int id)
        {
            var admin = await _context.adminSet.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            _context.adminSet.Remove(admin);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool adminExists(int id)
        {
            return _context.adminSet.Any(e => e.id == id);
        }

        [HttpGet("Verify")]
        public IActionResult Verify([FromQuery] string username, [FromQuery] string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return BadRequest("User ID and Password are required.");
            }

            var isAuthenticated = _context.adminSet.Where(c => c.username == username && c.password == password).FirstOrDefault();
            if (isAuthenticated != null)
            {
                return Ok(new { message = "Login successful", ok = 200 });
            }

            return BadRequest("Invaild UserID or Password.");
        }
    }
}
