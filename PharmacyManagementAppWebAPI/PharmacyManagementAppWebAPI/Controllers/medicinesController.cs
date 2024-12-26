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
    public class medicinesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public medicinesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/medicines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<medicine>>> GetmedicineSet()
        {
            return await _context.medicineSet.ToListAsync();
        }

        // GET: api/medicines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<medicine>> Getmedicine(int id)
        {
            var medicine = await _context.medicineSet.FindAsync(id);

            if (medicine == null)
            {
                return NotFound();
            }

            return medicine;
        }

        // PUT: api/medicines/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putmedicine(int id, medicine medicine)
        {
            if (id != medicine.id)
            {
                return BadRequest();
            }

            _context.Entry(medicine).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!medicineExists(id))
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

        // POST: api/medicines
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<medicine>> Postmedicine(medicine medicine)
        {
            _context.medicineSet.Add(medicine);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getmedicine", new { id = medicine.id }, medicine);
        }

        // DELETE: api/medicines/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletemedicine(int id)
        {
            var medicine = await _context.medicineSet.FindAsync(id);
            if (medicine == null)
            {
                return NotFound();
            }

            _context.medicineSet.Remove(medicine);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool medicineExists(int id)
        {
            return _context.medicineSet.Any(e => e.id == id);
        }  


    }
}
