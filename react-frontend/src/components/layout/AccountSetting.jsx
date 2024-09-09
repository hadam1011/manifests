import { Col, Form, Input, Modal, Row } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isTokenExpired } from "../../utils";

const AccountSetting = (props) => {
    const { open, setOpen, user } = props;
    const [form] = Form.useForm();
    const history = useHistory();

    const token = localStorage.getItem('token');

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                history.push('/login');
            } else {
                JSON.parse(localStorage.getItem('user'));
            }
        }, 864000000);
 
        return () => clearInterval(interval);
    }, []);

    return (
        <Modal
            title={"Account Information"}
            open={open} 
            onOk={handleClose} 
            onCancel={handleClose}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={[16,0]}>
                    <Col span={12}>
                        <Form.Item 
                            label="User name:"
                            name="username"
                            initialValue={user?.username}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Email:"
                            name="email"
                            initialValue={user?.email}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Full name:"
                            name="fullName"
                            initialValue={user?.fullName}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Phone number:"
                            name="phoneNumber"
                            initialValue={user?.phoneNumber}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item 
                            label="Address:"
                            name="address"
                            initialValue={user?.address}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default AccountSetting;