import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export async function createOrder({ buyer, items, total }) {
  const order = { buyer, items, total, createdAt: serverTimestamp() };
  const ref = await addDoc(collection(db, "orders"), order);
  return ref.id;
}
