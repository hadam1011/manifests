import React, { useEffect, useState } from 'react'
import QueryService from '../../services/QueryService'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, notification } from 'antd';
import QueryModal from './modal';
import DatabaseService from '../../services/DatabaseService';
import MetricService from '../../services/MetricService';
import TableComponent from '../table';
import RenderTextInTable from '../table/RenderTextInTable';
import RenderActionInTable from '../table/RenderActionInTable';
import CustomAddAndDeleteButton from '../button/CustomAddAndDeleteBtn';
import { openNotification } from '../../utils';

const ListQueryComponent = () => {
    const { confirm } = Modal;
    const [state, setState] = useState({
        data: [],
        page: 0,
        rowsPerPage: 5,
        refresh: false,
        loading: true,
        isOpenConfirmModal: false,
        isQueryModalOpen: false,
        editable: false,
        querySelected: null
    })
    const [databaseList, setDatabaseList] = useState([]);
    const [metricList, setMetricList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [api, contextHolder] = notification.useNotification();

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            width: 60,
            render: (_, __, index) => <RenderTextInTable data={state.page * state.rowsPerPage + index + 1} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 120,
            showSorterTooltip: {
              target: 'full-header',
            },
            sorter: (a, b) => a.name.length - b.name.length,
            render: (_, record) => <RenderTextInTable data={record.name}/>
        },
        {
            title: 'Interval',
            dataIndex: 'interval',
            render: (_, record) => <RenderTextInTable data={record.interval}/>
        },
        {
            title: 'Timeout',
            dataIndex: 'timeout',
            render: (_, record) => <RenderTextInTable data={record.timeout}/>
        },
        {
            title: 'Databases',
            dataIndex: 'databases',
            render: (_, record) => <RenderTextInTable data={record.databases}/>
        },
        {
            title: 'Metrics',
            dataIndex: 'metrics',
            render: (_, record) => <RenderTextInTable data={record.metrics}/>
        },
        {
            title: 'Expiration',
            dataIndex: 'expiration',
            width: 100,
            render: (_, record) => <RenderTextInTable data={record.expiration}/>
        },
        {
            title: "Action",
            dataIndex: "action",
            width: 120,
            render: (_, record) => 
                <RenderActionInTable
                    data={record}
                    handleClickDelete={handleClickDelete}
                    handleClickAddAndEdit={handleClickAddAndEdit}
                    handleClickView={handleClickView}
                />
        }
    ]

    const deleteQuery = async (id) => {
        try {
            const promiseArr = new Array();
            if (id) {
                await QueryService.deleteQuery(id, localStorage.getItem('token'));
            } else {
                for (let i = 0; i < selectedRows.length; i++) {
                    promiseArr.push(QueryService.deleteQuery(selectedRows[i] ,localStorage.getItem('token')));
                }
                await Promise.all(promiseArr);
            }
            setState({
                ...state, 
                refresh: !state.refresh,
            });
            openNotification(api, 'success', 'Succeed', 'Query deleted successfully!');
        } catch (err) {
            openNotification(api, 'error', 'Failed', 'Query deleted fail!');
            setState({...state, loading: false});
        }
    }
    const handleClickView = (id) => {
        setState({
            ...state,
            isQueryModalOpen: true,
            querySelected: id,
            editable: false
        })
    }

    const handleClickAddAndEdit = (id) =>{
        setState({
            ...state,
            isQueryModalOpen: true,
            querySelected: id,
            editable: true
        })
    }

    const handleClickDelete = (id) => {
        setState({...state, isOpenConfirmModal: true});
        showDeleteConfirm(id);
    }

    const showDeleteConfirm = (id) => {
        confirm({
          open: state.isOpenConfirmModal,
          title: 'Are you sure delete this query?',
          icon: <ExclamationCircleFilled />,
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteQuery(id);
          },
          onCancel() {
            setState({...state, isOpenConfirmModal: false});
          },
        });
    };

    useEffect(() => {
        DatabaseService.getDatabases(localStorage.getItem('token')).then((res) => {
            setDatabaseList(res.data);
        });
        MetricService.getMetrics(localStorage.getItem('token')).then((res) => {
            setMetricList(res.data);
        });
    }, [])

    useEffect(() => {
        try {
            QueryService.getQueries(localStorage.getItem('token')).then((res) => {
                setState({ 
                    ...state,
                    data: res.data,
                    loading: false
                });
            });
            setSelectedRows([]);
        } catch (err) {
            openNotification(api, "error", "Failed", "Network error!");
        }
    }, [state.refresh])

    return (
        <>
            {contextHolder}
            <QueryModal 
                queriesState={state}
                setQueriesState={setState}
                databaseList={databaseList}
                metricList={metricList}
            />
            <CustomAddAndDeleteButton 
                handleClickAddAndEdit={handleClickAddAndEdit}
                handleClickDelete={handleClickDelete}
                addType="Query"
                selectedRows={selectedRows}
            />
            <TableComponent 
                columns={columns}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                state={state}
                setState={setState}            
            />
        </>
    )
}

export default ListQueryComponent
