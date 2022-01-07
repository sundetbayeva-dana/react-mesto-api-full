import React from 'react';
import {CurrentUserContext} from './../contexts/CurrentUserContext'

function Card({cardId, url, text, owner, likes, onCardLike, onCardClick, onCardDelete}) {
    
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `button button_type_delete ${isOwn ? 'element_visible' : ''}`
    );
    
    const isLiked = likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `button button_type_like ${isLiked ? 'button_type_like-active' : ''}`
    )

    function handleLikeClick() {
        onCardLike({likes, cardId})
    }


    function handleClick() {
        onCardClick({url, text})
    }

    function handleDeleteClick() {
        onCardDelete({cardId})
    }

    return (
        <li className="card">
            <button aria-label="Кнопка удалить" className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}>
            </button>
            <img src={url} className="card__pic" alt={text} onClick={handleClick} />
            <div className="card__text">
                <h2 className="card__name">{text}</h2>
                <div className="card__like">
                    <button aria-label="Кнопка нравится" className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
                    </button>
                    <p className="card__like-count">{likes.length}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default Card;