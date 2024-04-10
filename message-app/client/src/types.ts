export type IUser = {
  _id: string;
  username: string;
  sub: string;
  email: string;
  displayName: string;
  joinedDate: string;
  profileImage: string;
  bio: string;
  headerImage: string;
  __v: number;
  followers: IUser[];
  following: IUser[];
};

export type IMessage = {
  _id: string;
  __v: number;
  body: string;
  createdDate: string;
  likes: IUser[];
  author: IUser;
  authorId: string;
  likeIds: string[];
};

export type Notification = {
  _id: string;
  __v: number;
  type: "LIKE" | "FOLLOW" | "NEW_MESSAGE";
  createdDate: string;
  user: IUser;
  author: IUser;
  isRead: boolean;
};
