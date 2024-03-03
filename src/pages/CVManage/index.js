import { useEffect, useState } from "react";
import { getCookie } from "../../Helpers/cookie";
import { deleteCV, getAllJob, getListCV } from "../../Services/usersServices";
import { Button, Card, Col, Row, Tag } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function CVManage() {
  const idCompany = getCookie("id");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const responseCV = await getListCV(idCompany);
      const responseJob = await getAllJob(idCompany);

      let newData = [];
      for (let i = 0; i < responseCV.length; i++) {
        for (let j = 0; j < responseJob.length; j++) {
          if (responseCV[i].idJob == responseJob[j].id) {
            newData.push({
              ...responseCV[i],
              nameJob: responseJob[j].name,
            });
          }
        }
      }
      setData(newData);
    };
    fetchApi();
  }, [loading]);
  const handleDelete = (id) => {
    const idString = id.toString();
    deleteCV(idString);
    setLoading(!loading);
  };
  return (
    <>
      {data && (
        <Card title="Danh sách các ứng viên">
          <Row gutter={[10, 30]} style={{ marginBottom: "20px" }}>
            <Col span={5}>
              <strong>Tên công việc</strong>
            </Col>
            <Col span={3}>
              <strong>Họ và tên</strong>
            </Col>
            <Col span={3}>
              <strong>Số điện thoại</strong>
            </Col>
            <Col span={4}>
              <strong>Email</strong>
            </Col>
            <Col span={3}>
              <strong>Ngày gửi</strong>
            </Col>
            <Col span={3}>
              <strong>Trạng thái</strong>
            </Col>
            <Col span={3}>
              <strong>Hành động</strong>
            </Col>
          </Row>
          <Row gutter={[10, 30]}>
            {data.map((item) => (
              <>
                <Col span={5}>{item.nameJob}</Col>
                <Col span={3}>{item.name}</Col>
                <Col span={3}>{item.phone}</Col>
                <Col span={4}>{item.email}</Col>
                <Col span={3}>{item.createAt}</Col>
                <Col span={3}>
                  {item.statusRead ? (
                    <Tag color="green">Đã đọc</Tag>
                  ) : (
                    <Tag color="red">Chưa đọc</Tag>
                  )}
                </Col>
                <Col span={3}>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    title="Xóa CV này"
                    style={{ marginRight: "1em" }}
                  ></Button>
                  <Link to={`/detail-cv/${item.id}`}>
                    <Button
                      icon={<EyeOutlined />}
                      style={{ color: "#4096FF" }}
                    ></Button>
                  </Link>
                </Col>
              </>
            ))}
          </Row>
        </Card>
      )}
    </>
  );
}

export default CVManage;
