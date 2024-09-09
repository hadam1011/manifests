import { Button, Flex } from "antd";
import React from "react";

const CustomAddAndDeleteButton = (props) => {
    const {handleClickAddAndEdit, handleClickDelete, selectedRows, addType} = props;
    
    return (
        <Flex justify='space-between' align='center'>
            <button className="btn btn-primary mb-2" onClick={() => handleClickAddAndEdit()}> Add {addType}</button>
            {selectedRows.length > 0 &&
                <Button danger className="mb-2" onClick={() => handleClickDelete()}>
                    Delete
                </Button>
            }
        </Flex>
    )
}

export default CustomAddAndDeleteButton;