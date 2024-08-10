import PostCreateForm from '@/components/posts/posts-create-form'
import React from 'react'

interface showTopicParams {
    params: {
        slug: string
    }
}

const ShowTopic = ({ params }: showTopicParams) => {
    const { slug } = params
    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            <div className='col-span-3'>
                <h1 className='text-2xl font-bold mb-2'> {params.slug}</h1>
            </div>
            <div className='flex flex-col gap-2'>
                <PostCreateForm slug={slug} />
                <div className='border w-64 p-2 shadow rounded'>
                    <h2 className='font-bold my-1'>{params.slug}</h2>
                    Here we will have some description
                </div>
            </div>
        </div>
    )
}

export default ShowTopic