import React, { useState } from 'react';

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
    const [ form, setForm ] = useState({ name: '', icon: '' });

    /**
     * Save.
     */
    const [ loadingSaveButton, setLoadingSaveButton ] = useState(false);
    const save = async () => {

        setLoadingSaveButton(true);

        // Changing the name of the image
        let icon = form.icon;
        let blob = icon.slice(0, icon.size, icon.type); 
        let imageWithNewName = new File([blob], `${form.name}`, { type: icon.type });
        
        // Create form to save.
        let Form = new FormData();
        Form.append('name', form.name);
        Form.append('image', imageWithNewName);
        
        // Call API.
        let apiResponse = await fetch(`${env.api_url}/room-tasks`, 
        { 
            headers: {
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
            },
            method: 'POST',
            body: Form
        });
        apiResponse = await apiResponse.json();

        // Check if response was successfuly
        if(apiResponse.code === 200){

            message.success('Registro criado com sucesso');
            setLoadingSaveButton(false);
            props.history.push('/home/room-tasks');
            
        } else {
            
            setLoadingSaveButton(false);
            message.error(apiResponse.message);
            
        }
    }

    return(

        <FormView
            form={form}
            setForm={form => setForm({ ...form })}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;