import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';
import env from '../../../env.json';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Components
import FormView from './FormView';

const FormContainer = (props) => {

    props = props.parent_props;

    /**
     * Set form.
     */
    const [form, setForm] = useState({ title: '', abstract: '', img: '', imgThumb: '', body: '' });

    const [idToUpdate, setIdToUpdate] = useState(null);
    useEffect(() => {

        /**
         * Get data to update.
         */
        async function getDataToUpdate(id) {
            // Call API.
            let apiResponse = await fetch(`${env.api_url}/bonus/${id}`,
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
                    title: apiResponse.data['title'],
                    abstract: apiResponse.data['abstract'],
                    img: apiResponse.data['img'],
                    body: apiResponse.data['body'],
                })

                // Put img in thumb
                const storage = getStorage();
                const imgUrl = await getDownloadURL(ref(storage, `bonus/${apiResponse.data['title']}`));
                document.getElementById('bonus-img-file-thumb').src = imgUrl;


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
        let endpoint = idToUpdate ? `${env.api_url}/bonus/${idToUpdate}` : `${env.api_url}/bonus`;

        let imgUrl = form.img;
        if (typeof imgUrl !== 'string') {
            // Put img in firebase and get download url
            const storage = getStorage();
            const storageRef = ref(storage, `bonus/${form.title}`);
            await uploadBytes(storageRef, form.img);
            imgUrl = await getDownloadURL(ref(storage, `bonus/${form.title}`));
        }

        let formToAdd = {
            title: form.title,
            abstract: form.abstract,
            img: imgUrl,
            body: form.body,
        }

        // Call API.
        let apiResponse = await fetch(endpoint,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
                },
                method: method,
                body: JSON.stringify(formToAdd)
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
            props.history.push('/home/bonus');

        } else {

            setLoadingSaveButton(false);
            message.error(apiResponse.message);

        }
    }

    return (

        <FormView
            idToUpdate={idToUpdate}

            form={form}
            setForm={form => setForm({ ...form })}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;