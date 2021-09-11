import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
                            <Link to='/home/bonus'>Bônus</Link>
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
                            label="Título"
                        >
                            <Input
                                value={props.form.title}
                                onChange={e => props.setForm({ ...props.form, title: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Texto"
                        >
                            <ReactQuill
                                theme="snow"
                                value={props.form.body}
                                onChange={e => props.setForm({ ...props.form, body: e })}
                                modules={{
                                    toolbar: [
                                        [{ 'size': ['small', false, 'large', 'huge'] }],
                                        ['bold', 'italic', 'underline'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        [{ 'align': [] }],
                                        [{ 'color': [] }],
                                        ['clean']
                                    ]
                                }}
                                formats={[
                                    'size',
                                    'bold', 'italic', 'underline',
                                    'list', 'bullet',
                                    'align',
                                    'color',
                                ]}
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