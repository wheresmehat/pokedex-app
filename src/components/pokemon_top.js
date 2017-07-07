import React, { Component } from "react";
import axios from "axios";

import PokemonList from "./pokemon_list";

class PokemonTop extends Component {

    constructor(props) {

        super(props);

        this.state = {
            
            pokemonAll: [],
            myPokemon: [],
            pokemonChecked: [],
            pokemonData: [],
            offset: 10,
            showMyPokemon: false,
            loadingInProgress: true,
            aBottom: topStyles.aBottomNone,
            loadingSpan: topStyles.loadingSpanNormal
        };
    }


    componentDidMount() {
        
        
        let url = "https://pokeapi.co/api/v2/pokemon/?limit=10";

        axios.get(url).then((response) => {

            this.setState({

                pokemonAll: response.data.results,

                aBottom: topStyles.aBottomNormal,
                loadingSpan: topStyles.loadingSpanNone,
                loadingInProgress: false
            });

        });           
    }
    
    loadMore() {

        let url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${this.state.offset}`

        this.setState((prevState) => {

            return { 
                
                offset: prevState.offset + 10,
                aBottom: topStyles.aBottomInactive,
                loadingInProgress: true
            };
        });

        axios.get(url).then((response) => {

            this.setState((prevState) => {
                
                let aBottomStyle = topStyles.aBottomNormal;

                if (prevState.showMyPokemon) {

                    aBottomStyle = topStyles.aBottomNone;
                }
                else if (!prevState.showMyPokemon && !prevState.loadingInProgress) {

                    aBottomStyle = topStyles.aBottomInactive;
                }
                
                return {

                    pokemonAll: [...prevState.pokemonAll, ...response.data.results],
                    aBottom: aBottomStyle,
                    loadingInProgress: false
                }

            });
        });   
        
    }

    handleCheckboxClick(name) {

        this.setState((prevState) => {

            const index = prevState.pokemonChecked.findIndex((pokName) => pokName === name);
            
            let newPokemonChecked;

            if (index === -1) {

                newPokemonChecked = [ ...prevState.pokemonChecked, name ];
            }
            else {

                newPokemonChecked = prevState.pokemonChecked.filter((pokName) => pokName !== name);
            }

            const myNewPokemon = prevState.pokemonAll.filter((pokemonObject) => {

                if (newPokemonChecked.indexOf(pokemonObject.name) !== -1) {

                    return pokemonObject;
                }            

            });

            return {

                pokemonChecked: newPokemonChecked,
                myPokemon: myNewPokemon
            }         
            
        });

    }

    changePokemonList() {

        this.setState((prevState) => {
            
            let aBottomStyle = topStyles.aBottomNone;

            if (prevState.showMyPokemon) {

                aBottomStyle = topStyles.aBottomNormal;
            }
            else if (prevState.showMyPokemon && prevState.loadingInProgress) {

                aBottomStyle = topStyles.aBottomInactive;
            }

            return {

                showMyPokemon: !prevState.showMyPokemon,
                aBottom: aBottomStyle
            };

        });

    }


    render() {

        return (

            <div>
                <div style={topStyles.divHeader}>
                    <h3 
                        style={topStyles.h3}
                    >
                        Pokédex
                    </h3>
                    <a 
                        style={topStyles.aHeader} 
                        type="button" 
                        className="btn btn-default btn-info pull-right"
                        onClick={this.changePokemonList.bind(this)}
                    >
                        {this.state.showMyPokemon ? "Back to list" : "My Pokémon"}
                    </a>   
                    <h6 
                        style={topStyles.h6Header}
                    >
                        {this.state.showMyPokemon ? "Uncheck to remove" : "Check to add to My Pokémon"}
                    </h6>
                    <span style={topStyles.spanTop} className="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                </div>
                <PokemonList 
                    pokemonList={this.state.showMyPokemon ? this.state.myPokemon : this.state.pokemonAll} 
                    onCheckboxClick={this.handleCheckboxClick.bind(this)}
                />
                <a 
                    onClick={this.loadMore.bind(this)}
                    style={this.state.aBottom}
                >
                    <span 
                        style={topStyles.spanBottomLeft}
                        className="glyphicon glyphicon-chevron-down" 
                        aria-hidden="true">
                    </span>
                    Load 10 more
                    <span 
                        style={topStyles.spanBottomRight}
                        className="glyphicon glyphicon-chevron-down" 
                        aria-hidden="true">
                    </span>
                </a>
                <span style={this.state.loadingSpan}>Loading...</span>
            </div>
        );
    }

}

const topStyles = {

    h3: {
        border: "2px solid #4d4d4d",
        textAlign: "center",
        paddingRight: "55px"
    },

    spanBottomRight: {
    
        paddingLeft: "7px",
        verticalAlign: "middle"
    },

    spanBottomLeft: {
    
        paddingRight: "7px",
        verticalAlign: "middle"
    },

    divHeader: {

        paddingBottom: "20px"
    },

    h6Header: {

        paddingTop: "13px"
    },

    spanTop: {
    
        paddingLeft: "15px"
    },

    aBottomNone: {

        display: "none",     
    },

    aBottomInactive: {

        display: "block", 
        textDecoration: "none",
        pointerEvents: "none",
        cursor: "default",
        textAlign: "center",
        paddingRight: "45px",
        paddingBottom: "15px",
        height: "35px",
        color: "#DEB887"
    },

    aBottomNormal: {

        display: "block", 
        textDecoration: "none",
        cursor: "pointer",
        textAlign: "center",
        paddingRight: "45px",
        paddingBottom: "15px",
        height: "35px"
    },

    loadingSpanNone: {

        display: "none",  
    },

    loadingSpanNormal: {

        display: "block",
        textAlign: "center",
        paddingRight: "40px",
        fontSize: "1.2em"  
    }

}


export default PokemonTop;