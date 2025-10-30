import { collection, doc, getDoc, getDocs, query, where, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import localProducts from "../data/products.json";

const COL = "products";

function hasFirebaseEnv() {
  try {
    return Boolean(import.meta.env.VITE_FIREBASE_PROJECT_ID);
  } catch {
    return false;
  }
}

export async function fetchProducts(categoryId) {
  // Try Firestore first if env exists
  if (hasFirebaseEnv()) {
    try {
      const colRef = collection(db, COL);
      const q = categoryId ? query(colRef, where("category", "==", categoryId)) : colRef;
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (data.length) return data;
    } catch (e) {
      console.warn("[fetchProducts] Firestore unavailable, falling back to local JSON.", e);
    }
  }
  // Fallback to local JSON
  return categoryId ? localProducts.filter(p => p.category === categoryId) : localProducts;
}

export async function fetchProductById(id) {
  if (hasFirebaseEnv()) {
    try {
      const docRef = doc(db, COL, id);
      const snap = await getDoc(docRef);
      if (snap.exists()) return { id: snap.id, ...snap.data() };
    } catch (e) {
      console.warn("[fetchProductById] Firestore unavailable, falling back to local JSON.", e);
    }
  }
  // Fallback
  const found = localProducts.find(p => p.id === id);
  if (!found) throw new Error("Producto no encontrado");
  return found;
}

// Seed Firestore using the bundled local products
export async function seedProductsToFirestore() {
  if (!hasFirebaseEnv()) {
    throw new Error("Variables de entorno de Firebase no configuradas. No se puede sembrar.");
  }
  const ops = localProducts.map(async (p) => {
    const { id, ...rest } = p;
    await setDoc(doc(db, COL, id), rest, { merge: true });
  });
  await Promise.all(ops);
  return localProducts.length;
}
