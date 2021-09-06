import React from 'react';

// Modules
import { Card, Table, Space, Breadcrumb, Modal, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Styles
import './ListStyle.css';

const ListView = (props) => {

    // Columns of the table list
    const columns = [
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Nome de usuário',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Tipo de usuário',
            dataIndex: 'userType',
            key: 'userType',
            render: (e) => {
                if (e === 'free') return 'Gratuito';
                if (e === 'premium') return 'Premium';
                return '-';
            }
        },
        {
            title: 'Verificado?',
            dataIndex: 'verified',
            key: 'verified',
            render: (e) => {
                if (e === true) return 'Sim';
                return 'Não';
            }
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 100,
            render: (text, record) => (

                <Space size="middle">

                    <Link
                        to={{
                            pathname: `/home/users/update`,
                            state: {
                                id: record._id
                            }
                        }}
                    >Editar</Link>

                    <span
                        style={{
                            color: 'red',
                            cursor: 'pointer'
                        }}
                        onClick={() => {

                            Modal.confirm({
                                title: 'Tem certeza que deseja excluir esse registro?',
                                icon: <ExclamationCircleOutlined />,
                                content: 'Essa ação não poderá ser desfeita',
                                okText: 'Sim',
                                okType: 'danger',
                                cancelText: 'Não',
                                onOk() {
                                    props.removeData(record._id)
                                },
                            });

                        }}
                    >Deletar</span>
                </Space>

            ),
        },
    ];

    return (

        <div
            style={{
                height: '80vh',
                position: 'relative'
            }}
        >

            <div
                style={{
                    maxHeight: '100%',
                    overflow: 'auto'
                }}
            >

                <Card
                    title='Usuários'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            Usuários
                        </Breadcrumb.Item>

                    </Breadcrumb><br /><br />

                    <Input.Search placeholder='Buscar usuário' onSearch={e => props.searchRegister(e)} /><br /><br />

                    <Table
                        dataSource={props.data}
                        columns={columns}
                        loading={props.loading}
                        locale={{
                            emptyText: 'Sem registros'
                        }}
                    />
                </Card>

            </div>

        </div>

    )

}

export default ListView;