import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Select, Input, Button, Divider, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { MinusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

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

                        <Form.Item
                            label="Tarefa"
                            style={{ width: 500, float: 'left' }}
                        >
                            <Input
                                value={props.taskToAdd}
                                onChange={e => props.setTaskToAdd(e.target.value)}
                            />
                        </Form.Item>

                        <Button
                            type='primary'
                            style={{ float: 'left', marginTop: '30px', marginLeft: '10px' }}
                            onClick={() => {
                                let tasksUpdated = props.tasks;
                                tasksUpdated.push(props.taskToAdd);
                                props.setTasks(tasksUpdated);
                                props.setTaskToAdd(null);
                            }}
                        >
                            Adicionar Tarefa
                        </Button>

                        <div style={{ clear: 'both' }} />

                        <ul>
                            {
                                props.tasks.map((task, i) => {
                                    return (
                                        <li>
                                            {task}
                                            <MinusCircleOutlined
                                                style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                                                onClick={() => {

                                                    Modal.confirm({
                                                        title: 'Tem certeza que deseja excluir esse registro?',
                                                        icon: <ExclamationCircleOutlined />,
                                                        content: 'Essa ação não poderá ser desfeita',
                                                        okText: 'Sim',
                                                        okType: 'danger',
                                                        cancelText: 'Não',
                                                        onOk() {
                                                            let tasksUpdated = [...props.tasks];
                                                            tasksUpdated.splice(i, 1);
                                                            props.setTasks([...tasksUpdated]);
                                                        },
                                                    });

                                                }}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </Form>

                    <Divider />

                    <Button
                        type='primary'
                        disabled={!props.form.dayWeekNumber && !props.tasks.length}
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