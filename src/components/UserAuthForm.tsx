"use client";
import React, { FC, HtmlHTMLAttributes, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";

// By extending this we can pass anything to a comp. that a div has
// This is just a cool concept

interface UserAuthFormProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsloading] = useState(false);
  const { toast } = useToast();
  const signInWithGoogle = async () => {
    setIsloading(true);
    try {
      console.log("fun called");

      throw new Error("Error occured");
      await signIn("google");
    } catch (error) {
      // toast notification
      toast({
        title: "There was a problem",
        description: "There was a problem while logging through Goggle",
        variant: "destructive",
      });
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={signInWithGoogle}
        isLoading={isLoading}
        size={"sm"}
        className="w-full bg-green-400 text-white font-semibold rounded-full"
      >
        {" "}
        {isLoading ? null : (
          <Icons.google className="h-4 w-4 mr-2" />
        )}Google{" "}
      </Button>
    </div>
  );
};

export default UserAuthForm;
