import { Space } from "antd";
import React from "react";
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { actionIconStyle } from "../../utils";
import { errorColor, infoColor } from "../../const";

const RenderActionInTable = (props) => {
    const { handleClickDelete, handleClickAddAndEdit, handleClickView, data } = props;

    return (
        <Space size={"small"}>
            <DeleteOutlined 
                style={actionIconStyle(errorColor)}
                onClick={() => handleClickDelete(data.id)}    
            />
            <EditOutlined 
                style={actionIconStyle(infoColor)}
                onClick={() => handleClickAddAndEdit(data.id)}  
            />
            <EyeOutlined 
                style={actionIconStyle(infoColor)}
                onClick={() => handleClickView(data.id)}
            />
        </Space>
    );
}

export default RenderActionInTable;