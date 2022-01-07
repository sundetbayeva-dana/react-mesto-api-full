import React from 'react';

function PopupWithForm({name, title, children, isOpen, onClose, buttonText, onSubmit}) {
    const popupOpened=`${isOpen && 'element_visible'}`
    return (
        <div className={`popup popup-${name} ${popupOpened}`}>            
            <div className="popup__overlay" onClick={onClose}></div>
            <div className="popup__content">
                <button aria-label="Кнопка закрыть" className="button button_type_close" type="button" onClick={onClose}>
                </button>
                
                <h2 className="popup__title">{`${title}`}</h2>
                <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>                    
                    {children}
                    <button className="button button_type_save" type="submit" >
                    {buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;