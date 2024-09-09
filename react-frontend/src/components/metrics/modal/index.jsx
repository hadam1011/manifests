import { Col, Form, Input, Modal, Row, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import MetricService from "../../../services/MetricService";
import { metricType } from "../../../const";
import { openNotification } from "../../../utils";

const MetricModal = (props) => { // metricsState, setMetricsState
    const [form] = Form.useForm();
    const [metric, setMetric] = useState();

    const {editable, metricSelected, isMetricModalOpen, refresh} = props?.metricsState;
    const {metricsState, setMetricsState} = props;

    const [api, contextHolder] = notification.useNotification();

    const handleFormSubmit = async (value) => {
        try {
            if (metricSelected) {
                await MetricService.updateMetric(value, metric?.id, localStorage.getItem('token'));
                openNotification(api, "success", "Succeed", "Metric updated successfully!");
            } else {
                await MetricService.createMetric(value, localStorage.getItem('token'));
                openNotification(api, "success", "Succeed", "Metric created successfully!");
            }
        } catch (err) {
            openNotification(api, "error", "Failed", err?.response?.data?.message);
        }
    }

    const handleClose = () => {
        setMetricsState({
            ...metricsState, 
            isMetricModalOpen: false,
            metricSelected: null,
            refresh: !refresh
        })
        form.resetFields();
    }

    useEffect(() => {
        try {
            if (metricSelected) {
                MetricService.getMetricById(metricSelected,localStorage.getItem('token')).then( res => {
                    setMetric({...res.data});
                    form.setFieldsValue({
                        name: res.data?.name,
                        type: res.data?.type,
                        description: res.data?.description,
                        labels: res.data?.labels,
                        buckets: res.data?.buckets,
                        states: res.data?.states,
                        expiration: res.data?.expiration,
                        increment: res.data?.increment,
                    })
                })
            }
        } catch (error) {
            openNotification(api, "error", "Failed", "Network error!");
        }
    }, [metricSelected])
    
    return (
        <Modal 
            title={editable
                ? metricSelected ? "Edit Metric" : "Create Metric"
                : "View Metric"}
            open={isMetricModalOpen} 
            onOk={() => {
                form.validateFields()
                  .then(async (value) => {
                    setMetricsState({...metricsState, loading: true});
                    await handleFormSubmit(value);
                    handleClose();
                });
            }}
            onCancel={handleClose}
        >
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={[16,0]}>
                    <Col span={12}>
                        <Form.Item 
                            label="Name:"
                            name="name"
                            rules={[
                                {
                                  required: true,
                                  message: "Metric name is required!",
                                }
                            ]}
                        >
                            <Input value={metric?.name} placeholder="Name" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Type:"
                            name="type"
                            rules={[
                                {
                                  required: true,
                                  message: "Type is required!",
                                }
                            ]}
                        >
                            <Select 
                                onChange={(e) => setMetric({...metric, type: e})}
                                placeholder="Type"
                                value={metric?.type}
                                options={metricType}
                                disabled={!editable}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item 
                            label="Description:"
                            name="description"
                        >
                            <Input value={metric?.description} placeholder="Description" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Lables:"
                            name="labels"
                        >
                            <Input value={metric?.labels} placeholder="Labels" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Buckets:"
                            name="buckets"
                        >
                            <Input value={metric?.buckets} placeholder="Buckets" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="States:"
                            name="states"
                        >
                            <Input value={metric?.states} placeholder="States" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Expiration:"
                            name="expiration"
                        >
                            <Input value={metric?.expiration} placeholder="Expiration" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item 
                            label="Increment:"
                            name="increment"
                        >
                            <Input value={metric?.increment} placeholder="Increment" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default MetricModal;