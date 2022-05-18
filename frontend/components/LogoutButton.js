import Link from "next/link";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    localStorage.removeItem("token");
    console.log("here");
    const logout = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/logout`,
      {
        method: "POST",
      }
    );
    const data = await logout.json();
    await router.push("/signin");
  };

  return (
    <li className="nav-item">
      <button onClick={logout}>Logout</button>
    </li>
  );
};

export default LogoutButton;
