
/**
 * Floating-label field. Empty: the label sits centred like a placeholder.
 * Focused or filled: the label moves to the top and the value sits below it
 * (this is how "Region" and "Country/Region" look in the reference).
 */
export default function InputField({ label, name, value, onChange, type = 'text', ...rest }) {
  return (
    <div className="qc-field">
      <input
        className="qc-field__control"
        id={`f-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        {...rest}
      />
      <label className="qc-field__label" htmlFor={`f-${name}`}>
        {label}
      </label>
    </div>
  );
}

export function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="qc-field qc-field--select">
      <select
        className="qc-field__control qc-field__control--select"
        id={`f-${name}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label className="qc-field__label qc-field__label--top" htmlFor={`f-${name}`}>
        {label}
      </label>
      <span className="qc-field__caret" aria-hidden="true" />
    </div>
  );
}
