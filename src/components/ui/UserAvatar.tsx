import { User } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback } from "./Avatar";
import Image from "next/image";
import { Icons } from "../Icons";
import { AvatarProps } from "@radix-ui/react-avatar";
interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            referrerPolicy="no-referrer"
            alt="profile pic"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span>
            <Icons.user className="h-4 w-4" />
          </span>
        </AvatarFallback>
      )}
    </Avatar>
  );
}
