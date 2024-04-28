import React from 'react'
import './detailedCategory.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
import ShowProducts from '../../components/showProducts/ShowProducts';
import Page404 from '../page404/Page404';
import { products, colors } from '../../data/TestUI';

const DetailedCategory = () => {
    const status = 200;
    return (
        <> {status === 200 ?
            <section className='detailed-category'>
                <Header />
                <BreadCrumbs />
                {
                    Object.keys(products).length > 0 ?
                        <div className='detailed-category__container container'>
                            <ShowProducts products={products} colors={colors} />
                        </div> :
                        <div className='category-coming-soon container'>
                            <h1>Извините, товары временно недоступны</h1>
        
                            <p>Мы работаем над добавлением новых товаров в наш ассортимент. Пожалуйста, зайдите позже, чтобы увидеть обновленный выбор товаров.</p>
                            <div className="back_btn__container">
                                <button className="back_btn">
                                    <i className='home-icon uil uil-estate'></i>
                                    <a href='/'>Вернуться домой</a>
                                </button>
                            </div>
                        </div>



                }
                <Footer />
            </section> :
            <Page404 />}
        </>
    )
}

export default DetailedCategory
