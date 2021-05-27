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
            title: 'Ícone',
            dataIndex: 'icon',
            key: 'icon',
            align: 'center',
            render: image => {
                return <img src={image} width={40} height={40} alt={image} style={{ objectFit: 'contain' }} />
            }
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 100,
            render: (text, record) => (

                <Space size="middle">

                    <Link
                        to={{
                            pathname: `/home/room-types/update`,
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
        // Get image
        let base64Flag = `data:image/png;base64,`;
        let imageStr = props.arrayBufferToBase64(el.icon.data.data);

        return {
            ...el,
            name: el.name,
            _createdAt: new Date(el._createdAt).toLocaleString('pt-BR'),
            key: el._id,
            icon: base64Flag + imageStr,
        }
    });

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
                    title='Grupos de itens'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            Grupos de itens
                        </Breadcrumb.Item>

                    </Breadcrumb>

                    <Link
                        to='/home/market-item-groups/new'
                    >
                        <Button
                            type='primary'
                            style={{
                                marginBottom: 20,
                                marginTop: 20
                            }}
                        >
                            Adicionar
                        </Button>
                    </Link>

                    <Table
                        dataSource={dataSource}
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