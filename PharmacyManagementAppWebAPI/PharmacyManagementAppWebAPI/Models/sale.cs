namespace PharmacyManagementAppWebAPI.Models
{
    public class sale
    {
        public int id { get; set; }
        public int medicineId { get; set; }
        public int quantitySold { get; set; }
        public decimal totalPrice { get; set; }
        public DateTime saleDate { get; set; }
        public string customerName { get; set; }

        //public medicine medicine { get; set; }
    }
}
