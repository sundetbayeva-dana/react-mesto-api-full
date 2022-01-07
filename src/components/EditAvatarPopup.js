import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef()
  
  function handleSubmit(e) {
    e.preventDefault();  
    onUpdateAvatar({
      avatar: avatarRef.current.value,      
    });    
  } 
  
  return (
    <PopupWithForm name="avatar-change" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Сохранить">                     
      <input placeholder="Ссылка на картинку" className="popup__form-text" name="link" id="link-avatar-picture" ref={avatarRef}  required />
      <span className="link-avatar-picture-error"></span>
    </PopupWithForm>
  )  
}

export default EditAvatarPopup