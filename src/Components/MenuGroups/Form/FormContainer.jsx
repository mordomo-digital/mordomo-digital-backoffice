import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';
import env from '../../../env.json';

// Components
import FormView from './FormView';

const FormContainer = (props) => {

    props = props.parent_props;

    const meals = [
        { 'value': 'a_breakfast', 'label': 'Café da manhã' },
        { 'value': 'b_morningsnack', 'label': 'Lanche da manhã' },
        { 'value': 'c_lunch', 'label': 'Almoço' },
        { 'value': 'd_afternoonsnack', 'label': 'Lanche da tarde' },
        { 'value': 'e_dinner', 'label': 'Jantar' },
        { 'value': 'f_eveningsnack', 'label': 'Lanche da noite' },
    ];

    /**
     * Set form.
     */
    const [form, setForm] = useState({ name: '', icon: '', options: [], meals: [] });

    const [idToUpdate, setIdToUpdate] = useState(null);
    useEffect(() => {

        /**
         * Get data to update.
         */
        async function getDataToUpdate(id) {
            // Call API.
            let apiResponse = await fetch(`${env.api_url}/menu-groups/${id}`,
                {
                    headers: {
                        'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                    },
                    method: 'GET',
                });
            apiResponse = await apiResponse.json();

            // Check if response was successfuly
            if (apiResponse.code === 200) {

                await getOptions();

                setForm({
                    name: apiResponse.data['name'],
                    options: apiResponse.data['options'].map(el => el._id),
                    meals: apiResponse.data['meals'],
                    icon: apiResponse.data['icon'].data ? apiResponse.data['icon'] : null,
                    iconThumb: apiResponse.data['icon'].data ? `data:image/png;base64,${arrayBufferToBase64(apiResponse.data['icon'].data.data)}` : null,
                });

            } else {

                message.error(apiResponse.message);

            }
        }

        /**
         * Check if update or create form
         */
        if (props.location.state) {
            setIdToUpdate(props.location.state.id)
            getDataToUpdate(props.location.state.id);
        } else {
            getOptions();
        }
    }, [props.location.state])

    /**
     * Get tasks.
     */
    const [options, setOptions] = useState([]);
    const getOptions = async () => {

        // Call API
        let apiResponse = await fetch(`${env.api_url}/menu-options/user/000000000000000000000000`,
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

            setOptions([...apiResponse.data]);

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
        let endpoint = idToUpdate ? `${env.api_url}/menu-groups/${idToUpdate}` : `${env.api_url}/menu-groups`;

        // Changing the name of the image
        let imageWithNewName = null;
        let icon = form.icon;
        if (!icon['data']) {
            let blob = icon.slice(0, icon.size, icon.type);
            imageWithNewName = new File([blob], `${form.name}`, { type: icon.type });
        }

        // Create form to save.
        let Form = new FormData();
        Form.append('name', form.name);
        Form.append('image', imageWithNewName);
        Form.append('options', JSON.stringify(form.options));
        Form.append('meals', JSON.stringify(form.meals));

        // Call API.
        let apiResponse = await fetch(endpoint,
            {
                headers: {
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
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
            props.history.push('/home/menu-groups');

        } else {

            setLoadingSaveButton(false);
            message.error(apiResponse.message);

        }
    }

    /**
     * Transform buffer to base64 to render a image from mongodb
     * @param {*} buffer 
     */
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    return (

        <FormView
            idToUpdate={idToUpdate}

            options={options}
            meals={meals}

            form={form}
            setForm={form => setForm({ ...form })}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;