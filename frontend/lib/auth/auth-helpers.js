import { ADMIN_ROLE, USER_ROLE } from "./roles";

export const saveTokenAndAuthenticate = async (token) => {
  localStorage.setItem("token", token);
  const content = await tokenAuthenticate(token);
  if (isAdmin(content.user)) {
    return true;
  }
};

export const tokenAuthenticate = async (token) => {
  const response = await fetch(`/v1/authenticate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const content = await response.json();
  return content;
};

export const isAdmin = (user) => {
  if (user.role == ADMIN_ROLE) {
    return true;
  }
};

export const isUser = (user) => {
  if (user.role == USER_ROLE) {
    return true;
  }
};
