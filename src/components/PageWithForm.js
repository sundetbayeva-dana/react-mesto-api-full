import React from 'react';
import { Link } from 'react-router-dom';

function PageWithForm({heading, buttonText, info, onChange, infoLink, onSubmit}) {
  return (
    <div className="page-with-form__container">
        <h1 className="page-with-form__heading">{heading}</h1> 
        <form className="page-with-form__form" onSubmit={onSubmit}>                          
            <input placeholder="E-mail" className="page-with-form__form-text" name="email" id="email" onChange={onChange}  required />
            <span className="name-place-error"></span>
            <input placeholder="Пароль" className="page-with-form__form-text" name="password" id="password" type="password" onChange={onChange} required />
            <span className="link-place-error"></span>
            <button className="button button_type_auth" type="submit" >
            {buttonText}
            </button>
            <div className="page-with-form__info-cont">
              <p className="page-with-form__info-text">{info}</p>
              <Link to="/sign-in" className="page-with-form__info-text-link">{infoLink}</Link>
            </div>
        </form>

    </div>
  )
}

export default PageWithForm;