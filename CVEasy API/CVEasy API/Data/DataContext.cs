using CVEasy_API.Model;
using Microsoft.EntityFrameworkCore;

namespace CVEasy_API.Data;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder builder)  
    {  
        base.OnModelCreating(builder);  
    }
    
    public override int SaveChanges()  
    {  
        ChangeTracker.DetectChanges();  
        return base.SaveChanges();  
    }  
    
    public DbSet<TableUser> TableUser { get; set; }
    public DbSet<TableUserDetails> TableUserDetails { get; set; }
    public DbSet<TableUserCategory> TableUserCategories { get; set; }
    public DbSet<TableUserRole> TableUserRoles { get; set; }
    public DbSet<TableCategoryDetails> TableCategoryDetails { get; set; }
    public DbSet<TableThemes> TableThemes { get; set; }
    public DbSet<TableComments> TableComments { get; set; }
    public DbSet<TableTags> TableTags { get; set; }

}