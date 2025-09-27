import logo from '../assets/logo.png';

export default function Logo({ size = 40 }) {
  return (
    <img src={logo} alt="Vibbz logo" className="rounded" width={size} height={size} />
  );
}
