import { useEffect, useState, useRef } from "react"
import PokemonCard from "../Components/cards/PokemonCards";
import Loader from "../Components/Loader/loader.jsx";
import "../index.css"
export const Pokemon = () =>{
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const isMounted = useRef(false);

    const API = "https://pokeapi.co/api/v2/pokemon?limit=1302"

    const fetchPokemons = async () =>{
        try{
            const res = await fetch(API)
            const data = await res.json()
            console.log(data)
            const detailedData = data.results.map(async(currPokemon)=>{
                const res = await fetch(currPokemon.url)
                const data = await res.json()
                return data
            })
            const detailedResponse = await Promise.all(detailedData)
            console.log(detailedResponse)
            setPokemon(detailedResponse)
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }
    

    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    
    useEffect(()=>{
        if (!isMounted.current) {
            isMounted.current = true;
            fetchPokemons();
        }
    },[])
    if(loading){
        return <Loader></Loader>
    }
    if(error){
        return <div>Error: {error.message}</div>
    }
    
    return (
        <>
            <div className="container">
                <header>
                  <h1> PokéWeb : Gotta Catch ’Em All!</h1>
                </header>
                <div className="pokemon-search">
                  <input
                    type="text"
                    placeholder="search Pokemon"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                  <ul className="cards">
                    {searchData.map((curPokemon) => {
                      return (
                        <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
                      );
                    })}
                  </ul>
                </div>
            </div>
            

        </>
    )
}