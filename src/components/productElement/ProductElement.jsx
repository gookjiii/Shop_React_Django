import React, { useState } from 'react';
import './productElement.css';
import { Link } from "react-router-dom";
import { categories } from '../../data/Categories';


const ProductElement = ({ id, productName, cateName, price, image, image_hover, colors, tag }) => {
    const [isHovered, setIsHovered] = useState(false);
    const findUrlsByCateName = (categories, cateName) => {
        const matchedCategories = categories.filter(category => category.cateName === cateName);
        const url = matchedCategories.map(category => category.url);
        return url;
    };

    const url = findUrlsByCateName(categories, cateName);

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }
    const h = () => { }
    // arrow function, different from a function called using function

    const addToCart = () => {
        // do something
    }

    return (
        <div className="product__container">

            <div className='element-image__container'>
                <div className='product-tag'>{tag}</div>
                <Link to={`${url}/${id}`} onClick={scrollToTop}>
                    <img
                        className="product__img"
                        src={isHovered ? image_hover : image}
                        alt="product_image"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                </Link>
                <button className='element-add-to-cart' onClick={(event) => { event.stopPropagation(); addToCart(); }}>В Корзину</button>
            </div>

            <div className='element-product__container'>
                <Link to={`${url}/${id}`} onClick={scrollToTop} className='element-product__name'>{productName}</Link>
            </div>
            <p className='element-product__price'>{price}</p>
            <div className="element-color-dots-container">
                {colors.map(colorObj => (
                    <Link
                        key={colorObj.color}
                        to={`${url}/${colorObj.id}`}
                        className="color-link"
                        onClick={scrollToTop}
                    >
                        <div className='element-color__container'>
                            <span style={{ backgroundColor: colorObj.color }} colorName={colorObj.colorName}>
                                {colorObj.colorName}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductElement;
