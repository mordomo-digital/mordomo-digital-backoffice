import React from 'react'
import { useState } from 'react';
import UserDetailsModalView from './UserDetailsModalView'

const UserDetailsModalContainer = (props) => {

    const [detailsModal, setDetailsModal] = useState(false)

    return (
        <UserDetailsModalView
            modalVisible={detailsModal}
            openCloseModal={e => setDetailsModal(e)}
            userData={(props && props.userData) || {}}
            stringToPhone={e => props.stringToPhone(e)}
        />
    )
}

export default UserDetailsModalContainer