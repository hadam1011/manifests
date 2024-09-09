import React, { useEffect, useState } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, notification } from 'antd';
import { useHistory } from "react-router-dom";
import TableComponent from '../table';
import UserModal from './modal';
import RenderTextInTable from '../table/RenderTextInTable';
import RendertTagInTable from '../table/RenderTagInTable';
import RenderActionInTable from '../table/RenderActionInTable';
import { deleteUser, getUsers } from '../../services/UserService';
import CustomAddAndDeleteButton from '../button/CustomAddAndDeleteBtn';
import { openNotification } from '../../utils';

const ListUserComponent = () => {
    const { confirm } = Modal;
    const history = useHistory();   
    const [state, setState] = useState({
        data: [],
        page: 0,
        rowsPerPage: 5,
        refresh: false,
        loading: true,
        isOpenConfirmModal: false,
        isUserModalOpen: false,
        editable: false,
        userSelected: null
    })
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
            title: 'Username',
            dataIndex: 'username',
            width: 120,
            showSorterTooltip: {
              target: 'full-header',
            },
            sorter: (a, b) => a.username.length - b.username.length,
            render: (_, record) => <RenderTextInTable data={record.username}/>
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            width: 150,
            showSorterTooltip: {
              target: 'full-header',
            },
            sorter: (a, b) => a.fullName.length - b.fullName.length,
            render: (_, record) => <RenderTextInTable data={record.fullName}/>
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            width: 130,
            render: (_, record) => <RenderTextInTable data={record.phoneNumber}/>
        },
        {
            title: 'Address',
            dataIndex: 'address',
            elellipsis: true,
            render: (_, record) => <RenderTextInTable data={record.address}/>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (_, record) => <RenderTextInTable data={record.email}/>
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            render: (_, { roles }) => <RendertTagInTable data={roles}/>
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

    const showDeleteConfirm = (id) => {
        confirm({
          open: state.isOpenConfirmModal,
          title: 'Are you sure delete this account?',
          icon: <ExclamationCircleFilled />,
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            handleDeleteUser(id);
          },
          onCancel() {
            setState({...state, isOpenConfirmModal: false});
          },
        });
    };

    const handleClickDelete = (id) => {
        setState({...state, isOpenConfirmModal: true});
        showDeleteConfirm(id);
    }

    
    const handleClickAddAndEdit = (id) => {
        setState({
            ...state,
            isUserModalOpen: true,
            userSelected: id,
            editable: true
        })
    }

    const handleClickView = (id) => {
        setState({
            ...state,
            isUserModalOpen: true,
            userSelected: id,
            editable: false
        })
    }
    
    const handleDeleteUser = async (id) => {
        try {
            const promiseArr = new Array();
            if (id) {
                await deleteUser(id, localStorage.getItem('token'));
            } else {
                for (let i = 0; i < selectedRows.length; i++) {
                    promiseArr.push(deleteUser(selectedRows[i] ,localStorage.getItem('token')));
                }
                await Promise.all(promiseArr);
            }
            openNotification(api, 'success', 'Succeed', 'Account deleted successfully!');
            setState({
                ...state, 
                refresh: !state.refresh,
            });
        } catch (err) {
            openNotification(api, 'error', 'Failed', 'Database deleted fail!');
            setState({...state, loading: false});
        }
    }

    useEffect(() => {
        try {
            getUsers(localStorage.getItem('token')).then((res) => {
                setState({ 
                    ...state, 
                    data: res.data,
                    loading: false
                });
                setSelectedRows([]);
            }).catch(error => {
                if (error.response.status === 403) {
                    history.push("/not-authorized");
                }
            });
        } catch (err) {
            openNotification(api, "error", "Failed", "Network error!");
        }
    }, [state.refresh])

    return (
        <div>
            {contextHolder}
            <UserModal 
                usersState={state}
                setUsersState={setState}
            />
            <CustomAddAndDeleteButton 
                handleClickAddAndEdit={handleClickAddAndEdit}
                handleClickDelete={handleClickDelete}
                addType="Account"
                selectedRows={selectedRows}
            />
            <TableComponent 
                columns={columns}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                state={state}
                setState={setState}
            />
        </div>
    )
}

export default ListUserComponent;
