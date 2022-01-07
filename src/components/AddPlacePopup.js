import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [text, setText] = React.useState('');
    const [link, setLink] = React.useState('')

    function handleSubmit(e) {
        e.preventDefault();  
        onAddPlace({
            text,
            link
        });    
    } 

    function handleNameChange(e) {
        setText(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

  return (
    <PopupWithForm name="place" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Сохранить">
                                
        <input placeholder="Название" className="popup__form-text" name="name" id="name-place" onChange={handleNameChange} required />
        <span className="name-place-error"></span>
        <input placeholder="Ссылка на картинку" className="popup__form-text" name="link" id="link-place" onChange={handleLinkChange} required />
        <span className="link-place-error"></span>
  </PopupWithForm>
  )
}

export default AddPlacePopup
