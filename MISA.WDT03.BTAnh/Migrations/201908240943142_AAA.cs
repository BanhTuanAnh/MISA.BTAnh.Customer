namespace MISA.WDT03.BTAnh
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AAA : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Customers", "Follow", c => c.Boolean(nullable: true,defaultValue:true));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Customers", "Follow", c => c.String());
        }
    }
}
