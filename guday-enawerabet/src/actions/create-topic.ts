'use server'

import type { Topic } from "@prisma/client"
import path from "@/path"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { db } from "@/db"
import { z } from 'zod'


const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, { message: 'Must be lowercase letters or dashes with out spaces' }),
    description: z.string().min(15, { message: "Must be greater than 15 characters" })
})

interface createTopicFormState {
    errors: {
        name?: string[]
        description?: string[]
        _form?: string[]
    }
}

export async function createTopic(formstate: createTopicFormState, formData: FormData): Promise<createTopicFormState> {

    // await new Promise((resolve) => setTimeout(resolve, 2500))

    //make sure we are inserting a valid data
    const validationResult = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get("description")
    })

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
    const session = await auth()
    if (!session || !session.user) {
        return {
            errors: { _form: ['You must be signed in to do this.'] }
        }
    }

    let topic: Topic
    try {
        topic = await db.topic.create({
            data: {
                slug: validationResult.data.name,
                description: validationResult.data.description
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
                    _form: ['Some thing went wrong']
                }
            }
        }

    }

    revalidatePath('/')
    redirect(path.topicShow(topic.slug))


}