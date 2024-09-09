import { Col, Form, Input, Modal, Row } from "antd";
import React from "react";

const AddLabelModal = (props) => {
    const {open, setOpen, labelSelected, setLabelSelected, labels, setLabels} = props;
    const [form] = Form.useForm();

    const handleOk = (value) => {
        if (labelSelected) {
            setLabels(labels.map(label => {
                return label.id === value.id 
                    ? value 
                    : label
            }));
        } else {
            const newLabel = {
                ...value,
                id: Math.floor(Math.random() * 100)
            }
            setLabels([...labels, newLabel]);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setLabelSelected();
        form.resetFields();
    }

    return (
        <Modal 
            open={open}
            title={labelSelected ? "Edit label" : "Add label"}
            onCancel={handleClose}
            onOk={() => {
                form.validateFields()
                  .then((value) => {
                    handleOk(value);
                    handleClose();
                });
            }}
            centered
        >
            <Form layout="vertical" form={form}>
                <Row gutter={[16,0]}>
                    <Col span={12}>
                        <Form.Item 
                            label="Key:"
                            name="key"
                            placeholder="Key"
                            rules={[
                                {
                                    required: true,
                                    message: "Key is required!",
                                }
                            ]}
                        >
                            <Input value={labelSelected?.key}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Value:"
                            name="value"
                            placeholder="Value"
                            rules={[
                                {
                                    required: true,
                                    message: "Value is required!",
                                }
                            ]}
                        >
                            <Input value={labelSelected?.value}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default AddLabelModal;