'use client'

import { useSession } from 'next-auth/react'

export default function Profile() {

    const session = useSession()
    if (session.data?.user) {
        return <div>From client the user: is SignedIn</div>
    }
    else { return <div> from client the user: is not signedIN</div> }


}
