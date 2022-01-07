import React from 'react';
import PageWithForm from './PageWithForm';
import Header from './Header'

function Login({onLogin}) {

    const [data, setData] = React.useState({
        email: '',
        password: ''
    })
 
    function handleChange(e) {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!data.email || !data.password) {
            return
        }
        const {password, email} = data
        onLogin(password, email)
    }    
    
    return (
    <>
        <Header linkText="Регистрация" link="/sign-up" />
        <PageWithForm heading="Вход" buttonText="Войти" onChange={handleChange} onSubmit={handleSubmit}>
        </PageWithForm>
    </>
    )
}

export default Login