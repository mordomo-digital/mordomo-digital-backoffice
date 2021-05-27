import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider, Select } from 'antd';
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
                    title='Tarefas'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            <Link to='/home/market-itens'>Itens de mercado</Link>
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
                            label="Nome"
                            style={{ width: 500 }}
                        >
                            <Input
                                value={props.form.name}
                                onChange={e => props.setForm({ ...props.form, name: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Grupo (Sessão) - Antigo"
                            style={{ width: 500 }}
                        >
                            <Input
                                value={props.form.type}
                                disabled
                                onChange={e => props.setForm({ ...props.form, type: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Grupo (Sessão) - Novo"
                            style={{ width: 500 }}
                        >
                            <Select
                                placeholder="Escolha..."
                                value={props.form.group}
                                onChange={e => props.setForm({ ...props.form, group: e })}
                            >
                                {
                                    props.groups.map((el, i) => {
                                        return (
                                            <Select.Option key={i} value={el._id}>
                                                {el.name}
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>

                    </Form>

                    <Divider />

                    <Button
                        type='primary'
                        disabled={!props.form.name || !props.form.type}
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