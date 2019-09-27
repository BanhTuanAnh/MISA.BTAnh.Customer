namespace MISA.WDT03.BTAnh.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Test : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "Test", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "Test");
        }
    }
}
