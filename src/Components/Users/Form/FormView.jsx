import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider, Select, Switch } from 'antd';
import { Link } from 'react-router-dom';

// Style
import './FormStyle.css';

const FormView = (props) => {


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
                    title='Usuário'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            <Link to='/home/users'>Usuários</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            {props.idToUpdate ? 'Editar' : 'Novo'}
                        </Breadcrumb.Item>

                    </Breadcrumb>

                    <Form
                        style={{ marginTop: 40 }}
                        layout='vertical'
                    >

                        <Form.Item
                            label="E-mail"
                            style={{ width: 250 }}
                        >
                            <Input
                                value={props.form.email}
                                disabled
                            />
                        </Form.Item>

                        <Form.Item
                            label="Nome de usuário"
                            style={{ width: 250 }}
                        >
                            <Input
                                value={props.form.username}
                                disabled
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tipo de usuário"
                            style={{ width: 250 }}
                        >
                            <Select
                                placeholder="Escolha..."
                                value={props.form.userType}
                                onChange={e => props.setForm({ ...props.form, userType: e })}
                            >
                                <Select.Option value='free'>Gratuito</Select.Option>
                                <Select.Option value='premium'>Premium</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Verificado?"
                            style={{ width: 250 }}
                        >
                            <Switch
                                checked={props.form.verified}
                                onChange={e => props.setForm({ ...props.form, verified: e })}
                            />
                        </Form.Item>
                    </Form>

                    <Divider />

                    <Button
                        type='primary'
                        onClick={() => props.save()}
                        loading={props.loadingSaveButton}
                    >
                        {props.idToUpdate ? 'Atualizar' : 'Salvar'}
                    </Button>

                </Card>

            </div>

        </div>

    )

}

export default FormView;