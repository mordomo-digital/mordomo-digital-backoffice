import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import FormView from './FormView';
import { apiRequestGet, apiRequestPost, apiRequestPut } from '../../../../utils/api-request';

const FormContainer = (props) => {

    props = props.parent_props;

    /**
     * Set form.
     */
    const [form, setForm] = useState({ title: '', description: '', img: '', imgThumb: '', linkToBuy: '', linkToGet: '', status: '', price: 0 });

    const [idToUpdate, setIdToUpdate] = useState(null);
    useEffect(() => {

        async function getDataToUpdate(id) {
            const product = await apiRequestGet(`/mordomo-store/${id}`)
            if (product) {
                setForm(product);
                // Put img in thumb
                document.getElementById('mordomo-store-pdf-img-file-thumb').src = product.img;
            }
        }

        // Check if update or create form
        if (props.location.state) {
            setIdToUpdate(props.location.state.id)
            getDataToUpdate(props.location.state.id);
        }
    }, [props.location.state])

    const [loadingSaveButton, setLoadingSaveButton] = useState(false);
    const save = async () => {

        setLoadingSaveButton(true);

        let imgUrl = form.img;
        if (typeof imgUrl !== 'string') {
            // Put img in firebase and get download url
            const storage = getStorage();
            const storageRef = ref(storage, `mordomo-store/${form.title}`);
            await uploadBytes(storageRef, form.img);
            imgUrl = await getDownloadURL(ref(storage, `mordomo-store/${form.title}`));
        }

        let formToAdd = {
            title: form.title,
            description: form.description,
            img: imgUrl,
            linkToBuy: form.linkToBuy,
            linkToGet: form.linkToGet,
            section: 'pdf',
            status: form.status,
            price: form.price,
        }

        let dataWasSave = null
        if(idToUpdate){
            dataWasSave = await apiRequestPut(`/mordomo-store/${idToUpdate}`, formToAdd)
        } else {
            dataWasSave = await apiRequestPost('/mordomo-store', formToAdd)
        }

        if(dataWasSave){
            message.success(
                idToUpdate ?
                    'Registro atualizado com sucesso' :
                    'Registro criado com sucesso'
            );
            setLoadingSaveButton(false);
            props.history.push('/home/mordomo-store/pdf');
        } else {
            setLoadingSaveButton(false);
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