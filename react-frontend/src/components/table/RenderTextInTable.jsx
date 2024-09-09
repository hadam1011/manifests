import React from "react";

const RenderTextInTable = (props) => {
    const {data} = props;

    return (
        data ? data: "---"
    )
}

export default RenderTextInTable;