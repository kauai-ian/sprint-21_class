const ROOT = 'http://localhost:3000/users';
import { User } from "@auth0/auth0-react";

export const createOrUpdate = async (user: User) => {
  const res = await fetch(ROOT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return res.json();
}

export const getUser = async (sub: string) => {
  const res = await fetch(`${ROOT}/${sub}`);
  return res.json();
}

export const updateUser = async (sub: string, user: User) => {
  const res = await fetch(`${ROOT}/${sub}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return res.json();
}
