import React from 'react';

import { Spin, Input, Button } from 'antd';

// Images
import success from '../../assets/img/success.png'
import erro from '../../assets/img/erro.png'

const RecoverPassView = (props) => {

    return (

        <div style={{ paddingTop: '30vh', }}>

            <div
                style={{
                    width: '90%',
                    maxWidth: '400px',
                    height: '200px',
                    margin: 'auto',
                    textAlign: 'center',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px'
                }}
            >
                {
                    props.success ?
                        <div>
                            <img src={success} alt='success' width={100} />
                            <h2 style={{ marginBottom: '0px', marginTop: '10px' }}>Senha alterada com sucesso!</h2>

                            <p>
                                Retorne ao app e faça o login.
                            </p>
                        </div> :
                        <div>
                            <h2>Alterar senha</h2>
                            <div style={{ marginTop: '-15px', marginBottom: '15px', fontSize: 'smaller', color: 'gray' }}>Mordomo Digital</div>

                            <div style={{ fontSize: 'smaller', textAlign: 'left', marginBottom: '5px', marginLeft: '10px', marginTop: '10px' }}>
                                Informe uma nova senha
                            </div>
                            <Input.Password placeholder="Nova senha" onChange={e => props.setNewPass(e.target.value)} />

                            <Button type="primary" shape="round" loading={props.isLoading} style={{ marginTop: '20px', width: '100%' }} onClick={() => props.updatePass()}>
                                Alterar
                            </Button>
                        </div>
                }

            </div>

        </div>

    )

};

export default RecoverPassView;