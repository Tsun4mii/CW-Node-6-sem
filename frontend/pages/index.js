import Head from "next/head";
import Image from "next/image";
import DefaultLayout from "../components/layouts/DefaultLayout";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch("/v1/authenticate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const content = await response.json();
      if (content.user) {
        setMessage(content.user.email);
        setRole(content.user.role);
        return setAuthenticated(true);
      }
      setAuthenticated(false);
    })();
  });
  return <DefaultLayout auth={authenticated} role={role}></DefaultLayout>;
}
