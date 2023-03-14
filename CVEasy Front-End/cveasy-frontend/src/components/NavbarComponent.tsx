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
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const pages = ["Home", "Templates", "About"];
const settings = ["Account", "Settings", "Logout"];

function NavbarComponent() {
  const [auth, setAuth] = React.useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
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
               sx={{ my: 2, color: "inherit", display: "block", border: "1px solid"}}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/Login`}
                  >
                    Login
                </Link>
                </Button>
              )}
            {/* Curiously, this is the desktop view's app bar. Dunno why. */}
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              {!auth && (
              <Button
               key={"Login"}
               sx={{ my: 2, color: "inherit", display: "block", border: "1px solid"}}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/Login`}
                  >
                    Login
                </Link>
                </Button>
              )}
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default NavbarComponent;
