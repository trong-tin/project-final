import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CVSTatistic from "./CVStatistic"
import InfoCompany from "./InfoCompany";
function Dashboard() {
  return (
    <>
      <h1>Tổng quan</h1>
      <Row justify="space-around">
        <Col span={7}>
          <JobStatistic />
        </Col>
        <Col span={7}>
          <CVSTatistic/>
        </Col>
        <Col span={7}>
          <InfoCompany/>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
