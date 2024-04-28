import React, {useState, useEffect} from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home.css';
import New from '../../components/new/New';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Home = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % 3); // Assuming 3 slides
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <section className='home'>
        <Header />
        <div className='home__container'>
          <div className="carousel-container">
            <Carousel
              selectedItem={currentIndex}
              onChange={(index) => setCurrentIndex(index)}
              autoPlay
              interval={2000}
              infiniteLoop
              showIndicators={true}
              showThumbs={false}
              showStatus={false} // Hide status bar
              stopOnHover={false} // Continue autoplay on hover
              dynamicHeight={false} // Disable dynamic height
              className="carousel"
            >
              <img src="/assets/img1.png" alt="slide 1" onLoad={handleImageLoad} />
              <img src="/assets/img2.png" alt="slide 2" onLoad={handleImageLoad} />
              <img src="/assets/img3.png" alt="slide 3" onLoad={handleImageLoad} />
            </Carousel>
          </div>
          {imageLoaded && <New />}
        </div>
        {imageLoaded && <Footer />}
      </section>
    </>
  )
}

export default Home


