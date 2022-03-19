import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import { saveTokenAndAuthenticate } from "../lib/auth/auth-helpers";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    await fetch(`/v1/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        return res.json().then(async (data) => {
          const result = await saveTokenAndAuthenticate(data.token);
          if (result) {
            return router.push("/admin");
          }
          return router.push("/");
        });
      }
      res.json().then((data) => {
        setErrorMessage(data.error);
      });
    });
  };

  return (
    <DefaultLayout>
      <div>
        <form
          onSubmit={submit}
          style={{
            width: 100 + "%",
            maxWidth: 500 + "px",
            margin: 0 + " auto",
            padding: 15 + "px",
          }}
        >
          <h1>Signin</h1>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            className="form-control"
            placeholder="email@email.com"
            autoComplete="off"
            required
            pattern="[a-z0-9]+\.?[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <h6 className="text-danger">{errorMessage}</h6>
          <button type="submit" className="btn btn-info">
            Signin
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Signin;
