import { useEffect, useState } from "react";

export default function FriendshipUI({ friendship, user }) {
  const [userSender, setUserSender] = useState(friendship.user_id === user);
  const [relationshipStatus, setRelationshipStatus] = useState(null);
  useEffect(() => {
    switch (friendship.status) {
      case "ONE_PENDING_TWO":
        setRelationshipStatus(
          userSender
            ? {
                message: "Request sent, waiting on acceptance",
                actions: ["CANCEL"],
              }
            : {
                message: "User has sent you a friend request",
                actions: ["ACCEPT", "DENY"],
              }
        );
        break;
      case "TWO_PENDING_ONE":
        setRelationshipStatus(
          userSender
            ? {
                message: "User has sent you a friend request",
                actions: ["ACCEPT", "DENY"],
              }
            : {
                message: "Request sent, waiting on acceptance",
                actions: ["CANCEL"],
              }
        );
        break;
      case "DENIED":
        setRelationshipStatus({
          message: "You must be friends to send messages to this user",
          actions: ["REQUEST", "BLOCK"],
        });
        break;
      case "BLOCKED":
        setRelationshipStatus({
          message: "You have blocked each other",
          actions: ["UNBLOCK"],
        });
        break;
      case "ONE_BLOCKED_TWO":
        setRelationshipStatus(
          userSender
            ? {
                message: "You have blocked this user",
                actions: ["Unblock"],
              }
            : {
                message: "User has blocked you",
                actions: ["BLOCK"],
              }
        );
        break;
      case "TWO_BLOCKED ONE":
        setRelationshipStatus(
          userSender
            ? {
                message: "User has blocked you",
                actions: ["BLOCK"],
              }
            : {
                message: "You have blocked this user",
                actions: ["Unblock"],
              }
        );
        break;
    }
  }, [friendship]);
  return (
    <div>
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "REQUEST") && (
          <button type="button">Send Friend Reqeust</button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "DENY") && (
          <button type="button">Deny Request</button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "CANCEL") && (
          <button type="button">Cancel Request</button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "ACCEPT") && (
          <button type="button">Accept Request</button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "BLOCK") && (
          <button type="button">Block User</button>
        )}
      {relationshipStatus &&
        relationshipStatus.actions.some((e) => e === "UNBLOCK") && (
          <button type="button">Unblock User</button>
        )}
    </div>
  );
}
