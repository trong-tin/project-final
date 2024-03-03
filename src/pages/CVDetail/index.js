import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCV, getJob, patchCV } from "../../Services/usersServices";
import { Button, Card, Col, Collapse, Divider, Row, Space, Tag } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
function CVDetail() {
  const navigate = useNavigate();
  const param = useParams();
  const [dataCV, setDataCV] = useState([]);
  const [dataJob, setDataJob] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const responseCV = await getCV(param.id);
      setDataCV(responseCV[0]);
      const idJob = responseCV[0].idJob;
      const responseJob = await getJob(idJob);
      setDataJob(responseJob[0]);
    };
    fetchApi();
  }, []);
  console.log(dataJob);
  const handleClick = () => {
    const newData = { ...dataCV, statusRead: true };
    patchCV(newData.id, newData);
    navigate("/cv-manage");
  };
  return (
    <>
      {dataCV && (
        <Space>
          <Card
            title="Chi tiết ứng viên"
            extra={
              <Link to="/cv-manage">
                <Button type="primary" icon={<RollbackOutlined />}>
                  Quay lại
                </Button>
              </Link>
            }
          >
            <Row gutter={[20, 20]} justify="end">
              <Col span={24}>
                <span>
                  Tên ứng viên: <strong>{dataCV.name}</strong>
                </span>
              </Col>
              <Col span={24}>
                <span>
                  Ngày gửi: <strong>{dataCV.createAt}</strong>
                </span>
              </Col>
              <Col span={24}>
                <span>
                  Số điện thoại: <strong>{dataCV.phone}</strong>
                </span>
              </Col>
              <Col span={24}>
                <span>
                  Email: <strong>{dataCV.email}</strong>
                </span>
              </Col>
              <Col span={24}>
                <span>
                  Thành phố ứng tuyển: <strong>{dataCV.city}</strong>
                </span>
              </Col>
              <Col span={24}>
                <span>
                  Giới thiệu bản thân: <strong>{dataCV.description}</strong>
                </span>
              </Col>
              <Col span={24}>
                <span>
                  Link Project: <strong>{dataCV.linkProject}</strong>
                </span>
              </Col>
              <Col span={24}>
                <Button onClick={() => handleClick()} type="primary">
                  Đã xem
                </Button>
              </Col>
            </Row>
          </Card>
        </Space>
      )}
      {dataJob && (
        <Collapse
          items={[
            {
              key: "1",
              label: "Xem chi tiết công việc",
              children: (
                <Card title="Thông tin công việc">
                  <Row gutter={[20, 20]} justify="end">
                    <Col span={24}>
                      <span>
                        Tên công việc: <strong>{dataJob.name}</strong>
                      </span>
                    </Col>
                    <Col span={24}>
                      <span>
                        Ngày đăng: <strong>{dataJob.createAt}</strong>
                      </span>
                    </Col>
                    <Col span={24}>
                      <span>
                        Ngôn ngữ:
                        <strong>
                          {dataJob.tags &&
                            dataJob.tags.map((item) => (
                              <Tag color="green">{item}</Tag>
                            ))}
                        </strong>
                      </span>
                    </Col>
                    <Col span={24}>
                      <span>
                        Thành phố nhận ứng tuyển:
                        <strong>
                          {dataJob.city &&
                            dataJob.city.map((item) => (
                              <Tag color="blue">{item}</Tag>
                            ))}
                        </strong>
                      </span>
                    </Col>
                    <Col span={24}>
                      <span>Chi tiết Job: {dataJob.description}</span>
                    </Col>
                  </Row>
                </Card>
              ),
            },
          ]}
        />
      )}
    </>
  );
}

export default CVDetail;
