import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import './Form.css';



const initialFormData = {
    name: '',
    size: '',
    pepperoni: false,
    bellPeppers: false,
    olives: false,
    pineapple: false,
    instructions: '',
}

const initialErrorData = {
    name: '',
    size: '',
    pepperoni: '',
    bellPeppers: '',
    olives: '',
    pineapple: '',
    instructions: '',
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name needs to be at least 2 characters'),
    size: yup.string().notRequired(),
    pepperoni: yup.boolean().notRequired(),
    bellPeppers: yup.boolean().notRequired(),
    olives: yup.boolean().notRequired(),
    pineapple: yup.boolean().notRequired(),
    instructions: yup.string().notRequired(),
})


export default function Form(props) {
    const [orders, setOrders] = useState([])
    const [errors, setErrors] = useState(initialErrorData);
    const [formData, setFormData] = useState(initialFormData);
    const [disabled, setDisabled] = useState(true)

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({
                ...errors,
                [name]:''
            }))
            .catch((err) => setErrors({
                ...errors,
                [name]: err.errors[0]
            }))
    }


    
    
    const change = (evt) => {
        const {checked, value, name, type} = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        setFormErrors(name, valueToUse)
        setFormData({
            ...formData,
            [name]: valueToUse
        })
        
    }

    const submit = (evt) => {
        evt.preventDefault();
        const newOrder = {name: formData.name.trim(), size: formData.size, pepperoni: formData.pepperoni, bellPeppers: formData.bellPeppers, olives: formData.olives, pineapple: formData.pineapplel, instructions: formData.instructions}
        axios.post('https://reqres.in/api/users', newOrder)
            .then((res) => {
                setOrders([...orders, res.data])
                setFormData(initialFormData)
                console.log(res.data)
            })
            .catch(() => {
                console.log('error! sucks!')
            })
    }


    useEffect(() => {
        schema.isValid(formData).then(valid => setDisabled(!valid))
    },[formData])



    return (
        <div className='form-container'>
            <form onSubmit={submit}>
                <div className='form-items'>

                <div style={{ color: 'crimson' }}>{errors.name}</div>
                <label>Name
                    <input onChange={change} value={formData.name} name='name' type='text' />
                </label>

                <label>Size
                    <select name='size' value={formData.size} onChange={change}>
                        <option value=''>---Select Size---</option>
                        <option value="8Inch">8"</option>
                        <option value='12Inch'>12"</option>
                        <option value='16Inch'>16"</option>
                    </select>
                </label>    

                <label>Peperonni
                    <input onChange={change} checked={formData.pepperoni} name='pepperoni' type='checkbox'/>
                </label>

                <label>Bell Peppers
                    <input onChange={change} checked={formData.bellPeppers} name='bellPeppers' type='checkbox'/>
                </label>

                <label>Olives
                    <input onChange={change} checked={formData.olives} name='olives' type='checkbox'/>
                </label>

                <label>Pineapple
                    <input onChange={change} checked={formData.pineapple} name='pineapple' type='checkbox'/>
                </label>

                <label>Special Instructions
                    <input onChange={change} value={formData.instructions} name='instructions' type='text'/>
                </label>

                <button id='submitBtn'>Add to Order</button>
                </div>





            </form>


        </div>


    )



}