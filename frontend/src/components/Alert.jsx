export default function Alert({ message, type }) {
  return <p className={`${type} alert`}>{message}</p>;
}
