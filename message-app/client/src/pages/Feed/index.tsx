import { FC } from "react";
import { IMessage } from "../../types";

export type Props = {
  messages: IMessage[];
};

export const Feed: FC<Props> = ({ messages }) => {
  return (
    <div>
      <h1>Feed</h1>
    </div>
  );
};

const FeedPage = () => {
  // TODO get messages from API
  const messages = [] as IMessage[];

  return <Feed messages={messages} />;
};
export default FeedPage;
