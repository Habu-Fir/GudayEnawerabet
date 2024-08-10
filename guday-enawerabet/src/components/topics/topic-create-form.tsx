'use client'

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@nextui-org/react'
import * as actions from '@/actions'
import { useFormState } from 'react-dom'
import FormButoon from '../common/form-button'

function TopicCreateForm() {

    const [formState, action] = useFormState(actions.createTopic, { errors: {} })

    return (
        <Popover placement='left'>
            <PopoverTrigger>
                <Button color='primary'> Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3 className='text-lg mx-2' >Create a title</h3>
                        <Input
                            name='name'
                            label='Name' placeholder='Name'
                            labelPlacement='outside'
                            isInvalid={!!formState.errors?.name}
                            errorMessage={formState.errors?.name?.join(', ')} />
                        <Textarea
                            name='description'
                            label='Description'
                            placeholder='Description'
                            labelPlacement='outside'
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(', ')}
                        />
                        {formState.errors._form ? <div className='border-red-400 bg-red-200 p-4 rounded'>{formState.errors._form?.join(', ')}</div> : null}
                        <FormButoon>Submit</FormButoon>
                    </div>
                </form>
            </PopoverContent>

        </Popover>
    )
}

export default TopicCreateForm