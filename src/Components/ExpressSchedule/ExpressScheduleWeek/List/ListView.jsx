import React from 'react';

// Modules
import { Card, Table, Space, Button, Breadcrumb, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Styles
import './ListStyle.css';

const ListView = (props) => {

    // Columns of the table list
    const columns = [
        {
            title: 'Semana sugerida',
            dataIndex: 'dayWeekNumber',
            key: 'dayWeekNumber',
            render: (v) => `Semana ${v + 1}`,
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 100,
            render: (text, record) => (

                <Space size="middle">

                    <Link
                        to={{
                            pathname: `/home/express-schedule-week/update`,
                            state: {
                                id: record.key
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
                                    props.removeData(record.key)
                                },
                            });

                        }}
                    >Deletar</span>
                </Space>

            ),
        },
    ];

    const dataSource = props.data.map(el => {
        return {
            ...el,
            _createdAt: new Date(el._createdAt).toLocaleString('pt-BR'),
            key: el._id
        }
    });

    return (

        <div className='home-out-card'>

            <div className='home-in-card'>

                <Card
                    title='Cronograma Express - Faxina Semanal'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            Cronograma Express - Faxina Semanal
                        </Breadcrumb.Item>

                    </Breadcrumb>

                    <Link
                        to='/home/express-schedule-week/new'
                    >
                        <Button type='primary' className='home-list-add-button'>
                            Adicionar
                        </Button>
                    </Link>

                    <Table
                        dataSource={dataSource}
                        columns={columns}
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