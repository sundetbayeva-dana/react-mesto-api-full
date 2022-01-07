import React, {useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as auth from './../utils/Auth';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from './../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import ProtectedRoute from './ProtectedRoute';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]= React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({})
    const [currentUser, setCurrentUser] = React.useState({})
    const [popupStatus, setPopupStatus] = React.useState({
        isOpen: false,
        text: '',
        pic: '',
    })
    const [cards, setCards] = React.useState([])
    const [userEmail, setUserEmail] = React.useState('')
    const [loggedIn, setLoggedIn] = React.useState(false)
    const history = useHistory()

    useEffect(() => {
        api.getUserInformation()
        .then(currentUser => setCurrentUser(currentUser))
        .catch((err) => {
            console.log(err)
        }) 
    }, [])    

    useEffect(() => {
        api.getCards()
        .then(cards => setCards(cards))
        .catch((err) => {
            console.log(err)
        })       
    }, [])

    useEffect(() => {
        if (loggedIn === true) {
            history.push('/')
        }
    }, [loggedIn])

    useEffect(() => {
        tokenCheck();
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
  
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }
    
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setPopupStatus({
            isOpen: false,
            text: '',
            pic: '',})
        setSelectedCard({})
    }

    function handleCardClick({url, text}) {
        setSelectedCard({url, text})
    }

    function handleUpdateUser(userInfo) { 
        api.setUserInfo(userInfo)
        .then(currentUser => setCurrentUser(currentUser))
        .then(() => {
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        }) 
        
    }

    function handleUpdateAvatar(avatar) {
        api.setUserAvatar(avatar)
        .then(currentUser => setCurrentUser(currentUser))
        .then(() => {
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    function handleCardLike({likes, cardId}) {
        const isLiked = likes.some(i => i._id === currentUser._id);

        if (!isLiked) {    
            api.setLikeOnCard(cardId)
            .then((likedCard) => {
                setCards((state) => state.map((c) => c._id === cardId ? likedCard :c))
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            api.removeLikeOnCard(cardId)
            .then((dislikedCard) => {
                setCards((state) => state.map((c) => c._id === cardId ? dislikedCard :c))
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    function handleCardDelete({cardId}) {
        api.deleteCard(cardId)
        .then(() => {
            setCards((state) => state.filter((d) => d._id !== cardId ?? d))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleAddPlaceSubmit({text, link}) {
        api.addCards(text, link)
        .then((newCard) => setCards([newCard, ...cards]))
        .then(() => {
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function tokenCheck() {
        const token = localStorage.getItem('token')
        if (token) {
            auth.getContent(token)            
            .then((data) => {
                if (data) {
                    const userEmail = data.data.email
                    setUserEmail(userEmail)
                    setLoggedIn(true)                    
                }
            }) 
            .catch((err) => {
                console.log(err)
            })
        }
    }

    
    

    function handleRegister(password, email) {
        auth.register(password, email)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token)
            }
            const userEmail = email
            setUserEmail(userEmail)
            setLoggedIn(true)
            setPopupStatus({
                isOpen: true,
                text: `Вы успешно зарегистрировались!`,
                pic: 'status-pic_success'
            })
        })
        .catch((error) => {
            console.log(error)
            setPopupStatus({
                isOpen: true,
                text: `Что-то пошло не так!
                Попробуйте ещё раз`,
                pic: 'status-pic_fail'
            })
        })
    }

    function handleLogin(password, email) {
        auth.authorize(password, email)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token)
            }
            const userEmail = email
            setUserEmail(userEmail)
            setLoggedIn(true)
        })
        .catch(err => console.log(err))
    }
    
    function handleSignOut() {
        localStorage.removeItem('token');
        setLoggedIn(false)
    }

    return (        
        <div className="App">
            <div className="page">                
                <div className="page__container">
                    <div className="page__content">
                        <CurrentUserContext.Provider value={currentUser}>
                            <Switch>
                                
                                <Route path="/sign-up">
                                    <Register onRegister={handleRegister}/>                                
                                </Route>                            

                                <Route path="/sign-in">
                                    <Login onLogin={handleLogin} />
                                </Route>

                                <ProtectedRoute path="/" 
                                loggedIn={loggedIn} 
                                component={Main}
                                onEditProfile={handleEditProfileClick}                            
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onClose={closeAllPopups}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete} 
                                onSignOut={handleSignOut}
                                userEmail={userEmail} />
                                                      

                            </Switch>

                            

                            <InfoTooltip  />

                            <InfoTooltip isOpen={popupStatus.isOpen} text={popupStatus.text} status={popupStatus.pic} onClose={closeAllPopups}/>

                            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} >
                            </EditProfilePopup>

                            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

                            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} ></AddPlacePopup>                          


                            <PopupWithForm name="delete" title="Вы уверены?" isOpen={''} onClose={closeAllPopups} buttonText="Да">                            
                            </PopupWithForm>

                            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                        </CurrentUserContext.Provider>

                
                    </div>  
                </div>
            </div>                
        </div>
    );
}

export default App;