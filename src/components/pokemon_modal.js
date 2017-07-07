import React, { Component } from "react";
import Modal from 'react-bootstrap-modal';

class PokemonModal extends Component {

    constructor(props) {

        super(props);

        this.state = {

            open: false
        };

    }

    componentWillReceiveProps(nextProps) {

    	if (this.state.open !== nextProps.modalOpen) {

      	    this.setState({open: nextProps.modalOpen})
        }

        //console.log("Modal: " + this.props.pokemonName); 
    }


    openModal() {

        this.setState({ open: true });
    }

    render() {

        let closeModal = () => this.setState({ open: false })

        return (
            <div>
                <Modal
                    
                    show={this.state.open}
                    onHide={closeModal}
                    aria-labelledby="ModalHeader"
                >
                    <Modal.Header style={modalStyles.header} closeButton>
                        <Modal.Title id='ModalHeader'>
                            <img 
                                src={this.props.pokemonSprite} 
                                alt={this.props.pokemonName}/>
                            {this.props.pokemonName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="list-group">
                            <li className="list-group-item">
                                National Pokédex number: {this.props.nationalNum}
                            </li>
                            <li className="list-group-item list-group-item-success">
                                Type: {this.props.types}
                            </li>
                            <li className="list-group-item list-group-item-info">
                                Height: {this.props.height}
                            </li>
                            <li className="list-group-item list-group-item-warning">
                                Weight: {this.props.weight}
                            </li>
                            <li className="list-group-item list-group-item-danger">
                                Abilities: {this.props.abilities}
                            </li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer style={modalStyles.footer} >
                        <Modal.Dismiss
                            style={modalStyles.dismiss}
                            className='btn btn-default'
                        >
                            Back
                        </Modal.Dismiss>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const modalStyles = {

    header: {

        textAlign: "center"
    },

    dismiss: {

        paddingLeft: "20px",
        paddingRight: "20px"
    },

    footer: {

        textAlign: "center"
    }

};

export default PokemonModal;
