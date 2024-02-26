"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubGroupPayload } from "@/lib/validators/subgroup";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";
const Page = () => {
  const router = useRouter();

  const [input, setInput] = useState<string>("");
  const { loginToast } = useCustomToast();

  // We need to provide a context for using react query, check Provider.tsx for more !
  // inside mutateFn we do async api calls
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      (e.target as HTMLInputElement).value.trim() !== ""
    ) {
      createCommunity();
    }
  };
  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubGroupPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/subgroup", payload);
      return data as String;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Community already exists.",
            description: "Please choose a different name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid community name.",
            description: "Please choose a name between 3 and 21 letters.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "There was an error.",
        description: "Could not create community.",
        variant: "destructive",
      });
    },

    onSuccess: (data) => {
      router.push(`/k/${data}`);
    },
  });
  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a Community</h1>
        </div>

        <hr className="bg-red-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization cannot be changed. The
            minimum length of the name should be <b>3</b>.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              k/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            disabled={isLoading}
            variant="subtle"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length < 4}
            onClick={() => createCommunity()}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
