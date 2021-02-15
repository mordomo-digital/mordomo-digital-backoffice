import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';
import env from '../../../env.json';

// Components
import FormView from './FormView';

const FormContainer = (props) => {
    
    props = props.parent_props;
    
    /**
     * Get tasks.
     */
    const [ tasks, setTasks ] = useState([]);
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
        if(apiResponse.code === 200){
            
            setTasks([...apiResponse.data]);
            
        } else {
            
            message.error(apiResponse.message);
            
        }
        
    };
    
    /**
     * Get market itens.
     */
    const [ marketItens, setMarketItens ] = useState([]);
    const getMarketItens = async () => {
        
        // Call API
        let apiResponse = await fetch(`${env.api_url}/room-market-itens`, 
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
        if(apiResponse.code === 200){
            
            setMarketItens([...apiResponse.data]);
            
        } else {
            
            message.error(apiResponse.message);
            
        }
        
    };

    useEffect(() => {
        
        getTasks();
        getMarketItens();
        
    }, []);

    /**
     * Set form.
     */
    const [ form, setForm ] = useState({ name: '', icon: '', marketItens: [], tasks: [] });

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
        Form.append('marketItens', JSON.stringify(form.marketItens));
        Form.append('tasks', JSON.stringify(form.tasks));
        
        // Call API.
        let apiResponse = await fetch(`${env.api_url}/room-types`, 
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
            props.history.push('/home/room-types');
            
        } else {
            
            setLoadingSaveButton(false);
            message.error(apiResponse.message);
            
        }
    }

    return(

        <FormView
            tasks={tasks}
            marketItens={marketItens}
            
            form={form}
            setForm={form => setForm({ ...form })}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;