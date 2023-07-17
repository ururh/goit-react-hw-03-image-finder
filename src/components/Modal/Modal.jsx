import PropTypes from "prop-types";
import { React, Component } from 'react';
import { ModalOpen, Overlay } from "./Modal.styled";


class Modal extends Component { 

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <Overlay onClick={this.handleBackdropClick}>
                <ModalOpen>
                    <img src={this.props.imgUrl} alt="" />
                </ModalOpen>
            </Overlay>      
        )
    }
};


Modal.proptTypes = {
    onClose: PropTypes.func.isRequired,
    imgUrl: PropTypes.string.isRequired,
};

export default Modal;