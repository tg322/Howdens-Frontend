import Button from "@mui/material/Button";
import { useAuthDispatchContext } from "../../auth/AuthContext";
import './layout.scss'

export default function LogoutButton(){
    const {logout} = useAuthDispatchContext();

    return(
        <div className="logoutButton">
            <Button sx={{textTransform:'none'}} variant="contained" size='medium' onClick={logout}>Logout</Button>
        </div>
    );
}