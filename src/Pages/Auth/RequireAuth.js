import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER} from "../../Api/Api";
import Loading from "../../Components/Loading";
import { Axios } from "../../Api/axios";
import Err403 from "./403";

export default function RequireAuth({allowedRole}) {
    //User
    const [user, setUser] = useState("");
    console.log(user);
    const Navigate = useNavigate();

    useEffect(() => {
        Axios.get(`/${USER}`)
            .then((data) => setUser(data.data))
            .catch(() => Navigate("/login", {replace: true}));
    }, []);

    //Token & cookie
    const cookie = Cookie();
    const token = cookie.get("e-commerce");


    return token ? (
        user === "" ? (
        <Loading></Loading>
        ) :  allowedRole.includes(user.role) ? (
        <Outlet></Outlet>
        )  : (
        <Err403 role={user.role}></Err403>
        )
        ) : (
        <Navigate to={"/login"} replace={true}
        ></Navigate>);
}