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
    public class salesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public salesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<sale>>> GetsaleSet()
        {
            return await _context.saleSet.ToListAsync();
        }

        // GET: api/sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<sale>> Getsale(int id)
        {
            var sale = await _context.saleSet.FindAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }

        // PUT: api/sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putsale(int id, sale sale)
        {
            if (id != sale.id)
            {
                return BadRequest();
            }

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!saleExists(id))
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

        // POST: api/sales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<sale>> Postsale(sale sale)
        //{
        //    _context.saleSet.Add(sale);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("Getsale", new { id = sale.id }, sale);
        //}

        // DELETE: api/sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletesale(int id)
        {
            var sale = await _context.saleSet.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            _context.saleSet.Remove(sale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool saleExists(int id)
        {
            return _context.saleSet.Any(e => e.id == id);
        }

        [HttpPost]
        public async Task<ActionResult<sale>> Postsale(sale sale)
        {
            // Save the sale
            _context.saleSet.Add(sale);
            await _context.SaveChangesAsync();

            // Update the inventory (medicine quantity)
            var updateInventoryRequest = new UpdateInventoryRequest
            {
                QuantitySold = sale.quantitySold
            };

            // Call the MedicinesController's method to update the inventory
            var result = await UpdateMedicineInventory(sale.medicineId, updateInventoryRequest);

            if (result is OkObjectResult)
            {
                return Ok(new { message = "Sale posted and inventory updated successfully." });
            }

            return BadRequest("Error updating inventory.");
        }

        // Helper method to call MedicinesController's UpdateInventory method
        private async Task<IActionResult> UpdateMedicineInventory(int medicineId, UpdateInventoryRequest request)
        {
            var medicine = await _context.medicineSet.FindAsync(medicineId);
            if (medicine == null)
            {
                return NotFound("Medicine not found.");
            }

            if (medicine.quantity < request.QuantitySold)
            {
                return BadRequest("Not enough stock available.");
            }

            // Reduce quantity in the inventory
            medicine.quantity -= request.QuantitySold;
            _context.Entry(medicine).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Inventory updated successfully." });
        }

    }
}
