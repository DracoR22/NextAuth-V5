'use client'

import CardWrapper from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { useState, useTransition } from "react"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { register } from "@/actions/register"

const RegisterForm = () => {

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
        email: '',
        password: '',
        name: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

    setError('')
    setSuccess('')

    startTransition(() => {
        // Server Action Call
        register(values)
        .then((data) => {
            setError(data.error)
            setSuccess(data.success)
        })
    })
  }

  return (
    <CardWrapper headerLabel="Create an account"
    backButtonLabel="Already have an account?"
    backButtonHref="/auth/login"
    showSocial>
      {/* LOGIN FORM */}
      <Form {...form}>
        <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* {showTwoFactor && (
              <FormField control={form.control} name="code" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="123456"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            )} */}
            {/* {!showTwoFactor && ( */}
              <>
              <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="Draciño" type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="john.doe@example.com" type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <Button size="sm" variant="link" asChild className="px-0 font-normal">
                        <Link href="/auth/reset">
                          Forgot password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </>
          {/* )} */}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {/* {showTwoFactor ? "Confirm" : "Login"} */} Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm