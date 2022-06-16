import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider, Select } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

// Style
import './FormStyle.css';

const FormView = (props) => {


    return (

        <div className='home-out-card'>

            <div className='home-in-card'>

                <Card
                    title='Cardápio - Grupos'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            <Link to='/home/menu-groups'>Cardápio - Grupos</Link>
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
                            label="Ícone"
                        >

                            <Button
                                icon={<UploadOutlined />}
                                onClick={() => document.getElementById('room-types-img-file').click()}
                                style={{ marginBottom: '10px' }}
                            >
                                Enviar icone
                            </Button><br />

                            {
                                props.form.icon ?
                                    <Card
                                        style={{
                                            color: '#6495ED',
                                            fontSize: 12
                                        }}
                                    >
                                        <img
                                            alt='thumb'
                                            id='room-types-img-file-thumb'
                                            style={{
                                                height: 50,
                                                marginRight: 10
                                            }}
                                            src={props.form.iconThumb}
                                        />

                                        <div
                                            style={{
                                                float: 'right',
                                                lineHeight: 5
                                            }}
                                        >
                                            <DeleteOutlined
                                                style={{
                                                    color: 'red',
                                                    cursor: 'pointer',
                                                    fontSize: 14,
                                                }}
                                                onClick={() => props.setForm({ ...props.form, icon: '' })}
                                            />
                                        </div>
                                    </Card> : null
                            }

                            <input
                                type='file'
                                id='room-types-img-file'
                                style={{ display: 'none' }}
                                accept='image/x-png'
                                onChange={e => {
                                    let filesArray = e.target.files;
                                    let file = filesArray[filesArray.length - 1];

                                    // Set thumbnail
                                    var fileReader = new FileReader();
                                    fileReader.readAsDataURL(file);
                                    fileReader.onload = function (oFREvent) {
                                        props.setForm({ ...props.form, icon: file, iconThumb: oFREvent.target.result });
                                    };
                                }}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Opções"
                        >
                            <Select
                                mode="multiple"
                                placeholder="Escolha..."
                                value={props.form.options}
                                onChange={e => props.setForm({ ...props.form, options: e })}
                            >
                                {
                                    props.options.map((el, i) => {
                                        return (
                                            <Select.Option key={i} value={el._id}>
                                                {el.name}
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Refeições"
                        >
                            <Select
                                mode="multiple"
                                placeholder="Escolha..."
                                value={props.form.meals}
                                onChange={e => props.setForm({ ...props.form, meals: e })}
                            >
                                {
                                    props.meals.map((el, i) => {
                                        return (
                                            <Select.Option key={i} value={el.value}>
                                                {el.label}
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