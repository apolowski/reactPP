import { useState, useEffect } from 'react';

function PokemonCatalog() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
                const data = await response.json();

                const formattedPokemons = data.results.map((poke) => {
                    const id = poke.url.split('/')[6];
                    return {
                        id: id,
                        name: poke.name,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    };
                });

                setPokemons(formattedPokemons);
                setLoading(false);
            } catch (error) {
                console.error("Hubo un error cargando los Pokémon", error);
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    const openPokemonModal = async (pokemon) => {
        setSelectedPokemon(pokemon); 
        setLoadingDetails(true); 

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
            const data = await res.json();

            setPokemonDetails(data); 
            setLoadingDetails(false); 
        } catch (error) {
            console.error("Error cargando detalles:", error);
            setLoadingDetails(false);
        }
    };
    const closeModal = () => {
        setSelectedPokemon(null);
        setPokemonDetails(null);
    };

    return (
        <><div className="page-container">
            <h1>Pokedex 1ra Generación</h1>

            {loading ? (
                <p>Cargando Pokémon desde la API...</p>
            ) : (
                <div className="pokemon-grid">
                    {pokemons.map((pokemon) => (
                        <div
                            key={pokemon.id}
                            className="pokemon-card"
                            onClick={() => openPokemonModal(pokemon)}
                            style={{ cursor: 'pointer' }}
                        >
                            <span className="pokemon-id">#{pokemon.id}</span>
                            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                            <h3 className="pokemon-name">{pokemon.name}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
        <div>
        {selectedPokemon && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>X</button>

                        <img src={selectedPokemon.image} alt={selectedPokemon.name} className="modal-image" />
                        <h2>{selectedPokemon.name}</h2>


                        {loadingDetails ? (
                            <p>Cargando información del profesor Oak...</p>
                        ) : pokemonDetails ? (
                            <div className="pokemon-info">

                                <div className="types-container">
                                    {pokemonDetails.types.map((typeInfo) => (
                                        <span key={typeInfo.type.name} className={`type-badge`}>
                                            {typeInfo.type.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="physique">
                                    <p><b>Peso:</b> {pokemonDetails.weight / 10} kg</p>
                                    <p><b>Altura:</b> {pokemonDetails.height / 10} m</p>
                                </div>

                                <h3>Estadísticas Base</h3>
                                <div className="stats-container">
                                    {pokemonDetails.stats.map((stat) => (
                                        <div key={stat.stat.name} className="stat-row">
                                            <span className="stat-name">{stat.stat.name}</span>
                                            <div className="stat-bar-bg">
                                                <div
                                                    className="stat-bar-fill"
                                                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="stat-value">{stat.base_stat}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ) : null}
                    </div>
                </div>
            )}    
        </div></>
    
    );
}

export default PokemonCatalog;
