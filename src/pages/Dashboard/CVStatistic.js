import { useEffect, useState } from "react";
import { getCookie } from "../../Helpers/cookie";
import { getListCV } from "../../Services/usersServices";
import { Card } from "antd";

function JobStatistic() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCV(idCompany);
      if (response) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0,
        };
        obj.total = response.length;
        response.forEach((item) => {
          item.statusRead ? obj.statusTrue++ : obj.statusFalse++;
        });
        setData(obj);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {data && (
        <Card title="CV" size="small">
          <div>
            Số lượng CV: <strong>{data.total}</strong>
          </div>
          <div>
            CV đã đọc:<strong>{data.statusTrue}</strong>
          </div>
          <div>
            Job chưa đọc:<strong>{data.statusFalse}</strong>
          </div>
        </Card>
      )}
    </>
  );
}

export default JobStatistic;
