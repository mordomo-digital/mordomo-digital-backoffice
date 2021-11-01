import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';
import env from '../../../env.json';

// Components
import FormView from './FormView';

const FormContainer = (props) => {

    props = props.parent_props;

    // Loading screen
    const [loadingScreen, setLoadingScreen] = useState(false);

    /**
     * Set form.
     */
    const [form, setForm] = useState({ name: '', tasks: [], isAPremiumRoomType: false, });

    const [idToUpdate, setIdToUpdate] = useState(null);
    useEffect(() => {

        /**
         * Get data to update.
         */
        async function getDataToUpdate(id) {
            // Call API.
            let apiResponse = await fetch(`${env.api_url}/room-types/${id}`,
                {
                    headers: {
                        'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                    },
                    method: 'GET',
                });
            apiResponse = await apiResponse.json();

            // Check if response was successfuly
            if (apiResponse.code === 200) {

                await getTasks();
                setForm({
                    name: apiResponse.data['name'],
                    tasks: apiResponse.data['tasks'].map(el => el._id),
                    isAPremiumRoomType: apiResponse.data['isAPremiumRoomType'],
                })

            } else {

                message.error(apiResponse.message);

            }

            setLoadingScreen(false);
        }

        /**
         * Check if update or create form
         */
        if (props.location.state) {
            setLoadingScreen(true);
            setIdToUpdate(props.location.state.id)
            getDataToUpdate(props.location.state.id);
        } else {
            getTasks();
        }
    }, [props.location.state])

    /**
     * Get tasks.
     */
    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {

        // Call API
        let apiResponse = await fetch(`${env.api_url}/room-tasks`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
                },
                method: 'GET',
            });
        apiResponse = await apiResponse.json();

        // Check if response was successfuly
        if (apiResponse.code === 200) {

            setTasks([...apiResponse.data]);

        } else {

            message.error(apiResponse.message);

        }

    };

    /**
     * Save.
     */
    const [loadingSaveButton, setLoadingSaveButton] = useState(false);
    const save = async () => {

        setLoadingSaveButton(true);

        // Method
        let method = idToUpdate ? 'PUT' : 'POST';
        let endpoint = idToUpdate ? `${env.api_url}/room-types/${idToUpdate}` : `${env.api_url}/room-types`;

        // Create form to save.
        let Form = {};
        Form['name'] = form.name;
        Form['tasks'] = JSON.stringify(form.tasks);
        Form['isAPremiumRoomType'] = form.isAPremiumRoomType;

        // Call API.
        let apiResponse = await fetch(endpoint,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
                },
                method: method,
                body: JSON.stringify(Form)
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
            props.history.push('/home/room-types');

        } else {

            setLoadingSaveButton(false);
            message.error(apiResponse.message);

        }
    }

    return (

        <FormView
            idToUpdate={idToUpdate}

            tasks={tasks}

            form={form}
            setForm={form => setForm({ ...form })}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}

            loadingScreen={loadingScreen}
        />

    )

}

export default FormContainer;