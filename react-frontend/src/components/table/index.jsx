import React, { useEffect, useState } from "react";
import { Pagination, Skeleton, Table } from "antd";

const TableComponent = (props) => {
    const { columns, setSelectedRows, state, setState, labels } = props;
    const [displayData, setDisplayData] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedRows(selectedRowKeys);
        }
    };

    const handleChangePage = (e) => {
        setState({...state, page: e - 1})
    }

    useEffect(() => {
        setDisplayData(state?.data?.slice(state?.page * state?.rowsPerPage, state?.rowsPerPage * (state?.page + 1)));
    }, [state?.page, state?.data])

    return (
        <div className="w-100">
            <Skeleton active loading={state?.loading}>
                <Table 
                    rowKey={(record) => record?.id}
                    className="mb-2"
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={labels ? labels : displayData}
                    bordered
                    pagination={false}
                />
                {!labels &&
                    <Pagination
                        className="d-flex justify-content-end" 
                        current={state?.page + 1}
                        total={state?.data.length} 
                        onChange={handleChangePage}
                        pageSize={state?.rowsPerPage}
                    />
                }
            </Skeleton>
        </div>
    )
}

export default TableComponent;