import React, { useState } from 'react';
import './productPage.css';
import { Link, useLocation, useParams } from "react-router-dom";
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Products } from '../../data/Products';
import { breadCrumbsDisplay } from '../../data/Categories';
import SizeSelector from '../../components/sizeSelector/SizeSelector';
import Order from '../../data/Order';
import ShowProducts from '../../components/showProducts/ShowProducts';
import SliderBar from '../../components/sliderBar/SliderBar';
import Page404 from '../page404/Page404';
import { useNavigate } from 'react-router-dom';



const testProduct = {
    id: 1,
    model_id: 1,
    productName: "Свитшот-платье",
    cateNameRussian: "Платья",
    model: "SKUUHHF",
    cateName: "Dresses",
    price: "1000₽",
    color: "#373737",
    size: "S",
    quantity: 5,
    image: "/assets/products/1.jpg",
    image_hover: "/assets/products/1_hover.jpg",
    image_detail1: "/assets/products/1_detail1.jpg",
    image_detail2: "/assets/products/1_detail2.jpg",
}

const modelOptions = [
    {
        id: 1,
        color: "black",
        colorName: "черный",
        size: 'S',
        status: "ok",
    },


    {
        id: 3,
        color: "yellow",
        colorName: "желтый",
        size: 'M',
        status: "end",

    },

    {
        id: 2,
        color: "blue",
        colorName: "синий",
        size: 'M',
        status: "ok",
    },

    {
        id: 4,
        color: "black",
        colorName: "черный",
        size: 'M',
        status: "ok",
    },

    {
        id: 5,
        color: "black",
        colorName: "черный",
        size: 'L',
        status: "end",
    },

    {
        id: 6,
        color: "yellow",
        colorName: "желтый",
        size: 'S',
        status: "end",

    },

    {
        id: 7,
        color: "yellow",
        colorName: "желтый",
        size: 'L',
        status: "ok",

    },

    {
        id: 8,
        color: "blue",
        colorName: "синий",
        size: 'S',
        status: "ok",
    },

    {
        id: 9,
        color: "blue",
        colorName: "синий",
        size: 'L',
        status: "end",
    },

]

const availableColors = [
    {
        color: "black",
        colorName: "черный",
    },


    {
        color: "yellow",
        colorName: "желтый",
    },

    {
        color: "blue",
        colorName: "синий",
    },
]

const sizes = [
    {
        size: "S",
    },
    {
        size: "M",

    },
    {
        size: "L",
    }
]

const availableSize = [
    {
        size: "S",
        id: 1
    },
    {
        size: "M",
        id: 2
    }
]


const ProductPage = () => {
    const location = useLocation();

    console.log(useParams())
    let currentLink = '';



    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, index, array) => {
            currentLink += `/${crumb}`;
            const breadcrumbInfo = breadCrumbsDisplay.find(item => item.crumb === crumb);
            const display = breadcrumbInfo ? breadcrumbInfo.display : crumb;

            // If it's the last crumb, set it to productName
            const productName = index === array.length - 1 ? Products.find(product => product.id === parseInt(crumb)).productName : display;

            return (
                <div className="crumb" key={crumb}>
                    <Link className="crumb-link" to={currentLink}>{productName}</Link>
                </div>
            );
        });

    // Image display
    // const handleSmallImageClick = (event) => {
    //     const clickedImage = event.target;
    //     const largeImage = document.querySelector('.product-image__large');

    //     if (clickedImage.classList.contains('small-product-image')) {
    //         largeImage.src = clickedImage.src;

    //         const smallImages = document.querySelectorAll('.small-product-image');
    //         smallImages.forEach(image => image.classList.remove('selected'));
    //         clickedImage.classList.add('selected');
    //     }
    // };

    const handleSmallImageClick = (event) => {
        const clickedImageContainer = event.target.closest('.small-product-image');
        const largeImage = document.querySelector('.product-image__large');

        if (clickedImageContainer) {
            const clickedImage = clickedImageContainer.querySelector('img');
            largeImage.src = clickedImage.src;

            document.querySelectorAll('.small-product-image').forEach(container => container.classList.remove('selected'));
            clickedImageContainer.classList.add('selected');
        }
    };

    // Get current link and id.
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const currentId = pathSegments.pop();
    const url = '/' + pathSegments.join('/');

    // Current size of the id:
    const currentSize = modelOptions.find(item => item.id === parseInt(currentId)).size;
    const currentColorName = modelOptions.find(item => item.id === parseInt(currentId)).colorName;
    const currentColor = modelOptions.find(item => item.id === parseInt(currentId)).color;
    const currentStatus = modelOptions.find(item => item.id === parseInt(currentId)).status;
    let defaultSize;

    if (currentSize) {
        defaultSize = currentSize.size;
    } else {
        defaultSize = sizes[0].size;
    }

    // Quantity Button: 
    const [productQuantity, setProductQuantity] = useState(0);

    const increase = () => {
        const newQuantity = productQuantity + 1;
        setProductQuantity(newQuantity);
    }

    const decrease = () => {
        const newQuantity = productQuantity - 1;
        setProductQuantity(newQuantity);
    }


    // Add to cart button:
    const [quantity, setQuantity] = useState(0);

    const addToCart = () => {
        const newQuantity = productQuantity;
        setQuantity(newQuantity);
        Order.numOrders += productQuantity;
    }

    const status = 200;

    const clickId = currentId;
    const navigate = useNavigate()
    const getIDWithFixSize = (color) => {
        const clickId = modelOptions.find(item => item.size === currentSize && item.color === color).id;
        navigate(`${url}/${clickId}`);
    }

    const getIDWithFixColor = (size) => {
        const clickId = modelOptions.find(item => item.color === currentColor && item.size === size).id;
        navigate(`${url}/${clickId}`);
    }



    return (
        <> {status === 200 ?
            <section className='product-page'>
                <Header />
                <div className='product__breadcrumbs'>
                    {crumbs}
                </div>

                <div className='product-page__container container'>
                    {/* Images displace */}
                    <div className='product-image__container'>
                        <div className='small-images' onClick={handleSmallImageClick}>
                            <div className='small-product-image selected'>
                                <img alt="" src={testProduct.image}></img>
                            </div>
                            <div className='small-product-image'>
                                <img alt="" src={testProduct.image_hover}></img>
                            </div>
                            <div className='small-product-image'>
                                <img alt="" src={testProduct.image_detail1}></img>
                            </div>
                            <div className='small-product-image'>
                                <img alt="" src={testProduct.image_detail2}></img>
                            </div>
                        </div>
                        <div className='product-image-large__container'>
                            <img className='product-image__large' alt="" src={testProduct.image}></img>
                        </div>
                    </div>

                    {/* Information */}
                    <div className='product-information__container'>
                        <div className='page-product-name-price'>
                            <h3 className='page-product-name'> {testProduct.productName}</h3>
                            <p className='page-product-price'>{testProduct.price}</p>
                        </div>
                        <div className='page-product-short-description'>
                            <p>Трансформирующие цвета, смелый текстиль и уникальные принты, натуральные волокна и высокое качество исполнения остаются на переднем плане.</p>
                        </div>


                        {/* <div className='product-information__text'>
                    <div className='product-availability grid'>
                        <p className='product-availability__subtitle'>Доступность:</p>
                        {testProduct.quantity > 0 ? <p className='product-availability'>Да</p>
                            : <p className='product-availability'>Нет</p>}
                    </div>
                    <div className='product-availability grid'>
                        <p className='product-category__subtitle'>Категория:</p>
                        <p className='product-category'>{testProduct.cateNameRussian}</p>
                    </div>
                    <p className='product-delivery'>Бесплатная доставка</p>
                </div> */}

                        {/* Select colors */}
                        <div className='select-color grid'>
                            <div className="select-color-name">
                                <p className='select-color__subtitle'>Цвет:</p>
                                <p className='selected-color-name'>{currentColorName}</p>
                            </div>
                            <div className="color-dots-container">
                                {availableColors.map((item) => (
                                    <div
                                        key={item.color}
                                        className="color-link"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div onClick={() => getIDWithFixSize(item.color)}>
                                            <div className={`${item.color === currentColor ? 'color-dot-container selected-dot' : 'color-dot-container'}`} >
                                                <span style={{ backgroundColor: item.color }} ></span>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Select size */}
                        <div className='select-size grid'>
                            <div className="select-color-name">
                                <p className='select-color__subtitle'>Размер:</p>
                                <p className='selected-color-name'>{currentSize}</p>
                            </div>

                            {/* <SizeSelector className="select-size__form" sizeList={sizes}
                                availableSize={availableSize}
                                parentLink={url}
                                defaultSize={defaultSize}
                            /> */}
                            <div className='sizes-container'>
                                {sizes.map((item) => (
                                    <div
                                        key={item.size}
                                        className='size-link'
                                        style={{ cursor: 'pointer' }}>
                                        <div onClick={() => getIDWithFixColor(item.size)}>
                                            <div className={`${item.size === currentSize ? 'size-dot-container selected-size' : 'size-dot-container'}`} >
                                                <span>{item.size}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Select quantity and add to cart */}
                        {currentStatus === "ok" ? <div className='quantity-and-cart'>

                            <div className='quantity-btn'>
                                {productQuantity > 0 ?
                                    <button className='decrease-btn' onClick={decrease}>-</button> :
                                    <button className='decrease-btn'>-</button>}

                                <p className='quantity-display'>{productQuantity}</p>

                                {productQuantity < testProduct.quantity ?
                                    <button className='increase-btn' onClick={increase}>+</button> :
                                    <button className='increase-btn'>+</button>}
                            </div>
                            {quantity < testProduct.quantity ?
                                <div className='add-to-cart' onClick={addToCart} style={{ cursor: 'pointer' }}>
                                    {/* <i className='uil uil-shopping-cart-alt page-cart__icon'></i> */}
                                    <p className='cart__text'>В Корзину</p>
                                </div> :
                                <div className='add-to-cart' style={{ cursor: 'default' }}>
                                    {/* <i className='uil uil-shopping-cart-alt page-cart__icon'></i> */}
                                    <p className='cart__text'>В Корзину</p>
                                </div>}
                        </div> :
                            <div className='quantity-and-cart'> <div className='out-of-stock-btn add-to-cart' style={{ cursor: "default" }}>Сейчас нет в наличии</div></div>

                        }

                        <div className='product-availability_delivery grid'>
                            <p className='product-category__truck uil uil-truck'></p>
                            <p className='product-category__subtitle'>Бесплатная доставка при заказе на сумму более 3000₽.</p>
                        </div>

                        <div className='product-availability_delivery grid'>
                            <p className='product-category__truck uil-clock-five'></p>
                            <p className='product-category__subtitle'>Доставка в течение: 3-7 рабочих дней.</p>
                        </div>


                        {/* 
                        <div className='product-availability grid'>
                            <p className='product-category__subtitle'>Категория:</p>
                            <p className='product-category'>{testProduct.cateNameRussian}</p>
                        </div>

                        <div className='product-availability grid'>
                            <p className='product-category__subtitle'>Модель:</p>
                            <p className='product-category'>{testProduct.model}</p>
                        </div> */}
                    </div>
                </div>
                {/* Description */}
                {/* <div className='product-description__container container'>
                    <h3 className='product-description__title'>Описание</h3>
                    <p>Красивое платье, выполненное из качественного материала, подчеркнет вашу женственность и стиль. Его изящный дизайн и удобная посадка сделают его вашим любимым выбором как для повседневного образа, так и для особых случаев.</p>
                </div> */}
                {/* Related Products */}
                <div className='related-products container'>
                    <h2 className='recommend__title'>РЕКОМЕНДУЕМ ТАКЖЕ</h2>
                    {/* <ShowProducts catName={testProduct.cateName}></ShowProducts> */}
                    <SliderBar cateName="All" />
                </div>
                <Footer />
            </section> :
            <Page404 />}

        </>
    )
}

export default ProductPage
