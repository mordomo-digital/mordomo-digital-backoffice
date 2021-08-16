import React from 'react';

import { Spin } from 'antd';

// Images
import success from '../../assets/img/success.png'
import erro from '../../assets/img/erro.png'

const VerifyUserView = (props) => {

    return (

        <div>

            <div
                style={{
                    width: 400,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-100px 0 0 -150px',
                    textAlign: 'center',
                    color: 'white'
                }}
            >
                {
                    props.isLoading ?
                        <Spin style={{ color: 'white' }} tip="Verificando e-mail" /> : null
                }

                {
                    !props.isLoading && props.success ?
                        <div>
                            <img src={success} alt='success' width={100} />
                            <h1 style={{ color: 'white', marginBottom: '0px' }}>E-mail verificado!</h1>

                            <p>
                                Retorne ao app e faça o login.
                            </p>
                        </div> : null
                }

                {
                    !props.isLoading && !props.success ?
                        <div>
                            <img src={erro} alt='success' width={100} />
                            <h1 style={{ color: 'white', marginBottom: '0px' }}>E-mail não verificado!</h1>

                            <p>
                                Sessão expirada, retorne ao app e escolha a opção de reenvio de e-mail de verificação.
                            </p>
                        </div> : null
                }

            </div>

        </div>

    )

};

export default VerifyUserView;