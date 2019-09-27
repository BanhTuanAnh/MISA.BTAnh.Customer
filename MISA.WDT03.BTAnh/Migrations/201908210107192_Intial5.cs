namespace MISA.WDT03.BTAnh
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Intial5 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
               "dbo.Customers",
               c => new
               {
                   CustomerID = c.Guid(nullable: false, defaultValueSql: "newid()", identity: true),
                   CustomerCode = c.String(nullable: false),
                   Name = c.String(nullable: false),
                   DateOfBirth = c.DateTime(nullable: false, defaultValueSql: "getdate()"),
                   Kind = c.String(nullable: false),
                   PhoneNumber = c.String(),
                   Address = c.String(),
                   Note = c.String(),
                   Email = c.String(),
                   Debt = c.Single(),
                   CompanyName = c.String(),
                   TaxCode = c.String(),
                   Follow = c.Boolean(),
                   Member = c.Boolean(),
                   MemberCode = c.String(),
                   MemberRank = c.String(),
               })
               .PrimaryKey(t => t.CustomerID);
        }
        
        public override void Down()
        {
        }
    }
}
