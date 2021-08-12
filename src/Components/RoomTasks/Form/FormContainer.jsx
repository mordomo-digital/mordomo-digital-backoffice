import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';
import env from '../../../env.json';

// Components
import FormView from './FormView';

const FormContainer = (props) => {

    props = props.parent_props;

    /**
     * Set form.
     */
    const [form, setForm] = useState({ name: '', defaultFrequency: [] });

    const [roomTypes, setRoomTypes] = useState([]);

    const [idToUpdate, setIdToUpdate] = useState(null);
    useEffect(() => {

        /**
         * Get data to update.
         */
        async function getDataToUpdate(id, localRoomTypes) {

            // Call API.
            let apiResponse = await fetch(`${env.api_url}/room-tasks/${id}`,
                {
                    headers: {
                        'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                    },
                    method: 'GET',
                });
            apiResponse = await apiResponse.json();

            // Check if response was successfuly
            if (apiResponse.code === 200) {

                setForm({
                    name: apiResponse.data['name'],
                    defaultFrequency: apiResponse.data['defaultFrequency'],
                })

                let arrayOfRoomTypes = [];
                let arrayOfDefaultFrequency = [];
                for (let index = 0; index < localRoomTypes.length; index++) {
                    if (localRoomTypes[index]['tasks'].includes(id)) {
                        let roomTypeToAdd = {
                            roomId: localRoomTypes[index]['_id'],
                            roomName: localRoomTypes[index]['name'],
                        };
                        arrayOfRoomTypes.push(roomTypeToAdd);

                        if (apiResponse.data['defaultFrequency'].length === 0) {
                            arrayOfDefaultFrequency.push({
                                roomType: localRoomTypes[index]['_id'],
                                frequency: '',
                                weekdays: [],
                                day: '',
                                date: undefined,
                                weekOfTheMonth: '',
                            });
                        }
                    }
                }
                setRoomTypes([...arrayOfRoomTypes]);
                if (apiResponse.data['defaultFrequency'].length === 0) {
                    setForm({
                        name: apiResponse.data['name'],
                        defaultFrequency: arrayOfDefaultFrequency
                    });
                }

            } else {

                message.error(apiResponse.message);

            }
        }

        /**
         * Check if update or create form
         */
        if (props.location.state) {
            setIdToUpdate(props.location.state.id)
            getDataToUpdate(props.location.state.id, props.location.state.roomTypes);
        }
    }, [props.location.state])

    /**
     * Save.
     */
    const [loadingSaveButton, setLoadingSaveButton] = useState(false);
    const save = async () => {
        setLoadingSaveButton(true);

        // Method
        let method = idToUpdate ? 'PUT' : 'POST';
        let endpoint = idToUpdate ? `${env.api_url}/room-tasks/${idToUpdate}` : `${env.api_url}/room-tasks`;

        // Create form to save.
        let Form = new FormData();
        Form.append('name', form.name);
        Form.append('defaultFrequency', JSON.stringify(form.defaultFrequency));

        // Call API.
        let apiResponse = await fetch(endpoint,
            {
                headers: {
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
                },
                method: method,
                body: Form
            });
        apiResponse = await apiResponse.json();

        // Check if response was successfuly
        if (apiResponse.code === 200) {

            message.success(
                idToUpdate ?
                    'Registro atualizado com sucesso' :
                    'Registro criado com sucesso'
            );
            setLoadingSaveButton(false);
            props.history.push('/home/room-tasks');

        } else {

            setLoadingSaveButton(false);
            message.error(apiResponse.message);

        }
    }

    return (

        <FormView
            idToUpdate={idToUpdate}
            roomTypes={roomTypes}

            form={form}
            setForm={form => setForm({ ...form })}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;