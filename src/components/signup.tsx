"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/app/utils/zodSchema";
import { FormField, FormItem, FormLabel, Form, FormControl, FormMessage } from "./ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Lock, Loader2 } from "lucide-react";
import { createUser } from "@/app/utils/actions";
import { toast } from "sonner";
import { useTransition } from "react";

export function SignupForm() {
    const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data:z.infer<typeof loginSchema>) => {
    // handle mutation here
    console.log(data);
    startTransition(
        async ()=>{
            try {
                const result = await createUser(data);
                if(result.status === "ERROR"){
                    toast.error(result.message)
                }else {
                    toast.success(result.message)
                }
                } catch (error) {
                    console.log(error)
                    toast.error("Something went wrong")
                }
        }
    )

  }
  return (
    <div className="flex flex-col gap-6 w-1/2">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Enter your email below to signup to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
              {/* <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                </div> */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        {...field}
                        placeholder="m@example.com"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
             <FormField control={form.control} name={'password'} render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Password
                    </FormLabel>
                    <FormControl>
                    <Input id="password" {...field} type="password" />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
              {/* <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div> */}
              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={isPending} className="w-full">
                  <Lock />
                  {isPending ? "Loading..." : "Signup"}
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
