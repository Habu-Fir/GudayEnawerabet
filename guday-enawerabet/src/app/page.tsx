import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicLists from "@/components/topics/topic-list";
import { Divider } from "@nextui-org/react";


export default function HomePage() {
  return (
    <div className="grid grid-cols-4 p-4 gap-4">
      <div className="col-span-3 ">
        <h1 className="font-bold text-xl m-2">TopPosts</h1>
      </div>
      <div className="py-2 px-2 shadow border">
        <TopicCreateForm />
        <Divider className="my-3" />
        <h3 className="text-lg my-4">Topic Lists</h3>
        <TopicLists />
      </div>
    </div>
  )
}
