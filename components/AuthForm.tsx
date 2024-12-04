"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";



type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType:FormType)=>{
  return z.object({
    email:z.string().email(),
    fullName:formType ==="sign-up"?z.string().min(2).max(50):z.string().optional(),

  })
}


export default function AuthForm({ type }: { type: FormType }) {
  const [isLoading, SetIsloading] = useState(false);
  const [errorMessage, SeterrorMessage] = useState("");

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",email:""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);    
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign in" : "Sign Up"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Full Name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign-in" ? "sign in" : "sign up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin "
              />
            )}
          </Button>
          {errorMessage && <p>*{errorMessage}</p>}
          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account ?"
                : "Already Have An Account ?"}
            </p>
            <Link className="ml-1 font-medium text-brand" href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </form>
      </Form>
      {/* OTP Verification */}
    </>
  );
}
