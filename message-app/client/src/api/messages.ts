const ROOT = "http://localhost:3000/messages";
export const create = async (body: string, authorId: string) => {
  try {
    const response = await fetch(ROOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body,
        authorId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const list = async () => {
  try {
    const response = await fetch(ROOT);
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
