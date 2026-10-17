import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/quickcart-logo.png';
import hero from '../assets/grocery-woman.png';
import icon from '../assets/quickcart-icon.png';

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Login() {
  const navigate = useNavigate();
  const inlineRef = useRef(null);

  // One email value shared by the page input and both overlays.
  const [email, setEmail] = useState('');
  // true  = the Email input is visible right away (like your current page)
  // false = the "Email >" button shows first and turns into the input when clicked
  const [emailOpen, setEmailOpen] = useState(true);
  // which overlay is open: null | 'shop' | 'email'
  const [overlay, setOverlay] = useState(null);
  const [shopError, setShopError] = useState(false);

  const goToCheckout = () => {
    try { sessionStorage.setItem('qc-contact', email.trim()); } catch (e) { /* storage blocked */ }
    navigate('/checkout', { state: { contact: email.trim() } });
  };

  // lock page scroll and close with Esc while an overlay is open
  useEffect(() => {
    document.body.style.overflow = overlay ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') setOverlay(null);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [overlay]);

  // clicking the dark background closes the overlay
  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) setOverlay(null);
  };

  const openEmailInput = () => {
    setEmailOpen(true);
    setTimeout(() => inlineRef.current && inlineRef.current.focus(), 0);
  };

  // page email input + arrow  ->  overlay "Sign in"
  const submitInlineEmail = (e) => {
    e.preventDefault();
    if (email.trim()) setOverlay('email');
  };

  // overlay "Sign in with Shop"  ->  Continue
  const submitShop = (e) => {
    e.preventDefault();
    if (!isEmail(email.trim())) {
      setShopError(true);
      return;
    }
    goToCheckout();
  };

  const useEmailInstead = () => {
    setOverlay(null);
    setEmailOpen(true);
    setTimeout(() => {
      if (inlineRef.current) {
        inlineRef.current.focus();
        inlineRef.current.select();
      }
    }, 0);
  };

  return (
    <>
      <main className="login">
        {/* Right-hand photo */}
        <img className="login__hero" src={hero} alt="" draggable="false" />

        {/* Logo */}
        <img className="qc-logo login__logo" src={logo} alt="QuickCart" draggable="false" />

        {/* Sign-in panel */}
        <section className="login__panel">
          <h1 className="login__title">Sign in</h1>
          <p className="login__subtitle">Sign in or create an account</p>

          <button
            type="button"
            className="login__shop"
            onClick={() => {
              setShopError(false);
              setOverlay('shop');
            }}
          >
            Continue with Shop
          </button>

          <div className="login__or" role="separator">
            <span className="login__or-line" />
            <span className="login__or-text">or</span>
            <span className="login__or-line" />
          </div>

          {emailOpen ? (
            /* Email input with arrow */
            <form className="login__email login__email--open" onSubmit={submitInlineEmail}>
              <input
                ref={inlineRef}
                className="login__email-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="login__arrow-btn" aria-label="Continue with email">
                <span className="login__arrow" />
              </button>
            </form>
          ) : (
            /* Email button (turns into the input when clicked) */
            <button type="button" className="login__email" onClick={openEmailInput}>
              <span className="login__email-label">Email</span>
              <span className="login__arrow" />
            </button>
          )}

          <p className="login__terms">
            By continuing, you agree to our{' '}
            <a href="#terms" onClick={(e) => e.preventDefault()}>
              Terms Of Service
            </a>
          </p>
        </section>
      </main>

      {/* ============ OVERLAY 1: Sign in with Shop ============ */}
      {overlay === 'shop' && (
        <div className="ov is-open" onClick={closeOnBackdrop}>
          <div className="ov__card ov__card--shop" role="dialog" aria-modal="true" aria-labelledby="shopTitle">
            <div className="ov__logos">
              <span className="ov__circle ov__circle--shop">shop</span>
              <span className="ov__circle ov__circle--qc">
                <img src={icon} alt="QuickCart" draggable="false" />
              </span>
            </div>

            <h2 className="ov__title" id="shopTitle">
              Sign in with Shop
            </h2>
            <p className="ov__sub">
              To continue to <strong>quickcart</strong>
            </p>

            <form onSubmit={submitShop} noValidate>
              <input
                className={`ov__input${shopError ? ' is-invalid' : ''}`}
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShopError(false);
                }}
              />
              {shopError && <p className="ov__error">Please enter a valid email.</p>}
              <button className="ov__primary" type="submit">
                Continue
              </button>
            </form>

            <p className="ov__terms">
              By continuing,you agree to quickcart's terms, privacy policy,
              <br />
              and to sharing your email, name, and avatar with quickcart.
              <br />
              See their terms and privacy policy.
            </p>
          </div>
        </div>
      )}

      {/* ============ OVERLAY 2: Sign in with your email ============ */}
      {overlay === 'email' && (
        <div className="ov is-open" onClick={closeOnBackdrop}>
          <div className="ov__card ov__card--email" role="dialog" aria-modal="true" aria-labelledby="emailTitle">
            <h2 className="ov__heading" id="emailTitle">
              Sign in
            </h2>
            <p className="ov__hint">Sign in or create an account</p>

            <div className="ov__account">
              <div className="ov__account-row">
                <svg className="ov__account-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3.2" />
                  <path d="M5.8 18.6c1.4-2.6 3.7-3.9 6.2-3.9s4.8 1.3 6.2 3.9" />
                </svg>
                <span className="ov__account-email">{email.trim()}</span>
              </div>
              <button type="button" className="ov__shopbtn" onClick={goToCheckout} autoFocus>
                Continue with shop
              </button>
            </div>

            <button type="button" className="ov__link-btn" onClick={useEmailInstead}>
              Use email instead
            </button>
            <a className="ov__privacy" href="#privacy" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
          </div>
        </div>
      )}
    </>
  );
}
