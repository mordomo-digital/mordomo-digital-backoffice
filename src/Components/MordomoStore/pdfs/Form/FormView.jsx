import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider, Select, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

// Style
import './FormStyle.css';

const FormView = (props) => {


    return (

        <div className='home-out-card'>

            <div className='home-in-card'>

                <Card title='Mordomo Store - PDFs'>

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            <Link to='/home/mordomo-store/pdf'>Mordomo Store - PDFs</Link>
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
                            label="Imagem"
                        >

                            <Button
                                icon={<UploadOutlined />}
                                onClick={() => document.getElementById('mordomo-store-pdf-img-file').click()}
                                style={{ marginBottom: '10px' }}
                            >
                                Enviar imagem
                            </Button><br />

                            {
                                props.form.img ?
                                    <Card
                                        style={{
                                            color: '#6495ED',
                                            fontSize: 12
                                        }}
                                    >
                                        <img
                                            alt='thumb'
                                            id='mordomo-store-pdf-img-file-thumb'
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
                                                onClick={() => props.setForm({ ...props.form, img: '' })}
                                            />
                                        </div>
                                    </Card> : null
                            }

                            <input
                                type='file'
                                id='mordomo-store-pdf-img-file'
                                style={{ display: 'none' }}
                                // accept='image/x-png'
                                onChange={e => {
                                    let filesArray = e.target.files;
                                    let file = filesArray[filesArray.length - 1];

                                    // Set thumbnail
                                    var fileReader = new FileReader();
                                    fileReader.readAsDataURL(file);
                                    fileReader.onload = function (oFREvent) {
                                        props.setForm({ ...props.form, img: file, imgThumb: oFREvent.target.result });
                                        document.getElementById('mordomo-store-pdf-img-file-thumb').src = oFREvent.target.result;
                                    };
                                }}
                            />

                        </Form.Item>

                        <Form.Item label="Título">
                            <Input
                                value={props.form.title}
                                onChange={e => props.setForm({ ...props.form, title: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item label="Descrição">
                            <Input
                                value={props.form.description}
                                onChange={e => props.setForm({ ...props.form, description: e.target.value })}
                            />
                        </Form.Item>
                        
                        <Form.Item label="Link para compra (usuário free)">
                            <Input
                                value={props.form.linkToBuy}
                                onChange={e => props.setForm({ ...props.form, linkToBuy: e.target.value })}
                            />
                        </Form.Item>
                        
                        <Form.Item label="Link para baixar de graça (usuário premium)">
                            <Input
                                value={props.form.linkToGet}
                                onChange={e => props.setForm({ ...props.form, linkToGet: e.target.value })}
                            />
                        </Form.Item>
                        
                        <Form.Item label="Preço">
                            <InputNumber
                                style={{ width: 250 }}
                                value={props.form.price}
                                onChange={e => props.setForm({ ...props.form, price: e })}
                            />
                        </Form.Item>
                        
                        <Form.Item label="Status">
                            <Select
                                style={{ width: 250 }}
                                onChange={e => props.setForm({ ...props.form, status: e })}
                                value={props.form.status}
                            >
                                <Select.Option value='available'>Disponível</Select.Option>
                                <Select.Option value='unavailable'>Indisponível</Select.Option>
                                <Select.Option value='soon'>Em breve</Select.Option>
                            </Select>
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