import logo from '../assets/logo_dark.svg';

export default function Logo({ size = 100 }) {
  return (
    <img src={logo} alt="Vibbz logo" className="rounded" width={size} height={size} />
  );
}
