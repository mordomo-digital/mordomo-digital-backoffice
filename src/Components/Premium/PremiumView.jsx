import React from 'react';
import './PremiumStyle.css';
import icon from '../../assets/img/icon.png';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';

const PremiumView = (props) => {
    return (
        <div className='premiumBody'>
            <div className='premiumTopBar'>
                <img src={icon} alt='icon' className='premiumIcon' />
            </div>
            <div style={{ 'background': '#d5d4df', 'height': '10px' }}>

            </div>
            <div className='premiumTopBarTextDiv'>Mordomo Digital</div>

            <div className='premiumMiddle'>
                <div className='premiumMiddleTextDiv'>Assinatura<br />Premium</div>
                <div className='premiumSupportText'>
                    Com a assinatura Premium você tem acesso a funcionalidades extras do Mordomo Digital como editar cômodos e compartilhar tarefas.
                </div>

                <div style={{ height: '30px' }} />

                <div className='premiumPriceText' onClick={() => props.selectPlan('month')}>
                    <Checkbox checked={props.plan === 'month'} onChange={() => props.selectPlan('month')} /> R$12,69  <span style={{ fontSize: 'small', fontWeight: 'normal', color: 'gray' }}> / plano mensal</span>
                </div>
                <div className='premiumPriceText' onClick={() => props.selectPlan('year')}>
                    <Checkbox checked={props.plan === 'year'} onChange={() => props.selectPlan('year')} /> R$126,90 <span style={{ fontSize: 'small', fontWeight: 'normal', color: 'gray' }}> / plano anual</span>
                </div>
            </div>
            <div style={{ height: '10vh', background: 'white' }} />

            <LoadingButton
                variant="outlined"
                size="large"
                fullWidth
                style={{ position: 'absolute', width: '90%', margin: '5%', bottom: '0px' }}
                loading={props.loading}
                loadingPosition="start"
                startIcon={<div />}
                onClick={() => props.subscribe()}
            >Assinar</LoadingButton>
        </div>
    )
}

export default PremiumView;