import { useLayoutEffect, useRef, useState } from "react";
import submitImg from "../assets/submitImg.svg";

export default function MessageForm({ chat }) {
  async function handleSubmit(event) {
    event.preventDefault(event);
    const token = JSON.parse(localStorage.getItem("token"));
    if (token && content.length > 0) {
      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/chat/${chat}/message`,
        {
          method: "POST",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content,
            imageUrl: imageUrl,
          }),
        }
      );
    }
  }
  const [imageField, setImageField] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
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
      {imageField && (
        <input
          type="text"
          name="image_url"
          id="image_url"
          placeholder="Image Url"
          onChange={(e) => setImageUrl(e.target.value)}
        />
      )}
      <div>
        <button
          id="addImageButton"
          onClick={() => setImageField(!imageField)}
          key={"addImg"}
          type="button"
        >
          +
        </button>
        <textarea
          name="content"
          id="content"
          placeholder="Type your message here"
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button id="messageSubmit" type="submit" key={"submit"}>
          <img src={submitImg} alt="submit message" />
        </button>
      </div>
    </form>
  );
}
