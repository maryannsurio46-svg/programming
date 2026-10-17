
const OPTIONS = [
  { id: 'ewallet', label: 'GCash, PayMaya' },
  { id: 'cod', label: 'Cash On Delivery' },
];

export default function PaymentOptions({ value, onChange }) {
  return (
    <div className="qc-pay" role="radiogroup" aria-label="Payment method">
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          className={`qc-pay__option${value === o.id ? ' is-selected' : ''}`}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
