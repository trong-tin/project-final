import { useState, useEffect } from "react";
import { getTags } from "../../Services/usersServices";
import { Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";

function SkillList() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fecthApi = async () => {
      const response = await getTags();
      setTags(response);
    };
    fecthApi();
  }, []);
  return (
    <>
      <Row gutter={[6, 6]} justify={"start"} wrap={true}>
        {tags &&
          tags.map((item, index) => (
            <Col span={2} style={{ textAlign: "center" }} key={index}>
              <Link
                to={`/search?keyword=${item.value}`}
                width={{ width: "100%" }}
              >
                <Tag
                  color="blue"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {item.value}
                </Tag>
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default SkillList;
