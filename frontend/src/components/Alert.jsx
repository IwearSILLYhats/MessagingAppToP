export default function Alert({ message, type }) {
  return (
    <ul className={`${type} alert`}>
      {message.forEach((element, index) => {
        <li key={index}>
          <p>{message}</p>
        </li>;
      })}
      ;
    </ul>
  );
}
