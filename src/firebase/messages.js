import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase-config";
const messageRef = collection(db, "messages");

export async function sendMessage(currentUser, currentRoom, text) {
  try {
    await addDoc(messageRef, {
      text,
      room: currentRoom,
      createdAt: serverTimestamp(),
      user: currentUser.displayName,
      userId: currentUser.uid,
      pfp: currentUser.photoURL,
    });
  } catch (error) {
    console.log(error);
  }
}
