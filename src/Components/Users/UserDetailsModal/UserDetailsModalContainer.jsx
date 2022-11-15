import React from 'react'
import { useState } from 'react';
import UserDetailsModalView from './UserDetailsModalView'

const UserDetailsModalContainer = (props) => {

    const [detailsModal, setDetailsModal] = useState(false)
    const [generatePDFButtonLoading, setGeneratePDFButtonLoading] = useState(false)

    return (
        <UserDetailsModalView
            modalVisible={detailsModal}
            openCloseModal={e => setDetailsModal(e)}
            userData={(props && props.userData) || {}}
            stringToPhone={e => props.stringToPhone(e)}

            generatePDFButtonLoading={generatePDFButtonLoading}
            setGeneratePDFButtonLoading={(value) => setGeneratePDFButtonLoading(value)}
        />
    )
}

export default UserDetailsModalContainer