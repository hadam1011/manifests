import { Tag } from "antd";
import React from "react";

const RendertTagInTable = (props) => {
    const { data } = props;

    return (
        <>
            {data?.map(item => {    
                let color = item.name === 'ADMIN' ? 'geekblue' : 'green';
                return (
                    <Tag color={color} key={item.id}>
                        {item.name.toUpperCase()}
                    </Tag>
                );
            })}
        </>
    )
}

export default RendertTagInTable;