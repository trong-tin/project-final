import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../Helpers/cookie";
const token = getCookie("token");
function PrivateRoutes() {
  const navigate = useNavigate();
  return <>{token ? <Outlet /> : navigate("/")}</>;
}

export default PrivateRoutes;
