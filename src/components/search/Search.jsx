import React from 'react';
import './search.css'; // Assuming you have a CSS file for styling

function Search({ isOpen, toggleSearch }) {
    return (
        <div className="search__container">
            {/* Small search icon */}
            {!isOpen && (
                <button className="search__icon" onClick={toggleSearch}>
                    <i className="uil uil-search"></i>
                </button>
            )}

            {/* Search popup */}
            {isOpen && (
                <div className="overlay">
                    <div className="search__bar">
                        <div className='form__container'>
                            <div className='form__box form__container'>
                                <input type='text' placeholder='Искать товары...' />
                                <button className='form__button search__button'>Поиск</button>
                            </div>
                            <button className='search__close' onClick={toggleSearch}>
                                <i className="uil uil-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;