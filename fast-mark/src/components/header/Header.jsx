import { AppBar, Icon, Toolbar, Typography , Button} from "@mui/material";
import BurstModeIcon from '@mui/icons-material/BurstMode';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Icon
                    color="inherit"
                    sx={{ mr: 1 }}
                >
                    <BurstModeIcon />
                </Icon>
                <Typography
                    variant="h6"
                    component="span"
                    sx={{ flexGrow: 1 }}
                >
                    Fast Mark
                </Typography>
                <Button 
                    color="inherit"
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header