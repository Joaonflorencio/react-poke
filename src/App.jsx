import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(null);
      setError(null);
      return;
    }

    const fetchPokemon = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokemon no encontrado');
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        setError(error.message);
        setSearchResults(null);
      } finally {
        setIsLoading(false);
      }
    };

    const timerId = setTimeout(() => {
      fetchPokemon();
    }, 500); // Adiciona um debounce para reduzir o número de chamadas à API

    return () => clearTimeout(timerId); // Limpa o timer se o componente for desmontado ou se o searchTerm mudar
  }, [searchTerm]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Buscador de Pokémon</h1>
        <input
          type="text"
          placeholder="Digite o nome do Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading && <p>Buscando...</p>}
        {error && <p>{error}</p>}
        {searchResults && (
          <div>
            <h2>{searchResults.name}</h2>
            <img src={searchResults.sprites.front_default} alt={searchResults.name} />
            {/* Adicionar ams se yo quiero */}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;