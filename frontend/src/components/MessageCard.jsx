export default function MessageCard({ message }) {
  return (
    <div className="messageCard">
      <img src="#" alt="profilePicture" />
      <div className="messageBody">
        <div className="messageHeader">Username - postedTime</div>
        {message.image_url && <img src="#" alt="messageImage" />}
        <p>{message.content}</p>
      </div>
    </div>
  );
}
