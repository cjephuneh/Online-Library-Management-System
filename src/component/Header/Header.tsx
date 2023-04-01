import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogout } from "../../hooks/useLogout";
import { RootState } from "../../redux/redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const { sendLogoutRequest } = useLogout();

  const { token } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        Online Library
      </Typography>
      <Divider />
      <List>
        {token && (
          <ListItem onClick={() => navigate("/dashboard")} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem onClick={() => navigate("/library")} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"Library"} />
          </ListItemButton>
        </ListItem>
        {!token && (
          <>
            <ListItem onClick={() => navigate("/login")} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={"Sign In"} />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate("/register")} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={"Register"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {token && (
          <ListItem onClick={() => sendLogoutRequest()} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/library")}
          >
            Online Library
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {token && (
              <Button
                onClick={() => navigate("/dashboard")}
                sx={{ color: "#fff" }}
              >
                Dashboard
              </Button>
            )}
            <Button onClick={() => navigate("/library")} sx={{ color: "#fff" }}>
              Library
            </Button>
            {!token && (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{ color: "#fff" }}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  sx={{ color: "#fff" }}
                >
                  Register
                </Button>
              </>
            )}
            {token && (
              <Button
                onClick={() => sendLogoutRequest()}
                sx={{ color: "#fff" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}></Box>
      <Toolbar />
    </Box>
  );
}
