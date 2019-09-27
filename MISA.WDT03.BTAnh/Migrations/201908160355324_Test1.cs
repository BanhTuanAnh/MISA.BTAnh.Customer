namespace MISA.WDT03.BTAnh.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    

    public partial class Test1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Customers", "Test");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Customers", "Test", c => c.String());
        }
    }
}
