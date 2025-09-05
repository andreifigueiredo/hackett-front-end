import ChatBox from "../components/ChatBox";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chat Box" },
    { name: "description", content: "Welcome to Chat Box!" },
  ];
}

export default function Home() {
  return <ChatBox />;
}
