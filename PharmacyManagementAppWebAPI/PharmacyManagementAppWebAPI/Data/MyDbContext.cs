using Microsoft.EntityFrameworkCore;
using PharmacyManagementAppWebAPI.Models;
using static System.Net.Mime.MediaTypeNames;

namespace PharmacyManagementAppWebAPI.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }

        public DbSet<admin> adminSet { get; set; }
        public DbSet<medicine> medicineSet { get; set; }
        public DbSet<sale> saleSet { get; set; }
        public DbSet<supplier> supplierSet { get; set; }
    }
}
