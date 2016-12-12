namespace MyApp.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initialize : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Thing",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Widget",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        ThingId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Thing", t => t.ThingId)
                .Index(t => t.ThingId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Widget", "ThingId", "dbo.Thing");
            DropIndex("dbo.Widget", new[] { "ThingId" });
            DropTable("dbo.Widget");
            DropTable("dbo.Thing");
        }
    }
}
