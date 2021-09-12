import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

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
                    title='Bônus'
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
                                disabled={props.idToUpdate ? true : false}
                                onChange={e => props.setForm({ ...props.form, title: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Imagem"
                        >

                            <Button
                                icon={<UploadOutlined />}
                                onClick={() => document.getElementById('bonus-img-file').click()}
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
                                            id='bonus-img-file-thumb'
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
                                id='bonus-img-file'
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
                                        document.getElementById('bonus-img-file-thumb').src = oFREvent.target.result;
                                    };
                                }}
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