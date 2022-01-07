import React from 'react';
import PageWithForm from './PageWithForm';
import Header from './Header';

function Register({onRegister}) {

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
        const {password, email} = data
        onRegister(password, email)
    }

    return (
        <>
        <Header linkText="Войти" link="sign-in" />
        <PageWithForm heading="Регистрация" buttonText="Зарегистрироваться" info="Уже зарегистрированы? " infoLink=" Войти" onChange={handleChange}  onSubmit={handleSubmit} >
            
        </PageWithForm>
        </> 
    )
}

export default Register