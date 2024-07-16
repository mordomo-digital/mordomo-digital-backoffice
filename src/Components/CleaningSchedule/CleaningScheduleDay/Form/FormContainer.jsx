import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';


// Components
import FormView from './FormView';
import { apiRequestGet } from '../../../../utils/api-request';

const FormContainer = (props) => {

    props = props.parent_props;

    const [idToUpdate, setIdToUpdate] = useState(null);
    useEffect(() => {

        /**
         * Get data to update.
         */
        async function getDataToUpdate(id) {
            // Call API.
            let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/cleaning-schedule/one/${id}`,
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
                    dayWeekNumber: apiResponse.data['dayWeekNumber'],
                    tasks: apiResponse.data['schedule'][0]['tasks'].map(el => el.task?._id),
                });

            } else {

                message.error(apiResponse.message);

            }
        }

        getTasks();
        /**
         * Check if update or create form
         */
        if (props.location.state) {
            setIdToUpdate(props.location.state.id)
            getDataToUpdate(props.location.state.id);
        }
        
    }, [props.location.state])

    /**
     * Set form.
     */
    const [form, setForm] = useState({ dayWeekNumber: '' });
    const [tasks, setTasks] = useState([]);

    /**
     * Save.
     */
    const [loadingSaveButton, setLoadingSaveButton] = useState(false);
    const save = async () => {

        setLoadingSaveButton(true);

        // Method
        let method = idToUpdate ? 'PUT' : 'POST';
        let endpoint = idToUpdate ? `${process.env.REACT_APP_API_URL}/cleaning-schedule/${idToUpdate}` : `${process.env.REACT_APP_API_URL}/cleaning-schedule`;
        let formToSave = {
            type: 'day',
            dayWeekNumber: form.dayWeekNumber,
            schedule: [
                {
                    tasks: (form.tasks ?? []).map(task => {
                        return {
                            taskName: tasks.find(el => el._id === task)['name'],
                            task: task
                        }
                    })
                }
            ]
        }

        // Call API.
        let apiResponse = await fetch(endpoint,
            {
                headers: {
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: method,
                body: JSON.stringify(formToSave)
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
            props.history.push('/home/cleaning-schedule-day');

        } else {

            setLoadingSaveButton(false);
            message.error(apiResponse.message);

        }
    }

    const getTasks = async () => {

        const tasks = await apiRequestGet('/room-tasks')

        if (tasks)
            setTasks([...tasks]);

    };

    return (

        <FormView
            idToUpdate={idToUpdate}

            form={form}
            setForm={form => setForm({ ...form })}

            tasks={tasks}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;