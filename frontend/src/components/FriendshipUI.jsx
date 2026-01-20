import { useEffect, useState } from "react";
import apiFetch from "../util/fetch";

export default function FriendshipUI({ friendship, user }) {
  const [userSender, setUserSender] = useState(friendship.user_id === user);
  const [relationshipStatus, setRelationshipStatus] = useState(null);
  useEffect(() => {
    if (friendship.blocked_by === null && friendship.status === "PENDING") {
      setRelationshipStatus(
        userSender
          ? {
              message: "Request sent, waiting on acceptance",
              actions: ["CANCEL", "BLOCK"],
            }
          : {
              message: "User has sent you a friend request",
              actions: ["ACCEPT", "DENY", "BLOCK"],
            },
      );
    } else if (friendship.blocked_by !== null) {
      setRelationshipStatus(
        user === friendship.blocked_by
          ? {
              message: "You have blocked this user",
              actions: ["UNBLOCK"],
            }
          : {
              message: "User has blocked you",
              actions: [],
            },
      );
    }
  }, [friendship]);
  return (
    <div>
      <p>{relationshipStatus && relationshipStatus.message}</p>
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "REQUEST") && (
          <button
            type="button"
            onClick={() =>
              apiFetch(`user/friend`, {
                method: "POST",
                body: {
                  friendId: userSender ? friendship.friend_id : user,
                },
              })
            }
          >
            Send Friend Request
          </button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "DENY") && (
          <button
            type="button"
            onClick={() => {
              apiFetch(`user/friend/${friendship.id}/cancel`, {
                method: "PATCH",
              });
            }}
          >
            Deny Request
          </button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "CANCEL") && (
          <button
            type="button"
            onClick={() => {
              apiFetch(`user/friend/${friendship.id}/cancel`, {
                method: "PATCH",
              });
            }}
          >
            Cancel Request
          </button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "ACCEPT") && (
          <button
            type="button"
            onClick={() => {
              apiFetch(`user/friend/${friendship.id}/accept`, {
                method: "PATCH",
              });
            }}
          >
            Accept Request
          </button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "BLOCK") && (
          <button
            type="button"
            onClick={() => {
              apiFetch(`user/friend/${friendship.id}/block`, {
                method: "PATCH",
              });
            }}
          >
            Block User
          </button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "UNBLOCK") && (
          <button
            type="button"
            onClick={() => {
              apiFetch(`user/friend/${friendship.id}/unblock`, {
                method: "PATCH",
              });
            }}
          >
            Unblock User
          </button>
        )}
    </div>
  );
}
