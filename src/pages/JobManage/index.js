import React, { useEffect, useState } from "react";
import { getCookie } from "../../Helpers/cookie";
import { delJobCompany, getListJob } from "../../Services/usersServices";
import { Button, Card, Col, Row, Tag, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import EditJob from "./EditJob";
import CreateJob from "./CreateJob";
import DetailtJob from "./DetailtJob";

function JobManage() {
  const [loading, setLoading] = useState(false);
  const [mess, contextHolder] = message.useMessage();
  const idCompany = getCookie("id");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListJob(idCompany);
      setData(response);
    };
    fetchApi();
  }, [loading]);
  const handleDelete = (id) => {
    delJobCompany(id);
    if (delJobCompany) {
      setLoading(!loading);
      mess.success("Bạn đã xóa Job thành công");
    }
  };
  return (
    <>
      {contextHolder}
      <Card
        title="Danh sách việc làm"
        extra={
          <CreateJob
            idCompany={idCompany}
            modal={true}
            loading={loading}
            setLoading={setLoading}
          />
        }
      >
        <Row gutter={[10, 20]}>
          <Col span={6}>
            <h3>Tên công việc</h3>
          </Col>
          <Col span={5}>
            <h3>Ngôn ngữ lập trình</h3>
          </Col>
          <Col span={3}>
            <h3>Mức lương ($)</h3>
          </Col>
          <Col span={3}>
            <h3>Thời gian</h3>
          </Col>
          <Col span={3}>
            <h3>Trạng thái</h3>
          </Col>
          <Col span={4}>
            <h3>Hành động</h3>
          </Col>
        </Row>
        <Row gutter={[20, 30]}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <Col span={6}>{item.name}</Col>
              <Col span={5}>
                {item.tags.map((tag, indexTag) => (
                  <Tag
                    key={indexTag}
                    color="green"
                    style={{ marginBottom: "8px" }}
                  >
                    {tag}
                  </Tag>
                ))}
              </Col>
              <Col span={3}>{item.salary}$</Col>
              <Col span={3}>{item.createAt}</Col>
              <Col span={3}>
                {item.status ? (
                  <Tag color="blue">Đang tuyển dụng</Tag>
                ) : (
                  <Tag color="red">Ngưng tuyển dụng</Tag>
                )}
              </Col>
              <Col span={4}>
                <EditJob
                  modal={true}
                  idJob={item.id}
                  loading={loading}
                  setLoading={setLoading}
                />
                <Button
                  onClick={() => handleDelete(item.id)}
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  title="Xóa"
                ></Button>
                <DetailtJob idJob={item.id} />
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default JobManage;
