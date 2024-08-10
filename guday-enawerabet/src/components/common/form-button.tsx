'use client'

import { Button } from "@nextui-org/react"
import { useFormStatus } from "react-dom"

interface FormButtonProps {
    children: React.ReactNode
}

const FormButoon = ({ children }: FormButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <Button isLoading={pending} type="submit">{children}</Button>
    )
}

export default FormButoon