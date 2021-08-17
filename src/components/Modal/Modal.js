import React from 'react';
import './Modal.css'

function Modal(props) {
    return (
        <div className="modal-container">
            <div 
                className="modal-wrapper"
                style={{ opacity: props.opacity }}
            >
                <div className="modal-content">
                    <span>{props.content}</span>    
                </div>
            </div>
        </div>
    )
}

export default Modal;
