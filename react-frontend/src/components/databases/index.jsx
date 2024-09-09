import React, { useEffect, useState } from 'react'
import DatabaseService from '../../services/DatabaseService'
import { Modal, Switch, notification } from 'antd';
import { ExclamationCircleFilled} from '@ant-design/icons';
import DatabaseModal from './modal';
import TableComponent from '../table';
import RenderTextInTable from '../table/RenderTextInTable';
import RenderActionInTable from '../table/RenderActionInTable';
import CustomAddAndDeleteButton from '../button/CustomAddAndDeleteBtn';
import { openNotification } from '../../utils';

const ListDatabaseComponent = () => {
    const { confirm } = Modal;
    const [state, setState] = useState({
        data: [],
        page: 0,
        rowsPerPage: 5,
        refresh: false,
        isOpenConfirmModal: false,
        isDatabaseModalOpen: false,
        editable: false,
        databaseSelected: null,
        loading: true
    });
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
            title: 'Link',
            dataIndex: 'link',
            ellipsis: true,
            render: (_, record) => <RenderTextInTable data={record.link}/>
        },
        {
            title: 'Hostname',
            dataIndex: 'hostName',
            width: 100,
            render: (_, record) => <RenderTextInTable data={record.hostName}/>
        },
        {
            title: 'Service code',
            dataIndex: 'serviceCode',
            width: 170,
            render: (_, record) => <RenderTextInTable data={record.serviceCode}/>
        },
        {
            title: 'Labels',
            dataIndex: 'label',
            width: 180,
            render: (_, record) => {
                return record?.label?.split('\\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))
            }
        },
        {
            title: 'Keep connect', 
            dataIndex: 'keepConnect',
            width: 90,
            render: (_, record) => {
                return (
                    <Switch 
                        checkedChildren="ON" 
                        unCheckedChildren="OFF" 
                        value={record?.keepConnect === "true" ? true : false}
                        onClick={() => {
                            const value = {...record, keepConnect: record.keepConnect === "true" ? false : true}
                            handleUpdateDatabase(value, record.id);
                        }}
                    />
                )
            }
        },
        {
            title: 'Auto Commit',
            dataIndex: 'autoCommit',
            width: 90,
            render: (_, record) => {
                return (
                    <Switch 
                        checkedChildren="ON" 
                        unCheckedChildren="OFF" 
                        value={record?.autoCommit === "true" ? true : false}
                        onClick={() => {
                            const value = {...record, autoCommit: record.autoCommit === "true" ? false : true}
                            handleUpdateDatabase(value, record.id);
                        }}
                    />
                )
            }
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

    const handleUpdateDatabase = async (value, databaseId) => {
        await DatabaseService.updateDatabase(value, databaseId, localStorage.getItem('token'))
        setState({
            ...state, 
            refresh: !state.refresh,
        });
    }

    const deleteDatabase = async (id) => {
        try {
            const promiseArr = new Array();
            if (id) {
                await DatabaseService.deleteDatabase(id, localStorage.getItem('token'));
            } else {
                for (let i = 0; i < selectedRows.length; i++) {
                    promiseArr.push(DatabaseService.deleteDatabase(selectedRows[i], localStorage.getItem('token')));
                }
                await Promise.all(promiseArr);
            }
            openNotification(api, 'success', 'Succeed', 'Database deleted successfully!');
            setState({
                ...state, 
                refresh: !state.refresh,
            });
        } catch (e) {
            openNotification(api, 'error', 'Failed', 'Database deleted fail!');
            setState({...state, loading: false});
        }
    }

    const handleClickView = (id) => {
        setState({
            ...state,
            isDatabaseModalOpen: true,
            databaseSelected: id,
            editable: false
        });
    }

    const handleClickAddAndEdit = (id) => {
        setState({
            ...state,
            isDatabaseModalOpen: true,
            databaseSelected: id,
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
          title: 'Are you sure delete this databases?',
          icon: <ExclamationCircleFilled />,
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            setState({...state, loading: true});
            deleteDatabase(id);
          },
          onCancel() {
            setState({...state, isOpenConfirmModal: false});
          },
        });
    };

    useEffect(() => {
        try {
            DatabaseService.getDatabases(localStorage.getItem('token')).then((res) => {
                setState({
                    ...state, 
                    data: res.data,
                    loading: false
                });
            })
            setSelectedRows([]);
        } catch (err) {
            openNotification(api, "error", "Failed", "Network error!");
        }
    }, [state.refresh])

    return (
        <>
            {contextHolder}
            <DatabaseModal 
                databasesState={state}
                setDatabasesState={setState}
            />
            <CustomAddAndDeleteButton 
                handleClickAddAndEdit={handleClickAddAndEdit}
                handleClickDelete={handleClickDelete}
                addType="Database"
                selectedRows={selectedRows}
            />
            <TableComponent 
                columns={columns}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                state={state}
                setState={setState}
            />
        </>
    )
}

export default ListDatabaseComponent;
