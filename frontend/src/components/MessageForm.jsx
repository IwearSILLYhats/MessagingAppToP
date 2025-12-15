import { useLayoutEffect, useRef, useState } from "react";
import submitImg from "../assets/submitImg.svg";

export default function MessageForm({}) {
  async function handleSubmit(event) {
    event.preventDefault(event);
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/user/friend`,
        {
          method: "POST",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            friendId: lookupList.id,
          }),
        }
      );
    }
  }
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  useLayoutEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${
        contentRef.current.scrollHeight + 5
      }px`;
    }
  }, [content]);

  return (
    <form
      action=""
      method="post"
      onSubmit={(e) => handleSubmit(e)}
      className="messageForm"
    >
      <input
        type="text"
        name="image_url"
        id="image_url"
        placeholder="Image Url"
      />
      <div>
        <button id="addImageButton">+</button>
        <textarea
          name="content"
          id="content"
          placeholder="Type your message here"
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button id="messageSubmit">
          <img src={submitImg} alt="submit message" />
        </button>
      </div>
    </form>
  );
}
