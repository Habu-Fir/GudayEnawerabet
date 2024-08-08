import { Button } from "@nextui-org/react";
import * as actions from '@/actions'
import { auth } from '@/auth'
import Profile from "@/components/profile";
import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";

export default async function Home() {

  const session = await auth()

  return (
    <div className="m-4">
      <form action={signIn}> <Button className="space-x-2" type="submit">SignIn</Button></form>
      <form action={signOut}> <Button className="space-x-2" type="submit">SignOut</Button></form>
      {session?.user ? <div>SignedIn</div> : <div>SignedOut</div>}
      <div>
        <Profile />
      </div>
    </div>
  );
}
