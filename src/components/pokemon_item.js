import React, { Component } from "react";
import axios from "axios";

import PokemonModal from "./pokemon_modal";


class PokemonItem extends Component {

    constructor(props) {

        super(props);

        this.state = {

            modal: (<PokemonModal />),

            loadingStats: false
        };

    }


    handleStats() {

        this.setState({ loadingStats: true });

        axios.get(this.props.pokemonUrl).then((response) => {

            //console.log("axios", response.data.sprites.front_default);

            const pokemonData = {

                pokemonSprite: response.data.sprites.front_default,
                nationalNum: response.data.id,

                types: response.data.types.map((item) => item.type.name).join(" - "),

                weight: response.data.weight,
                height: response.data.height,

                abilities: response.data.abilities.map((item) => item.ability.name).join(" - ") 
            };


            const modal = (

                <PokemonModal
                        modalOpen={true} 
                        pokemonName={this.props.pokemonName}
                        pokemonSprite={pokemonData.pokemonSprite}
                        nationalNum={pokemonData.nationalNum}
                        types={pokemonData.types}
                        weight={pokemonData.weight}
                        height={pokemonData.height}
                        abilities={pokemonData.abilities}
                />
            );

            this.setState({

                modal,
                loadingStats: false
            });

        });   

    }

    render() {

        return (

            <div>
                <li className="list-group-item"
                    style={itemStyles.li}
                >
                    <h3 style={itemStyles.h3}>
                        <input 
                            className="pull-left"
                            style={itemStyles.input} 
                            type="checkbox"
                            onChange={() => {this.props.onCheckboxClick(this.props.pokemonName)}}
                        />
                        {this.props.pokemonName}
                        <button
                            className="btn btn-default btn-danger pull-right"
                            onClick={this.handleStats.bind(this)}
                        >
                            {this.state.loadingStats ? "Wait!" : "Stats"}
                        </button>
                    </h3>
                </li>

                {this.state.modal}
            </div>
        );

    }

};

const itemStyles = {

    li: {

        backgroundColor: "#66cc99"
    },

    h3: {
        textAlign: "center",
        marginTop: "10px",
    },

    input: {

        marginTop: "7px",
        transform: "scale(1.5)",
    }
}

export default PokemonItem;
