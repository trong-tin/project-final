import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../Helpers/cookie";
import checkLogin from "../../Action/login";
import { useEffect } from "react";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  deleteAllCookies();
  useEffect(() => {
    dispatch(checkLogin(false));
    navigate("/login");
  }, []);
  return <></>;
}

export default Logout;
