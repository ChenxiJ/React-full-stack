import React, { useEffect } from 'react';
import Modal from 'react-awesome-modal';

function Popup(props) {
    const escFunction = (event) => {
        if(event.keyCode === 27) {
            props.onSelectedChange()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    })

    const popupImg = props.cardSelected;
    if (popupImg!= null) {
        return(
            <Modal visible={true} effect="fadeInUp">
                <img src={popupImg.img} alt={popupImg.type} /> 
            </Modal> 
        )
    } else {
        return (
            <div></div>
        )
    }  
}

export default Popup;