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
    const [ form, setForm ] = useState({ name: '', type: '' });

    /**
     * Save.
     */
    const [ loadingSaveButton, setLoadingSaveButton ] = useState(false);
    const save = async () => {

        setLoadingSaveButton(true);
        
        // Call API.
        let apiResponse = await fetch(`${env.api_url}/room-market-itens`, 
        { 
            headers: {
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(form)
        });
        apiResponse = await apiResponse.json();

        // Check if response was successfuly
        if(apiResponse.code === 200){

            message.success('Registro criado com sucesso');
            setLoadingSaveButton(false);
            props.history.push('/home/room-market-itens');
            
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