const ROOT = "http://localhost:3000/messages";

export const listMessages = async () => {
  const response = await fetch(ROOT);
  return response.json();
};

export const getMessage = async (_id: string) => {
  const response = await fetch(`${ROOT}/${_id}`);
  return response.json();
};

export const createMessage = async (
  body: string,
  _id: string,
  token: string
) => {
  const response = await fetch(ROOT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      body,
      _id,
    }),
  });
  return response.json();
};

export const deleteMessage = async (_id: string, token: string) => {
  const response = await fetch(`${ROOT}/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.json();
};

export const likeMessage = async (
  _id: string,
  userId: string,
  token: string
) => {
  const response = await fetch(`${ROOT}/${_id}/like`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  return response.json();
};

export type UpdateMessage = {
  body: string;
  _id: string;
  userId: string;
  token: string;
};

export const updateMessage = async ({ _id, body, userId, token }: UpdateMessage) => {
  const response = await fetch(`${ROOT}/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body, userId }),
  });
  return response.json();
};
