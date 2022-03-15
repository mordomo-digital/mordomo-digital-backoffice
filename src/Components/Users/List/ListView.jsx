import React from 'react';

// Modules
import { Card, Table, Space, Breadcrumb, Modal, Input, Pagination, Select, Row, Col, Checkbox } from 'antd';
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
            title: 'Identificador',
            dataIndex: '_id',
            key: '_id',
            width: 200,
            align: 'center',
        },
        {
            title: 'Telefone',
            dataIndex: 'personalData',
            key: 'personalDataPhone',
            width: 200,
            align: 'center',
            filters: [
                { text: 'Sim', value: true },
            ],
            onFilter: (value, record) => {
                if (
                    value === true &&
                    (record && record.personalData && record.personalData.phone)
                ) return true;
                return false;
            },
            render: (e) => {
                if (e && e.phone) return props.stringToPhone(e.phone);
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

                    <Row gutter={24}>
                        <Col span={5}>
                            <Checkbox onChange={(e) => props.setSearchPhone(e)}>Com telefone</Checkbox>
                        </Col>
                        <Col span={5}>
                            <Select
                                onChange={field => props.setSearchField(field)}
                                style={{ width: '100%' }} placeholder='Filtrar por'
                            >
                                <Select.Option value='email'>E-mail</Select.Option>
                                <Select.Option value='username'>Nome de usuário</Select.Option>
                                <Select.Option value='userType'>Tipo de usuário</Select.Option>
                                <Select.Option value='id'>Identificador</Select.Option>
                            </Select>
                        </Col>
                        <Col span={14}>
                            <Input.Search
                                placeholder='Valor da buscar'
                                onChange={e => props.setSearchTerm(e.target.value)}
                                onSearch={() => props.search()}
                                style={{ float: 'left', clear: 'both', marginBottom: '20px' }}
                            />
                        </Col>
                    </Row>

                    <Table
                        dataSource={props.data}
                        columns={columns}
                        loading={props.loading}
                        locale={{
                            emptyText: 'Sem registros'
                        }}
                        pagination={false}
                    />

                    <Pagination
                        style={{ float: 'right', clear: 'both', marginTop: '20px' }}
                        current={parseInt(props.page)}
                        total={props.totalPages}
                        onChange={(page) => props.goToPage(page)}
                    />
                </Card>

            </div>

        </div>

    )

}

export default ListView;