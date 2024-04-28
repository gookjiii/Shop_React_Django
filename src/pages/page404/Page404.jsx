import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import "./page404.css";


const Page404 = () => {
    return (
        <>
            <section className='page404'>
                <Header className="404_header" />
                <div className='page404__container container'>
                    <p className='page404__title'>404</p>
                    <h1>Упс! Эта страница не может быть найдена.</h1>
                    <p className='page404__text'>Запрошенная страница не найдена. Это может быть орфографическая ошибка в URL-адресе или удаленная страница.</p>
                    <div className="back_btn__container">
                        <button className="back_btn">
                            <i className='home-icon uil uil-estate'></i>
                            <a href='/'>Вернуться домой</a>
                        </button>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}

export default Page404
