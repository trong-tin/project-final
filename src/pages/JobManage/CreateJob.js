import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Switch, message } from "antd";
import { createJob, getListCity, getTags } from "../../Services/usersServices";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
function CreateJob(props) {
  const [mess, contextHolder] = message.useMessage();
  const { idCompany, loading, setLoading } = props;
  const [dataTags, setDataTags] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchApi = async () => {
      const responseTags = await getTags();
      setDataTags(responseTags);
      const responseCity = await getListCity();
      setDataCity(responseCity);
    };
    fetchApi();
  }, []);
  let optionCity = [];
  dataCity.map((item) =>
    optionCity.push({
      label: item.value,
      value: item.value,
    })
  );
  let optionTags = [];
  dataTags.map((item) =>
    optionTags.push({
      label: item.value,
      value: item.value,
    })
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(!loading);
  };
  const handleOk = () => {
    const currentDate = new Date(Date.now());
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      currentDate
    );
    form.validateFields().then((options) => {
      options["idCompany"] = idCompany;
      options["id"] = Date.now().toString();
      options["createAt"] = formattedDate;
      createJob(options);
      if (createJob) {
        setLoading(!loading);
        setIsModalOpen(false);
        mess.success("Bạn đã tạo việc làm mới thành công");
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rules = [
    {
      required: true,
      message: "Vui lòng nhập đầy đủ thông tin",
    },
  ];
  return (
    <>
      {contextHolder}
      <Button onClick={showModal} icon={<PlusOutlined />}>
        Tạo việc làm mới
      </Button>
      <Modal
        title="Tạo việc làm mới"
        open={isModalOpen}
        onOk={handleOk}
        width={"80%"}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Tên Job" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="Thành phố" rules={rules}>
            <Checkbox.Group options={optionCity} />
          </Form.Item>
          <Form.Item name="tags" label="Ngôn ngữ" rules={rules}>
            <Checkbox.Group options={optionTags} />
          </Form.Item>
          <Form.Item name="salary" label="Mức lương" rules={rules}>
            <Input addonAfter="$"/>
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={rules}>
            <TextArea rows={9} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default CreateJob;
