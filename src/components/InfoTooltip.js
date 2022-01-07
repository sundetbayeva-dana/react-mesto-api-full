import React from 'react';

function InfoTooltip({isOpen, onClose, text, status}) {
    const popupOpened=`${isOpen && 'element_visible'}`
    return (
        <div className={`popup popup-status ${popupOpened}`}>
            <div className="popup__overlay" onClick={onClose}></div>
            <div className="popup__content">
                <button aria-label="Кнопка закрыть" className="button button_type_close" type="button" onClick={onClose} >
                </button>
                <div className={status}></div>
                <p className="status__text">{text}</p>

            </div>

        </div>
    )
}

export default InfoTooltip