import Link from "next/link";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    localStorage.removeItem("token");
    await router.push("/signin");
  };

  return (
    <li className="nav-item">
      <button onClick={logout}>Logout</button>
    </li>
  );
};

export default LogoutButton;
