import React, {useState} from 'react';

// Modules
import { Card, Breadcrumb, Form, Select, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';

// Style
import './FormStyle.css';

const FormView = (props) => {
    const [filteredTasksOptions, setFilteredTasksOptions] = useState(null);

    return (

        <div className='home-out-card'>

            <div className='home-in-card'>

                <Card
                    title='Cronograma Express v2 - Serviços diários'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            <Link to='/home/cleaning-schedule-day'>Cronograma Express v2 - Serviços diários</Link>
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
                            label="Dia da semana sugerido"
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
                                label="Tarefas"
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Escolha..."
                                    value={props.form.tasks}
                                    onChange={e => {
                                        props.setForm({ ...props.form, tasks: e })
                                        setFilteredTasksOptions(props.tasks);
                                    }}
                                    showSearch
                                    onSearch={value => {
                                        setFilteredTasksOptions(props.tasks.filter(
                                            option => option.name.toLowerCase().includes(value.toLowerCase())
                                        ));
                                    }}
                                    filterOption={false}
                                >
                                    {
                                        (filteredTasksOptions ?? props.tasks).map((el, i) => {
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