// redirect(path.postShow(topic post.id))


// }

'use server'

import { auth } from "@/auth"
import { z } from "zod"
import type { Post } from "@prisma/client"
import { db } from "@/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import path from "@/path"

const createPostSchema = z.object({
    title: z.string().min(6),
    content: z.string().min(12)
})
interface createPostFormState {
    errors: {
        title?: string[]
        content?: string[]
        _form?: string[]
    }
}

export async function createPost(slug: string, formState: createPostFormState, formData: FormData): Promise<createPostFormState> {

    //Get valid date

    const validationResult = createPostSchema.safeParse({

        title: formData.get('title'),
        content: formData.get('content')

    })

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
    //check if the user is signed in
    const session = await auth()

    if (!session || !session.user) {
        return {
            errors: { _form: ['You must sign in to do this.'] }
        }
    }

    // Create adata in our data base

    //To find specific Id of topic for the post
    const topic = await db.topic.findFirst({
        where: { slug }
    })
    if (!topic) {
        return {
            errors: { _form: ['Topic not found'] }
        }
    }

    let post: Post;
    try {

        post = await db.post.create({
            data: {
                title: validationResult.data.title,
                content: validationResult.data.content,
                userId: session.user.id,
                topicId: topic?.id
            }
        })



    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        }
        else {
            return {
                errors: {
                    _form: ['Somethig went wrong']
                }
            }
        }

    }


    revalidatePath(path.topicShow(slug))
    redirect(path.postShow(slug, post.id))

}