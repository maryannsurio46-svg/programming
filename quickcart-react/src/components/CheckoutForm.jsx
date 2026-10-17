import InputField, { SelectField } from './InputField.jsx';
import PaymentOptions from './PaymentOptions.jsx';

const COUNTRIES = ['Philippines', 'United States', 'Singapore', 'Japan', 'Australia'];

export default function CheckoutForm({
  values,
  onChange,
  onToggleSave,
  payment,
  onPaymentChange,
  onSubmit,
  status,
}) {
  return (
    <form className="qc-form" onSubmit={onSubmit} noValidate>
      <h2 className="qc-form__heading">Contact</h2>
      <InputField
        label="Email or Mobile Phone"
        name="contact"
        value={values.contact}
        onChange={onChange}
      />

      <h2 className="qc-form__heading qc-form__heading--delivery">Delivery</h2>
      <div className="qc-form__stack">
        <SelectField
          label="Country/Region"
          name="country"
          value={values.country}
          onChange={onChange}
          options={COUNTRIES}
        />

        <div className="qc-form__row">
          <InputField label="First Name" name="firstName" value={values.firstName} onChange={onChange} />
          <InputField label="Last Name" name="lastName" value={values.lastName} onChange={onChange} />
        </div>

        <InputField
          label="Complete Address"
          name="address"
          value={values.address}
          onChange={onChange}
        />
        <InputField label="Barangay" name="barangay" value={values.barangay} onChange={onChange} />

        <div className="qc-form__row">
          <InputField label="Zip Code" name="zip" value={values.zip} onChange={onChange} inputMode="numeric" />
          <InputField
            label="Municipality"
            name="municipality"
            value={values.municipality}
            onChange={onChange}
          />
        </div>

        <InputField label="Region" name="region" value={values.region} onChange={onChange} />
        <InputField
          label="Enter Cellphone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={onChange}
        />
      </div>

      <label className="qc-form__check">
        <input type="checkbox" checked={values.saveInfo} onChange={onToggleSave} />
        <span className="qc-form__check-box" aria-hidden="true" />
        <span className="qc-form__check-text">Save this information for next time</span>
      </label>

      <h2 className="qc-form__heading qc-form__heading--payment">Payment</h2>
      <PaymentOptions value={payment} onChange={onPaymentChange} />

      <div className="qc-form__submit">
        {status.text && (
          <p className={`qc-form__status${status.type === 'error' ? ' is-error' : ''}`} role="status">
            {status.text}
          </p>
        )}
        <button type="submit" className="qc-form__place">
          Place Order
        </button>
      </div>
    </form>
  );
}
