import React, { Component } from "react";

import PokemonItem from "./pokemon_item";


const PokemonList = (props) => {
        
        //console.log(props.pokemonList);

        return (
            
            <ul className="list-group">
                {props.pokemonList.map((pokemonObj) => {
                    return (
                        <div key={pokemonObj.name}>
                        <PokemonItem
                            pokemonName={pokemonObj.name}
                            pokemonUrl={pokemonObj.url}
                            onCheckboxClick={props.onCheckboxClick}
                        />
                        </div>
                    )
                })}
            </ul>
        );


};

export default PokemonList;
