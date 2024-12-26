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
    public class suppliersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public suppliersController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<supplier>>> GetsupplierSet()
        {
            return await _context.supplierSet.ToListAsync();
        }

        // GET: api/suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<supplier>> Getsupplier(int id)
        {
            var supplier = await _context.supplierSet.FindAsync(id);

            if (supplier == null)
            {
                return NotFound();
            }

            return supplier;
        }

        // PUT: api/suppliers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putsupplier(int id, supplier supplier)
        {
            if (id != supplier.id)
            {
                return BadRequest();
            }

            _context.Entry(supplier).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!supplierExists(id))
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

        // POST: api/suppliers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<supplier>> Postsupplier(supplier supplier)
        {
            _context.supplierSet.Add(supplier);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getsupplier", new { id = supplier.id }, supplier);
        }

        // DELETE: api/suppliers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletesupplier(int id)
        {
            var supplier = await _context.supplierSet.FindAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            _context.supplierSet.Remove(supplier);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool supplierExists(int id)
        {
            return _context.supplierSet.Any(e => e.id == id);
        }
    }
}
