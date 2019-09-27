namespace MISA.WDT03.BTAnh
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Intial2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "Debt", c => c.Single(nullable: false));
            AddColumn("dbo.Customers", "Follow", c => c.String());
            AddColumn("dbo.Customers", "Member", c => c.Boolean(nullable: false));
            AddColumn("dbo.Customers", "MemberCode", c => c.String());
            AddColumn("dbo.Customers", "MemberRank", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "MemberRank");
            DropColumn("dbo.Customers", "MemberCode");
            DropColumn("dbo.Customers", "Member");
            DropColumn("dbo.Customers", "Follow");
            DropColumn("dbo.Customers", "Debt");
        }
    }
}
