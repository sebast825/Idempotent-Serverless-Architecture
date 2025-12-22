"use client";
import { signOut } from "../auth/actions";

export default function Dashboard() {
  return (
    <>
      <form action={signOut}>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </form>
      <h2>Estsamo en dashboard</h2>
    </>
  );
}
