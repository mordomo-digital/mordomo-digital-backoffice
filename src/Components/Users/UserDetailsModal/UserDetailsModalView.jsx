import { Modal, Button } from "antd";
import { Link } from 'react-router-dom';
import React from "react";

import './UserDetailsModalStyle.css'

const UserDetailsModalView = (props) => {

    const translateUserType = (userType) => {
        switch (userType) {
            case 'free':
                return 'Gratuito'
            case 'premium':
                return 'Premium'
            default:
                return ''
        }
    }

    const getDate = (date) => {
        if (date) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return (new Date(date)).toLocaleDateString('pt-BR', options)
        }

        return null
    }

    return (
        <div>
            <span
                className="user-details-modal-view-tag"
                onClick={() => props.openCloseModal(true)}
            >
                Visualizar
            </span>

            <Modal
                visible={props.modalVisible}
                onCancel={() => props.openCloseModal(false)}
                closable={true}
                footer={[
                    <Link
                        to={{
                            pathname: `/home/users/update`,
                            state: {
                                id: props.userData._id
                            }
                        }}
                    >Editar</Link>,
                    <Link to={{ pathname: `https://mordomo-digital-api-sks6r2zpma-uc.a.run.app/pdf-schedule/${props.userData._id}` }} target='_blank'>
                        <Button className="user-details-modal-ok-button">Cronograma (PDF)</Button>
                    </Link>,
                    <Button className="user-details-modal-ok-button" type="primary" onClick={() => props.openCloseModal(false)}>Ok</Button>
                ]}
                title={
                    <div>
                        Usuário: {props.userData.email || ''} ({props.userData.username})<br />
                        <span className="user-details-modal-usertype-tag">{translateUserType(props.userData.userType)}</span>
                    </div>
                }
            >
                <h3>Dados Pessoais</h3><br />
                Tem empregada doméstica? <strong>{(props.userData.personalData && props.userData.personalData.hasHousekeeper ? 'Sim' : 'Não') || 'Não'}</strong><br /><br />
                Estado onde mora: <strong>{(props.userData.personalData && props.userData.personalData.state) || ''}</strong><br /><br />
                Faixa etária: <strong>{(props.userData.personalData && props.userData.personalData.ageGroup) || ''}</strong><br /><br />
                Telefone: <strong>{(props.userData.personalData && props.stringToPhone(props.userData.personalData.phone)) || ''}</strong><br /><br />

                {
                    props.userData.userType === 'premium' ?
                        <div>
                            <br /><h3>Dados da Compra</h3><br />
                            Compra feita via: <strong>{(props.userData && props.userData.premiumIAPId) ? 'Loja de apps' : 'Mercado Pago'}</strong><br /><br />
                            Renova em: <strong>{getDate(props.userData.premiumValidatedDate) || 'Não identificado'}</strong><br /><br />
                        </div> : null
                }
            </Modal>
        </div>
    )
}

export default UserDetailsModalView