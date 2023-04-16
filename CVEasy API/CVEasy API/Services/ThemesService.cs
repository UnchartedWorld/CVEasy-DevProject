using CVEasy_API.Data;
using CVEasy_API.DTOs;
using CVEasy_API.Helpers;
using CVEasy_API.Interfaces;
using CVEasy_API.Model;

namespace CVEasy_API.Services
{
    public class ThemeService : IThemes
    {
        private DataContext _context;

        // init context in ThemeService's constructor
        public ThemeService(DataContext context)
        {
            _context = context;
        }

        public void UploadTheme(UploadRequest uploadRequest)
        {
            var upload = FileUpload.SaveTemplate(uploadRequest.File);
            var newUpload = new TableThemes
            {
                createdBy_UserID = uploadRequest.UserID,
                themeName = uploadRequest.ThemeTitle,
                themeDescr = uploadRequest.ThemeDescr,
                themeFile = upload,
                version = uploadRequest.ThemeVersion
            };
            _context.TableThemes.Add(newUpload);
            _context.SaveChanges();
        }

        public GetThemeResponse GetTheme(int themeId)
        {
            var requestedTheme = _context.TableThemes.FirstOrDefault(x =>
                x.themeID == themeId);

            var file = FileUpload.ReadTemplate(requestedTheme.themeFile);

            var response = new GetThemeResponse
            {
                themeID = themeId,
                themeName = requestedTheme.themeName,
                themeDescr = requestedTheme.themeDescr,
                themeFile = file,
                createdByID = requestedTheme.createdBy_UserID,
                deletedDate = requestedTheme.deletedDate,
                version = requestedTheme.version
            };

            return response;
        }

        public GetThemePaging GetAllThemes(GetAllThemesRequest request)
        {
            // first, get list of Themes that haven't been deleted yet
            // using AsQueryable so this query is stuck in limbo under the db until we handle more
            var listThemes = _context.TableThemes.Where(x => x.deletedDate == null).AsQueryable();

            // if string isn't null or "" then we add themeName to the filter
            if (!string.IsNullOrEmpty(request.themeName))
            {
                // using contains so we can find theme names that contain the filter
                // add ToLower to negate case differences
                listThemes = listThemes.Where(x => x.themeName.ToLower().Contains(request.themeName.ToLower()));
            }

            if (request.tagIDs.Any())
            {
                // using contains to get the themes with the ID specified in the search
                // current db structure means 1 theme only has 1 ID
                listThemes = listThemes.Where(x => request.tagIDs.Contains(x.tagID));
            }

            if (!string.IsNullOrEmpty(request.createdByName))
            {
                // similar principle to filter themeName
                // get all of the IDs of the Users with similar loginName
                // notice how we use AsQueryable again to let this stuck in limbo under the db
                var listUserIDs = _context.TableUser
                    .Where(x => x.loginName.ToLower().Contains(request.createdByName.ToLower())).Select(x => x.userID)
                    .AsQueryable();

                // now use those UserIDs to filter in the themes
                listThemes = listThemes.Where(x => listUserIDs.Contains(x.createdBy_UserID));
            }

            // if all of the filters are used, the query should look like this when executed
            /*
                SELECT * FROM TableThemes
                WHERE deletedDate is null
                AND LOWER(themeName) LIKE '%{request.themeName.toLower here}%'
                AND tagID in ({request.tagID in filter here})
                AND createdBy_UserID IN (SELECT userID FROM TableUsers WHERE LOWER(loginName) LIKE '%{request.createdByName.toLower here}%')
             */

            // if none of the filers are used, the query is like this
            /*
                SELECT * FROM TableThemes
                WHERE deletedDate is null
             */

            // but we need to change this to paging as well
            // this is to skip the themes from the previous page (or skip nothing if pageIndex = 0)
            // i.e: each page has 10, we're at page 2 => skip 20
            var allValidThemes = listThemes.Skip(request.pageIndex * request.pageSize)
                // this is to take the amount each page has
                // i,e: each page has 10 => get 10
                .Take(request.pageSize)
                .Select(x => new GetThemeResponse
                {
                    themeID = x.themeID,
                    createdByID = x.createdBy_UserID,
                    themeName = x.themeName,
                    themeDescr = x.themeDescr,
                    themeFile = x.themeFile,
                    deletedDate = x.deletedDate,
                    version = x.version
                }).ToList();

            // finally, we just need to convert the result to the necessary response type
            var response = new GetThemePaging
            {
                // notice how we use listThemes here and not allValidThemes
                // this is because if we count allValidThemes, it will just return the pageSize because we only take that many
                // and we need the total Records for paging, not just the amount we take
                TotalRecords = listThemes.Count(),
                themes = allValidThemes
            };
            return response;
        }
    }
}