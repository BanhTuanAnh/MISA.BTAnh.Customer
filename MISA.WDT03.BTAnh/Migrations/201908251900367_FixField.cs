namespace MISA.WDT03.BTAnh
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FixField : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "Unfollow", c => c.Boolean(nullable: false,defaultValue:false));
            DropColumn("dbo.Customers", "Follow");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Customers", "Follow", c => c.Boolean(nullable: false));
            DropColumn("dbo.Customers", "Unfollow");
        }
    }
}
