import React from 'react';
import Cards from 'react-credit-cards';
import './PremiumStyle.css';
import icon from '../../assets/img/icon.png';
import TextField from '@mui/material/TextField';
import { Divider } from 'antd';

const PremiumView = (props) => {
    return (
        <div>
            <div className='premiumBody'>

                <div className='premiumHeader'>
                    <img src={icon} alt='icon' className='premiumIcon' />
                    <div className='premiumTitle'>Assinatura Premium</div>
                    <div className='premiumSubTitle'>R$ 10,58 <span style={{ fontSize: 'x-small' }}>/ mês</span></div>
                    <div className='premiumSupportText'>
                        Com a assinatura Premium você tem acesso a funcionalidades extras do Mordomo Digital como editar cômodos e compartilhar tarefas.
                    </div>

                    <Divider />
                </div>

                <div id="PaymentForm">
                    <Cards
                        cvc={props.card.cvc}
                        expiry={props.card.expiry}
                        focused={props.card.focus}
                        name={props.card.name}
                        number={props.card.number}
                        placeholders={{
                            name: 'NOME'
                        }}
                    />

                    <div className='premiumCardInfo'>
                        <TextField
                            id="outlined-basic"
                            label="Número do cartão"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: {
                                    fontFamily: "Poiret One"
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    fontFamily: "Poiret One"
                                },
                            }}
                            value={props.card.number}
                            onChange={e => props.setCard({ ...props.card, number: e.target.value })}
                            onFocus={e => props.setCard({ ...props.card, focus: e.target.name })}
                        />
                        <div style={{ height: '20px' }} />

                        <form>

                            <TextField
                                id="outlined-basic"
                                label="Nome"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    style: {
                                        fontFamily: "Poiret One"
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: "Poiret One"
                                    },
                                }}
                                value={props.card.name}
                                onChange={e => props.setCard({ ...props.card, name: e.target.value })}
                                onFocus={e => props.setCard({ ...props.card, focus: e.target.name })}
                            />
                            <div style={{ height: '20px' }} />

                            <TextField
                                id="outlined-basic"
                                label="Validade"
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        fontFamily: "Poiret One"
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: "Poiret One"
                                    },
                                }}
                                style={{ width: '49%' }}
                                value={props.card.expiry}
                                onChange={e => props.setCard({ ...props.card, expiry: e.target.value })}
                                onFocus={e => props.setCard({ ...props.card, focus: e.target.name })}
                            />
                            <TextField
                                id="outlined-basic"
                                label="CVC"
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        fontFamily: "Poiret One"
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: "Poiret One"
                                    },
                                }}
                                style={{ width: '49%', float: 'right' }}
                                value={props.card.cvc}
                                onChange={e => props.setCard({ ...props.card, cvc: e.target.value })}
                                onFocus={e => props.setCard({ ...props.card, focus: e.target.name })}
                            />
                            <div style={{ height: '20px' }} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PremiumView;