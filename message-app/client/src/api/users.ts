const ROOT = 'http://localhost:3000/api/users';

export type CreateUserRequest = {
  username: string;
  sub: string;
  email: string;
  displayName: string;
  profileImage: string;
  bio: string;
  headerImage: string;
};

export const createOrUpdate = async (user) => {
  return fetch(ROOT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}