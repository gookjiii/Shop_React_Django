import React from 'react';
import { products, colors } from '../../data/TestUI';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductElement from '../productElement/ProductElement';

const SliderBar = ({cateName}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <div className='product-card-slider__container'>
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <ProductElement
                            key={product.id}
                            id={product.id}
                            productName={product.productName}
                            cateName={product.cateName}
                            price={product.price}
                            image={product.image}
                            image_hover={product.image_hover}
                            colors={colors[index].map(colorObj => colorObj)}
                            tag={product.tag}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default SliderBar
