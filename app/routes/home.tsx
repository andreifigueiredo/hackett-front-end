import ChatHeader from "~/components/ChatHeader";
import ChatBox from "../components/ChatBox";

export function meta() {
  return [
    { title: "Chat Box" },
    { name: "description", content: "Welcome to Chat Box!" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <ChatHeader />
      <ChatBox />
    </div>
  );
}
