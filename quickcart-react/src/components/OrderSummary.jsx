import { useState } from 'react';
import { PRODUCTS, formatPeso } from '../data/products.js';

export default function OrderSummary({
  items,
  subtotal,
  discount,
  shipping,
  total,
  appliedCode,
  onApplyCode,
}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    const result = onApplyCode(code);
    setError(result.ok ? '' : result.message);
    if (result.ok) setCode('');
  };

  return (
    <aside className="qc-summary" aria-label="Order summary">
      {items.map(({ productId, quantity }) => {
        const p = PRODUCTS[productId];
        return (
          <div className="qc-summary__item" key={productId}>
            <div className="qc-summary__thumb">
              <img src={p.image} alt={p.name} draggable="false" />
              <span className="qc-summary__badge">{quantity}</span>
            </div>
            <div className="qc-summary__info">
              <div className="qc-summary__name">{p.name}</div>
              <div className="qc-summary__meta">
                Unit of Measure: {p.unit}&nbsp;&nbsp;&nbsp;Quantity: {quantity}
              </div>
            </div>
            <div className="qc-summary__price">{formatPeso(p.price * quantity)}</div>
          </div>
        );
      })}

      <div className="qc-summary__code">
        <input
          className="qc-summary__code-input"
          type="text"
          placeholder="Discounted code"
          aria-label="Discount code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
        />
        <button
          type="button"
          className={`qc-summary__apply${code.trim() ? ' is-active' : ''}`}
          onClick={handleApply}
          disabled={!code.trim()}
        >
          Apply
        </button>
      </div>
      {(error || appliedCode) && (
        <p className={`qc-summary__note${error ? ' is-error' : ''}`}>
          {error || `Code ${appliedCode} applied`}
        </p>
      )}

      <dl className="qc-summary__rows">
        <div className="qc-summary__row">
          <dt>Subtotal</dt>
          <dd>{formatPeso(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="qc-summary__row">
            <dt>Discount</dt>
            <dd>-{formatPeso(discount)}</dd>
          </div>
        )}
        <div className="qc-summary__row">
          <dt>Shipping</dt>
          <dd className={shipping === null ? 'is-muted' : ''}>
            {shipping === null ? 'Enter Shipping Address' : formatPeso(shipping)}
          </dd>
        </div>
        <div className="qc-summary__row qc-summary__row--total">
          <dt>Total</dt>
          <dd>{formatPeso(total)}</dd>
        </div>
      </dl>
    </aside>
  );
}
