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
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { LuLock } from "react-icons/lu";
import { createUser } from "@/app/utils/actions";
import { toast } from "sonner";

export function SignupForm() {
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
    const result = await createUser(data);

    if(result.status == "error"){
        toast.error(result.message)
    }else {
        toast.success(result.message)
    }

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
                <Button type="submit" className="w-full">
                  <LuLock />
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
