import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
import './cart.css';

const InputField = ({ label, placeholder, isTextarea }) => {
    if (isTextarea) {
      return (
        <div className="input-field">
          <textarea
            placeholder={placeholder}
            aria-label={placeholder}
            className="address-input"
            rows={3} 
          />
        </div>
      );
    } else {
      return (
        <div className="input-field">
          <input
            type="text"
            placeholder={placeholder}
            aria-label={placeholder}
            className="input-field"
          />
        </div>
      );
    }
  };
  
 
  const fields = [
    { label: "Name", placeholder: "Name" },
    { label: "Email Address", placeholder: "Email Address" },
    { label: "Telegram", placeholder: "Telegram" },
    { label: "Mobile Phone", placeholder: "Mobile Phone" },
    { label: "Address for Delivery", placeholder: "Address for Delivery" },
  ];

function ProductImage({ imageSrc, productName }) {
    return (
        <div className="product-image">
            <img src={imageSrc} alt={productName} className="image" />
        </div>
    );
}

function ProductInfo({ productName }) {
    return (
        <div className="product-name">{productName}</div>
    );
}

function ProductPrice({ quantity, unitPrice }) {
    const numericUnitPrice = parseFloat(unitPrice.replace('$', ''));

    const originalPrice = quantity * numericUnitPrice;

    return (
        <div className="original-price">{'$' + originalPrice}</div>
    );
}

function ProductItem({ id, imageSrc, productName, unitPrice, quantity, onQuantityChange, onRemove}) {
    const handleRemove = () => {
        onRemove(id);
    };

    const handleQuantityChange = (newQuantity) => {
        onQuantityChange(id, newQuantity);
    };

    return (
        <div className="product-item">
            <div className="product-details">
                <button className="remove-button" onClick={handleRemove}>
                    <i className="remove-button-title">x</i>
                </button>
                <ProductImage imageSrc={imageSrc} productName={productName} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ProductInfo productName={productName} />
                    <ProductPrice quantity={quantity} unitPrice={unitPrice} />
                </div>
            </div>
            <div className="product-price">
                <QuantityButton
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                />
                <div className="unit-price">{unitPrice}</div>
            </div>
        </div>
    );
}

function CheckoutButton({ onClick }) {
    return (
        <button className="checkout-button" onClick={onClick}>
            <span className="checkout-text">Checkout</span>
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0408b7fbfce7a0d33ac6c40b0f2ba42f322aa075a23f31101e4ea0ccbc14229?apiKey=a823bb3ee71445d9895c0391c36ad3f8&"
                alt=""
                className="checkout-background"
            />
        </button>
    );
}

// const products = [
//     {
//         id: 1,
//         imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/61472d8ccde9ec49c2ced7a21659b9bbdaa1deecbdbe3c108a9c72673f17168e?apiKey=a823bb3ee71445d9895c0391c36ad3f8&",
//         productName: "Nike Airmax 270 react",
//         unitPrice: "$499",
//         quantity: 1,
//     },
//     {
//         id: 2,
//         imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c566ee1d6bcfbbdc9d6e0410ec5b1647488d0b79c25ef5e867e291fa108d1471?apiKey=a823bb3ee71445d9895c0391c36ad3f8&",
//         productName: "Nike Airmax 270 react",
//         unitPrice: "$499",
//         quantity: 1,
//     },
// ];

function QuantityButton({ quantity, onQuantityChange }) {
    const handleIncrease = () => {
        onQuantityChange(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    return (
        <div className="quantity-btn-container">
            <div className="quantity-btn">
                <button className="decrease-btn" onClick={handleDecrease}>-</button>
                <span className="quantity-display">{quantity}</span>
                <button className="increase-btn" onClick={handleIncrease}>+</button>
            </div>
        </div>
    );
}

function TotalPrice({ label, subtotal, onSubtotalUpdate }) {
    const totalPrice = subtotal + 20;

    return (
        <div className="price-summary">
            <div className="price-label">{label}</div>
            <div className="price-value">${totalPrice}</div>
        </div>
    );
}

function MyComponent() {
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    
    const isEmptyCart = products.length === 0;
    
    useEffect(() => {
        fetch('https://support.mollywlove.ru/api/view_cart_from_db') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
            });
    }, []);  

    useEffect(() => {
        const newSubtotal = products.reduce((total, product) => {
            const numericUnitPrice = parseFloat(product.unitPrice.replace('$', ''));
            return total + numericUnitPrice * product.quantity;
        }, 0);
        setSubtotal(newSubtotal);
    }, [products]);

    const handleQuantityChange = (productId, newQuantity) => {
        setProducts(products.map(product =>
            product.id === productId ? { ...product, quantity: newQuantity } : product
        ));
        const newSubtotal = products.reduce((total, product) => {
            const numericUnitPrice = parseFloat(product.unitPrice.replace('$', ''));
            return total + numericUnitPrice * product.quantity;
        }, 0);
        setSubtotal(newSubtotal);
    };

    const handleSubtotalUpdate = (newSubtotal) => {
        setSubtotal(newSubtotal);
    };

    const handleRemove = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    const handleCheckout = () => {
        setShowPopup(true);
    };

    const handleShowSuccessPopup = () => {
        setShowSuccessPopup(true);
    };

    const handleCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    // const [products, setProducts] = useState([
    //     {
    //         id: 1,
    //         imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/61472d8ccde9ec49c2ced7a21659b9bbdaa1deecbdbe3c108a9c72673f17168e?apiKey=a823bb3ee71445d9895c0391c36ad3f8&",
    //         productName: "Nike Airmax 270 react",
    //         unitPrice: "$499",
    //         quantity: 1,
    //     },
    //     {
    //         id: 2,
    //         imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c566ee1d6bcfbbdc9d6e0410ec5b1647488d0b79c25ef5e867e291fa108d1471?apiKey=a823bb3ee71445d9895c0391c36ad3f8&",
    //         productName: "Nike Airmax 270 react",
    //         unitPrice: "$499",
    //         quantity: 1,
    //     },
    // ]);

    return (
            <>
            {showSuccessPopup && (
                <div className="popup-overlay">
                    <div className="success-popup">
                        <div className="success-popup-content">
                            <h2>Order Successful!</h2>
                            <p>Your order has been successfully placed.</p>
                            <button onClick={handleCloseSuccessPopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <main className="popup-container">
                            <form className="form-wrapper">
                            <h1 className="form-title">Order</h1>
                            {fields.map(({ label, placeholder }) => (
                                <InputField key={label} label={label} placeholder={placeholder} isTextarea={label === 'Address for Delivery'} />
                            ))}
                            <button type="submit" className="confirm-button" onClick={() => {
                                setShowPopup(false);
                                setShowSuccessPopup(true);
                                }}>
                                Confirm order
                            </button>
                            </form>
                        </main>
                    </div>
                </div>
            )}
            {isEmptyCart ? (
                <div className='page404__container container'>
                <p className='page404__title'>Ничего</p>
                <h1>Упс! Корзина пуста.</h1>
                <p className='page404__text'>Добавьте понравившиеся товары из каталога в корзину.</p>
                <div className="back_btn__container">
                    <button className="back_btn">
                        <i className='home-icon uil uil-estate'></i>
                        <a href='/'>Вернуться домой</a>
                    </button>
                </div>
            </div>
            ) : (
                <>
            <div className="product-grid-container">
                <div className="product-title">ПРОДУКТ</div>
                <div className="quantity-label">КОЛ-ВО</div>
                <div className="unit-price-label">ЦЕНА  </div>
            </div>
            <div className="separator" />

            {products.map((product) => (
                <React.Fragment key={product.id}>
                    <ProductItem {...product} onQuantityChange={handleQuantityChange} onRemove={handleRemove}/>
                    <div className="separator" />
                </React.Fragment>
            ))}
            <div className="price-summary">
                <div className="price-labels">
                    <div className="subtotal-label">Сумма</div>
                    <div className="shipping-label">Доставка</div>
                </div>
                <div className="price-values">
                    <div className="subtotal-value">${subtotal}</div>
                    <div className="shipping-value">$20</div>
                </div>
            </div>
            <div className="total-separator" />
            <TotalPrice
                label="ИТОГО"
                subtotal={subtotal}
                onSubtotalUpdate={handleSubtotalUpdate}
            />
            <div className="checkout-button-container">
                <CheckoutButton onClick={handleCheckout} />
            </div>
            <style jsx>{`
            .input-field {
                width: 100%;
                display: flex;
                flex-direction: column;
            }
        `}</style> 
        </>)} 
        </>
    );
}
const Cart = () => {
    return (
        <>
            <section className='cart'>
                <Header />
                <BreadCrumbs />
                <div className='cart__container container'>
                    <MyComponent />
                </div>
                <Footer />
            </section>
        </>
    )
}

export default Cart