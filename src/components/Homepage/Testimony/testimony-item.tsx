import { BadgeCheck, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Card } from "@/components/UI/card";

type Props = {
  name: string;
  content: string;
};

export default function TestimonyItem({ name, content }: Props) {
  return (
    <>
      <Card className="h-[180px] bg-luoDarkBiege border-none shadow-md">
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-row gap-1 w-full items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <Star fill="gold" className="text-transparent" size={15} />
              </div>
            ))}
            <BadgeCheck size={24} strokeWidth={1.5} className="text-white" />
          </div>
          <p className="line-clamp-5 text-white font-light" title={content}>
            {content}
          </p>
        </div>
      </Card>
      <Card className="flex flex-row gap-2 p-2 border-none shadow-none items-center">
        <Avatar className="border">
          <AvatarImage className="" src="/user.jpg" alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div>
          <span className="text-sm font-semibold tracking-wider text-slate-700">{name}</span>
        </div>
      </Card>
    </>
  );
}
