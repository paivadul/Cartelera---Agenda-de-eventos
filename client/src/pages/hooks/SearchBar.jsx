import React, { useState } from "react";
import '../inicio/inicio.css'

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearchSubmit}>
            <input
                type="text"
                name="tipo"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button type="submit">Buscar</button>
        </form>
    )
}

export default SearchBar;
