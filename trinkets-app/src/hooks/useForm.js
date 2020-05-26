import {useState} from 'react'

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues)

    const changeHandler = e => {
        const {name, value} = e.target

        return setValues({
            ...values,
            [name]: value
        })
    }

    const clearForm = () => setValues(initialValues)

    return [values, changeHandler, clearForm]
}