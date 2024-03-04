import { Card, Tag } from "antd";
import { Link } from "react-router-dom";
function JobItem(props) {
  const { data = [] } = props;
  console.log(data);
  return (
    <>
      <Card
        title={<Link to={`/job/${data.id}`}>{data.name}</Link>}
        size="small"
      >
        <div className="mb-10">
          <span>Ngôn ngữ:</span>
          {data.tags.map((item, index) => (
            <Tag color="blue" className="mb-5" key={index}>
              {item}
            </Tag>
          ))}
        </div>
        <div className="mb-10">
          <span>
            Thành Phố tuyển dụng:
            {data.city &&
              data.city.map((item, index) => (
                <Tag color="orange" className="mb-5" key={index}>
                  {item}
                </Tag>
              ))}
          </span>
        </div>
        <div className="mb-10">
          Mức lương:<strong>{data.salary}$</strong>
        </div>
        <div>
          Công ty:<strong>{data.companyName}</strong>
        </div>
        <div>
          Thời gian đăng việc làm:<strong>{data.createAt}</strong>
        </div>
      </Card>
    </>
  );
}

export default JobItem;
