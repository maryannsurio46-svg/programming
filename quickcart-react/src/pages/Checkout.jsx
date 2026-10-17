import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuickCartLogo from '../components/QuickCartLogo.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import {
  PRODUCTS,
  INITIAL_CART,
  DISCOUNT_CODES,
  FLAT_SHIPPING_FEE,
} from '../data/products.js';

const REQUIRED = [
  ['contact', 'Email or mobile phone'],
  ['firstName', 'First name'],
  ['lastName', 'Last name'],
  ['address', 'Complete address'],
  ['barangay', 'Barangay'],
  ['zip', 'Zip code'],
  ['municipality', 'Municipality'],
  ['phone', 'Cellphone number'],
];

function readSavedContact() {
  try { return sessionStorage.getItem('qc-contact') || ''; } catch (e) { return ''; }
}

export default function Checkout() {
  const location = useLocation();

  const [values, setValues] = useState({
    contact: location.state?.contact ?? readSavedContact(),
    country: 'Philippines',
    firstName: '',
    lastName: '',
    address: '',
    barangay: '',
    zip: '',
    municipality: '',
    region: 'Northern Samar',
    phone: '',
    saveInfo: false,
  });
  const [payment, setPayment] = useState('ewallet');
  const [cart] = useState(INITIAL_CART);
  const [appliedCode, setAppliedCode] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (status.text) setStatus({ type: '', text: '' });
  };

  const handleToggleSave = () => setValues((v) => ({ ...v, saveInfo: !v.saveInfo }));

  // ----- totals -----
  const subtotal = useMemo(
    () => cart.reduce((sum, i) => sum + PRODUCTS[i.productId].price * i.quantity, 0),
    [cart]
  );
  const discount = appliedCode ? subtotal * DISCOUNT_CODES[appliedCode] : 0;
  const addressReady = Boolean(
    values.address.trim() && values.barangay.trim() && values.municipality.trim()
  );
  const shipping = addressReady ? FLAT_SHIPPING_FEE : null;
  const total = subtotal - discount + (shipping ?? 0);

  const handleApplyCode = (raw) => {
    const code = raw.trim().toUpperCase();
    if (!code) return { ok: false, message: 'Enter a discount code.' };
    if (!(code in DISCOUNT_CODES)) return { ok: false, message: 'That code is not valid.' };
    setAppliedCode(code);
    return { ok: true };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = REQUIRED.find(([key]) => !String(values[key]).trim());
    if (missing) {
      setStatus({ type: 'error', text: `${missing[1]} is required.` });
      return;
    }
    setStatus({
      type: 'success',
      text: `Order placed. Pay ${payment === 'cod' ? 'on delivery' : 'with GCash or PayMaya'}.`,
    });
  };

  return (
    <div className="checkout">
      <div className="checkout__panel">
        <header className="checkout__header">
          <QuickCartLogo className="checkout__logo" />
        </header>

        <div className="checkout__body">
          <section className="checkout__left">
            <CheckoutForm
              values={values}
              onChange={handleChange}
              onToggleSave={handleToggleSave}
              payment={payment}
              onPaymentChange={setPayment}
              onSubmit={handleSubmit}
              status={status}
            />
          </section>

          <section className="checkout__right">
            <OrderSummary
              items={cart}
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
              appliedCode={appliedCode}
              onApplyCode={handleApplyCode}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
