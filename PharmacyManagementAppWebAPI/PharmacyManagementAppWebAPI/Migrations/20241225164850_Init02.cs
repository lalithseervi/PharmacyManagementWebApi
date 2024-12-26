using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PharmacyManagementAppWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Init02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "customerName",
                table: "saleSet",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "customerName",
                table: "saleSet");
        }
    }
}
