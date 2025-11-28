import { signIn } from "next-auth/react";

export default function AuthButton() {
  return (
    <div className="register">
      <button
        type="button"
        className="mx-auto border border-blue-500 text-white font-semibold text-xl py-3 px-10 rounded-full bg-blue-500 transition-all hover:bg-white hover:text-blue-500 shadow-xl"
        onClick={() => {
          signIn('google');
        }}
      >
        Sign In
      </button>
    </div>
  );
}
