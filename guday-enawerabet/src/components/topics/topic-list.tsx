import React from 'react'
import { db } from '@/db'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'
import path from '@/path'



const TopicLists = async () => {

    const topics = await db.topic.findMany()
    const renderTopicLists = (
        topics.map((topic) => (
            <div key={topic.id}>
                <Link href={path.topicShow(topic.slug)}>
                    <Chip color='warning' variant='shadow'>
                        {topic.slug}
                    </Chip>
                </Link>
            </div>
        ))

    )


    return (
        <div className='flex flex-row gap-2 flex-wrap'>{renderTopicLists}</div>
    )
}

export default TopicLists