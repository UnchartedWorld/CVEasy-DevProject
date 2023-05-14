import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle, Logout, ManageAccounts } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
} from "@mui/material";

const pages = ["Home", "Templates", "About"];
const settings = [
  {
    label: "Account",
    href: "/Account",
    icon: <ManageAccounts />,
  },
  {
    label: "Logout",
    href: "/",
    icon: <Logout />,
  },
];

function NavbarComponent() {
  const [auth, setAuth] = React.useState(false);
  const [confirmLogout, setConfirmLogout] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigateTo = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const userID = Cookies.get("userID");
    if (
      (token === "" || token === null || token === undefined) &&
      (userID === "" || userID === null || userID === undefined)
    ) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  function handleLogoutItem() {
    Cookies.remove("token");
    Cookies.remove("userID");

    setConfirmLogout(false);

    navigateTo("/Home");
    window.location.reload();
  }

  function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  return (
    <header>
      <nav>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                {/* This is the default, desktop view  */}
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "sans-serif",
                    fontWeight: 700,
                    flexGrow: 1,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  CVEasy
                </Typography>

                <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/${page}`}
                          >
                            {page}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                {/* This is the mobile typography */}
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "sans-serif",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  CVEasy
                </Typography>
                {!auth && (
                  <Button
                    key={"Login"}
                    sx={{
                      my: 2,
                      color: "inherit",
                      display: "block",
                      border: "1px solid",
                    }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/Login`}
                    >
                      Login
                    </Link>
                  </Button>
                )}
                {auth && (
                  <Button
                    key={"Upload"}
                    sx={{
                      my: 2,
                      color: "inherit",
                      display: "block",
                      border: "2px solid",
                    }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/Upload`}
                    >
                      Upload
                    </Link>
                  </Button>
                )}
                {/* Curiously, this is the desktop view's app bar. Dunno why. */}
                <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "inherit", display: "block" }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/${page}`}
                      >
                        {page}
                      </Link>
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  {auth && (
                    <Tooltip title="Open settings">
                      <IconButton
                        color="inherit"
                        onClick={handleOpenUserMenu}
                        sx={{ p: 0, marginLeft: 2, marginBottom: 0.3 }}
                      >
                        <AccountCircle />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => {
                      if (setting.label === "Account") {
                        return (
                          <MenuItem key={setting.label}>
                            <Link
                              to={setting.href}
                              key={setting.label}
                              style={{ textDecoration: "none" }}
                            >
                              <ListItemIcon>{setting.icon}</ListItemIcon>
                              {setting.label}
                            </Link>
                          </MenuItem>
                        );
                      } else if (setting.label === "Logout") {
                        return (
                          <MenuItem
                            key={setting.label}
                            onClick={() => setConfirmLogout(true)}
                          >
                            <ListItemIcon>{setting.icon}</ListItemIcon>
                            {setting.label}
                          </MenuItem>
                        );
                      }
                    })}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
            {/* This lets me have a confirmation dialog open */}
            <Dialog
              open={confirmLogout}
              onClose={() => setConfirmLogout(false)}
              aria-labelledby="Logout-Title"
              aria-describedby="Logout-Description"
            >
              <DialogTitle id="Logout-Title">
                {"Are you sure you want to logout?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="Logout-Description">
                  By clicking logout, you understand that you're logging out and
                  will need to sign in later.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{ color: "red" }}
                  onClick={() => setConfirmLogout(false)}
                >
                  Cancel
                </Button>
                <Button sx={{ color: "blue" }} onClick={handleLogoutItem}>
                  Logout
                </Button>
              </DialogActions>
            </Dialog>
          </AppBar>
        </Box>
      </nav>
    </header>
  );
}

export default NavbarComponent;
