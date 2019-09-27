namespace MISA.WDT03.BTAnh
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using MISA.Entities;
    internal sealed class Configuration : DbMigrationsConfiguration<MISA.Entities.MISAWDT03BTAnhContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(MISA.Entities.MISAWDT03BTAnhContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
        }
    }
}
