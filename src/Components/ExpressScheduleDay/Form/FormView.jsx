import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Select, Input, Button, Divider } from 'antd';
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
                    title='Cronograma Express - Serviços diários'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            <Link to='/home/express-schedule-day'>Cronograma Express - Serviços diários</Link>
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
                            label="Dia da semana"
                            style={{ width: 250 }}
                        >
                            <Select
                                style={{ width: 250 }}
                                onChange={e => props.setForm({ ...props.form, dayWeekNumber: e })}
                                value={props.form.dayWeekNumber}
                            >
                                <Select.Option value={0}>Segunda-feira</Select.Option>
                                <Select.Option value={1}>Terça-feira</Select.Option>
                                <Select.Option value={2}>Quarta-feira</Select.Option>
                                <Select.Option value={3}>Quinta-feira</Select.Option>
                                <Select.Option value={4}>Sexta-feira</Select.Option>
                                <Select.Option value={5}>Sábado</Select.Option>
                                <Select.Option value={6}>Domingo</Select.Option>
                            </Select>
                        </Form.Item>

                        {/* <Form.Item
                            label="Nome"
                            style={{ width: 500 }}
                        >
                            <Input
                                value={props.form.name}
                                onChange={e => props.setForm({ ...props.form, name: e.target.value })}
                            />
                        </Form.Item> */}

                    </Form>

                    <Divider />

                    <Button
                        type='primary'
                        disabled={!props.form.name}
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