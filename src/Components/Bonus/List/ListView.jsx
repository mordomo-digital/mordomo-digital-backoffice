import React from 'react';

// Modules
import { Card, Table, Space, Breadcrumb, Modal, Input, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Styles
import './ListStyle.css';

const ListView = (props) => {

    // Columns of the table list
    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Resumo',
            dataIndex: 'abstract',
            key: 'abstract',
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 100,
            render: (text, record) => (

                <Space size="middle">

                    <Link
                        to={{
                            pathname: `/home/bonus/update`,
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

        <div className='home-out-card'>

            <div className='home-in-card'>

                <Card
                    title='Bônus'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            Bônus
                        </Breadcrumb.Item>

                    </Breadcrumb>

                    <Link
                        to='/home/bonus/new'
                    >
                        <Button type='primary' className='home-list-add-button'>
                            Adicionar
                        </Button>
                    </Link>

                    <Input.Search placeholder='Buscar post' onSearch={e => props.searchRegister(e)} /><br /><br />

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