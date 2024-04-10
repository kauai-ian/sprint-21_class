const ROOT = "http://localhost:3000/notifications";

export const markRead = async (isRead: boolean, token: string) => {
  const response = await fetch(`${ROOT}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isRead }),
  });
  return await response.json();
};
