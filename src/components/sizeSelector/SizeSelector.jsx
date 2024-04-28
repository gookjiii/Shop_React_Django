import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./sizeSelector.css";

const SizeSelector = ({ sizeList, availableSize, parentLink, defaultSize }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const navigate = useNavigate();

    const handleSizeChange = (event) => {
        const selectedSize = event.target.value;
        setSelectedSize(selectedSize);
        const selectedSizeId = availableSize.find(avaiItem => avaiItem.size === selectedSize)?.id;
        
        if (selectedSizeId) {
            navigate(`${parentLink}/${selectedSizeId}`);
        }
    };

    const filteredSizeList = sizeList.filter(item => item.size !== defaultSize);

    return (
        <section className='selection-form'>
            <select id="size" value={selectedSize} onChange={handleSizeChange} className='size-selection__form'>
                <option value="" className='default-size-text'>{defaultSize}</option>
                {filteredSizeList.map((item) => (
                    <option key={item.size} value={item.size}
                        disabled={!availableSize.some(avaiItem => avaiItem.size === item.size)}>
                            {item.size}
                    </option>
                ))}
            </select>
        </section>
    );
};

export default SizeSelector;