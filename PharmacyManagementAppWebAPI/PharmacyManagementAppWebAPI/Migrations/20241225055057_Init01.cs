using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PharmacyManagementAppWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Init01 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "adminSet",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_adminSet", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "medicineSet",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    expiryDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_medicineSet", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "supplierSet",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    contact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_supplierSet", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "saleSet",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    medicineId = table.Column<int>(type: "int", nullable: false),
                    quantitySold = table.Column<int>(type: "int", nullable: false),
                    totalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    saleDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_saleSet", x => x.id);
                    table.ForeignKey(
                        name: "FK_saleSet_medicineSet_medicineId",
                        column: x => x.medicineId,
                        principalTable: "medicineSet",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_saleSet_medicineId",
                table: "saleSet",
                column: "medicineId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "adminSet");

            migrationBuilder.DropTable(
                name: "saleSet");

            migrationBuilder.DropTable(
                name: "supplierSet");

            migrationBuilder.DropTable(
                name: "medicineSet");
        }
    }
}
