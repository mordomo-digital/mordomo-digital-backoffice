import React from 'react';
import { Card, Table, Tag, Space, Button, Breadcrumb, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Styles
import './list.style.css';

const ListView = (props) => {

    const columns = [
        ...(props.schema || []).map(schemaElement => {
            let schemaElementToReturn = {
                title: schemaElement.title,
                dataIndex: schemaElement.key,
                key: schemaElement.key,
                align: schemaElement.align || 'left',
                width: schemaElement.width || null,
            }

            if (schemaElement.render) schemaElementToReturn.render = schemaElement.render

            return schemaElementToReturn;
        }),
        {
            title: 'Ações',
            key: 'actions',
            width: 100,
            render: (text, record) => (

                <Space size="middle">

                    <Link
                        to={{
                            pathname: `${props.route}/update`,
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
                    title={`${props.name}`}
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            {props.name}
                        </Breadcrumb.Item>

                    </Breadcrumb>

                    <Link
                        to={`${props.route}/new`}
                    >
                        <Button type='primary' className='home-list-add-button'>
                            Adicionar
                        </Button>
                    </Link>

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