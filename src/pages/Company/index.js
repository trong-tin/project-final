import { useEffect, useState } from "react";
import { getCompany } from "../../Services/usersServices";
import { Button, Card, Collapse, Space } from "antd";

function CompanyList() {
  const [dataCompany, setDataCompany] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const responseCompany = await getCompany();
      setDataCompany(responseCompany);
    };
    fetchApi();
  }, []);
  const handleClick = () => {
    setSeeMore(!seeMore);
  };
  return (
    <>
      {dataCompany.length > 0 && (
        <>
          <h2>Danh sách các công ty đang tuyển dụng</h2>
          {seeMore ? (
            <>
              {dataCompany.map((item) => (
                <>
                  <Card
                    title={item.companyName}
                    key={item.id}
                    style={{ marginBottom: "20px" }}
                  >
                    <p>Số điện thoại: {item.phone}</p>
                    <p>Email công ty: {item.email}</p>
                    <p>Số lượng nhân sự: {item.quantityPeople}</p>
                    <p>Website công ty: {item.phone}</p>
                    <p>Thời gian làm việc: {item.workingTime}</p>
                  </Card>
                </>
              ))}
              <Button type="primary" danger onClick={handleClick}>
                Ẩn bớt
              </Button>
            </>
          ) : (
            <>
              <Card
                title={dataCompany[0].companyName}
                key={dataCompany[0].id}
                style={{ marginBottom: "20px"}}
              >
                <p>Số điện thoại: {dataCompany[0].phone}</p>
                <p>Email công ty: {dataCompany[0].email}</p>
                <p>Số lượng nhân sự: {dataCompany[0].quantityPeople}</p>
                <p>Website công ty: {dataCompany[0].phone}</p>
                <p>Thời gian làm việc: {dataCompany[0].workingTime}</p>
              </Card>
              <Button type="primary" onClick={handleClick}>
                Xem thêm
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default CompanyList;
