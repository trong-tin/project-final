import { useEffect, useState } from "react";
import { getCookie } from "../../Helpers/cookie";
import { getDetailCompany } from "../../Services/usersServices";
import { Card } from "antd";

function InfoCompany() {
  const idCompany = getCookie("id");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCompany(idCompany);
      setData(response[0]);
    };
    fetchApi();
  }, []);
  console.log(data);
  return (
    <>
      <Card title="Thông tin công ty" size="small">
        <div>
          Tên công ty:<strong>{data.companyName}</strong>
        </div>
        <div>
          Email:<strong>{data.email}</strong>
        </div>
        <div>
          Số điện thoại:<strong>{data.phone}</strong>
        </div>
        <div>
          Số lượng nhân viên:<strong>{data.quantityPeople}</strong>
        </div>
      </Card>
    </>
  );
}

export default InfoCompany;
