import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { apiRequestGet, apiRequestPost, apiRequestPut } from '../../../utils/api-request.js'

import FormView from './FormView';

const FormContainer = (props) => {

    props = props.parent_props;

    const [loadingScreen, setLoadingScreen] = useState(false);

    const [form, setForm] = useState({ name: '', tasks: [] });

    const [idToUpdate, setIdToUpdate] = useState(null);
    useEffect(() => {

        async function getDataToUpdate(id) {
            const room = await apiRequestGet(`/room-items/${id}`)

            if (room) {

                await getTasks();
                setForm({
                    name: room['name'],
                    tasks: room['tasks'].map(el => el._id),
                })

            }

            setLoadingScreen(false);
        }

        if (props.location.state) {
            setLoadingScreen(true);
            setIdToUpdate(props.location.state.id)
            getDataToUpdate(props.location.state.id);
        } else {
            getTasks();
        }
    }, [props.location.state])

    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {

        const tasks = await apiRequestGet('/room-tasks')

        if (tasks)
            setTasks([...tasks]);

    };

    /**
     * Save.
     */
    const [loadingSaveButton, setLoadingSaveButton] = useState(false);
    const save = async () => {

        setLoadingSaveButton(true)

        const body = {
            name: form.name,
            tasks: JSON.stringify(form.tasks),
        }

        if (idToUpdate) {
            const apiReturn = await apiRequestPut(
                `/room-items/${idToUpdate}`,
                body
            )
            if (apiReturn) {
                message.success('Registro atualizado com sucesso')
                props.history.push('/home/room-items')
            }
        } else {
            const apiReturn = await apiRequestPost(
                `/room-items`,
                body
            )
            if (apiReturn) {
                message.success('Registro criado com sucesso')
                props.history.push('/home/room-items')
            }
        }
        setLoadingSaveButton(false);
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