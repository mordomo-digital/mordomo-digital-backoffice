import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';
import env from '../../../env.json';

// Components
import FormView from './FormView';

const FormContainer = (props) => {

    props = props.parent_props;

    const [idToUpdate, setIdToUpdate] = useState(null);
    useEffect(() => {

        /**
         * Get data to update.
         */
        async function getDataToUpdate(id) {
            // Call API.
            let apiResponse = await fetch(`${env.api_url}/express-schedule/one/${id}`,
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
                    tasks: apiResponse.data['tasks'],
                });

                setTasks([...apiResponse.data['tasks'][0]['tasks']]);

            } else {

                message.error(apiResponse.message);

            }
        }

        /**
         * Check if update or create form
         */
        // if (props.location.state) {
        //     setIdToUpdate(props.location.state.id)
        //     getDataToUpdate(props.location.state.id);
        // }
        setIdToUpdate('61548b913360e1aa1b2f657a')
        getDataToUpdate('61548b913360e1aa1b2f657a');
    }, [props.location.state])

    /**
     * Set form.
     */
    const [form, setForm] = useState({ dayWeekNumber: '' });

    const [taskToAdd, setTaskToAdd] = useState(null);
    const [tasks, setTasks] = useState([]);

    /**
     * Save.
     */
    const [loadingSaveButton, setLoadingSaveButton] = useState(false);
    const save = async () => {

        setLoadingSaveButton(true);

        // Method
        let method = idToUpdate ? 'PUT' : 'POST';
        let endpoint = idToUpdate ? `${env.api_url}/express-schedule/${idToUpdate}` : `${env.api_url}/express-schedule`;
        let formToSave = {
            type: 'weekDefaultTask',
            dayWeekNumber: form.dayWeekNumber,
            tasks: [
                {
                    room: '60db71b6f7fd0600045f7edf',
                    tasks: tasks
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
            // props.history.push('/home/express-schedule-day');

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

            taskToAdd={taskToAdd}
            setTaskToAdd={task => setTaskToAdd(task)}

            tasks={tasks}
            setTasks={tasksUpdated => setTasks(tasksUpdated)}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;