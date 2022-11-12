using CVEasy_API.Model;
using Microsoft.EntityFrameworkCore;


namespace CVEasy_API.Data;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<TableUser> Users { get; set; }
    public DbSet<TableUserDetails> UserDetails { get; set; }
    public DbSet<TableUserCategory> UserCategories { get; set; }
    public DbSet<TableUserRole> UserRoles { get; set; }
    public DbSet<TableCategoryDetails> CategoryDetails { get; set; }
    public DbSet<TableThemes> Themes { get; set; }
    public DbSet<TableComments> TableComments { get; set; }
    public DbSet<TableTags> Tags { get; set; }

}