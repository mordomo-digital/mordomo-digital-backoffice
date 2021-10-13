import React from 'react';
import Cards from 'react-credit-cards';
import './PremiumStyle.css';
import icon from '../../assets/img/icon.png';
import InputMask from "react-input-mask";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
                    <div style={{ height: '20px' }} />

                    <div className='premiumCardInfo'>
                        <InputMask
                            mask="9999 9999 9999 9999"
                            disabled={false}
                            maskChar=" "
                            value={props.card.number}
                            onChange={e => props.setCard({ ...props.card, number: e.target.value })}
                            onFocus={e => props.setCard({ ...props.card, focus: 'number' })}
                        >
                            {(inputProps) =>
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
                                    {...inputProps}
                                />
                            }
                        </InputMask>
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
                                onFocus={e => props.setCard({ ...props.card, focus: 'name' })}
                            />
                            <div style={{ height: '20px' }} />

                            <InputMask
                                mask="99/99"
                                disabled={false}
                                maskChar=" "
                                value={props.card.expiry}
                                onChange={e => props.setCard({ ...props.card, expiry: e.target.value })}
                                onFocus={e => props.setCard({ ...props.card, focus: 'expiry' })}
                            >
                                {(inputProps) =>
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
                                        {...inputProps}
                                    />
                                }
                            </InputMask>

                            <InputMask
                                mask="9999"
                                disabled={false}
                                maskChar=" "
                                value={props.card.cvc}
                                onChange={e => props.setCard({ ...props.card, cvc: e.target.value })}
                                onFocus={e => props.setCard({ ...props.card, focus: 'cvc' })}
                            >
                                {(inputProps) =>
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
                                        {...inputProps}
                                    />
                                }
                            </InputMask>

                            <Divider />

                            <TextField
                                id="outlined-basic"
                                label="Cupom de desconto"
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
                            />

                            <Divider />

                            <div style={{ textAlign: 'center' }}>
                                <div className='premiumSubTitle'>Total: R$ 10,58 <span style={{ fontSize: 'x-small' }}>/ mês</span></div>
                            </div>

                            <Divider />

                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                            >Assinar</Button>
                            <div style={{ height: '20px' }} />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PremiumView;