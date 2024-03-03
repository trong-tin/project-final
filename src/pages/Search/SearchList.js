import { useEffect, useState } from "react";
import { getCompany } from "../../Services/usersServices";
import { Col, Row } from "antd";
import JobItem from "../../Components/JobItem";

function SearchList(props) {
  const { data = [] } = props;
  const [dataCompany, setDataCompany] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCompany();
      setDataCompany(response);
    };
    fetchApi();
  }, []);
  const resultFinal = data.map((itemData) => ({
    ...dataCompany.find(
      (itemDataComany) => itemDataComany.id == itemData.idCompany
    ),
    ...itemData,
  }));
  console.log(dataCompany);
  return (
    <>
      {resultFinal.length > 0 ? (
        <div className="mt-20">
          <Row gutter={[20, 20]}>
            {resultFinal.map((item) => (
              <Col span={6} key={item.id}>
                <JobItem data={item} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="mt-20">Không tìm thấy công việc nào</div>
      )}
    </>
  );
}

export default SearchList;
