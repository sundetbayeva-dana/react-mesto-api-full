import React from 'react';

function ImagePopup({card, onClose}) {
    const popupOpened=`${card.url && 'element_visible'}`
    return (
        <div className={`popup popup-card ${popupOpened}`}>
            <div className="popup__overlay" onClick={onClose}></div>
            <div className="popup-card__content">
                <button aria-label="Кнопка закрыть" className="button button_type_close" type="button" onClick={onClose} >
                </button>
                <img className="popup-card__pic" alt={card.text} src={card.url} />

                <p className="popup-card__picname">{card.text}</p>
            </div>
        </div>
    )
}

export default ImagePopup;