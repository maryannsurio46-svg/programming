import logo from '../assets/quickcart-logo.png';

export default function QuickCartLogo({ className = '' }) {
  return <img className={`qc-logo ${className}`} src={logo} alt="QuickCart" draggable="false" />;
}
