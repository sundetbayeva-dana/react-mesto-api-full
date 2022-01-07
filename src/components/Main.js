import React from 'react';
import icon from './../images/Vector.svg';
import Card from './Card';
import {CurrentUserContext} from './../contexts/CurrentUserContext'
import Header from './Header';
import Footer from './Footer'



function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, onSignOut, userEmail }) {

    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main>
            <Header  linkText="Выйти" link="sign-in" onSignOut={onSignOut} userEmail={userEmail}/>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={icon} alt="Изменить аватар пользователя" className="profile__icon-edit" />                
                    <img src={currentUser.avatar} alt="Аватарка пользователя" className="profile__avatar" onClick={onEditAvatar} />
                    
                    
                </div>
                <div className="profile__info">
                    <div className="profile__info-name-cont">
                        <h1 className="profile__info-name">{currentUser.name}</h1>
                        <button aria-label="Кнопка изменить профиль" className="button button_type_edit" type="button" onClick={onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__info-activity">{currentUser.about}</p>
                </div>
                <button aria-label="Кнопка добавить" className="button button_type_add" type="button" onClick={onAddPlace}>
                </button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => {
                        return (
                            <Card
                            key={card._id}
                            cardId={card._id}
                            url={card.link}
                            text={card.name}
                            owner={card.owner}
                            likes={card.likes}
                            onCardLike={onCardLike}
                            onCardClick={onCardClick}
                            onCardDelete={onCardDelete}                           
                            />
                        )                   
                    })}
                </ul>                
            </section>
            <Footer />
        </main>
    )
}

export default Main;