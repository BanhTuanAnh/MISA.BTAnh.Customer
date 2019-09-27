namespace MISA.WDT03.BTAnh
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class Intial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                {
                    CustomerID = c.Guid(nullable: false, defaultValueSql: "newid()", identity: true),
                    CustomerCode = c.String(),
                    Name = c.String(),
                    DateOfBirth = c.DateTime(nullable: false, defaultValueSql: "getdate()"),
                    Kind = c.String(),
                    PhoneNumber = c.String(),
                    Address = c.String(),
                    Note = c.String(),
                    Email = c.String(),
                    CompanyName = c.String(),
                    TaxCode = c.String(),
                })
                .PrimaryKey(t => t.CustomerID);

        }

        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}
