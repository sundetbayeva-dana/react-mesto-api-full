import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from './../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('')


    useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser]); 

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
      } 

    return (        
        <PopupWithForm name="profile" title="Редактировать профиль"  isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Сохранить">
                                
            <input placeholder="Имя" className="popup__form-text" name="name" id="name-profile" value={name || ''} onChange={handleNameChange} required />
            <span className="name-profile-error popup__form-text-error_active"></span>
            <input placeholder="Занятие" className="popup__form-text" name="about" id="description-profile" value={description  || ''}  onChange={handleDescriptionChange} required />
            <span className="description-profile-error popup__form-text-error_active"></span>       
        </PopupWithForm>
    )   

}
export default EditProfilePopup;
