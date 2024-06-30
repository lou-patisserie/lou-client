import { BadgeCheck, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Card, CardContent } from "@/components/UI/card";

type Props = {
  name: string;
  content: string;
};

const getInitials = (name: string) => {
  const nameArray = name.split(" ");
  const initials = nameArray.map((word) => word.charAt(0)).join("");
  return initials.toUpperCase();
};

export default function TestimonyItem({ name, content }: Props) {
  return (
    <>
      <Card className="w-full max-w-md  bg-white shadow-lg rounded-lg ">
        <CardContent className="grid gap-2 md:gap-6 p-2 md:p-6">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4">
            <Avatar className="w-10 h-10 md:w-14 md:h-14 border-2 border-transparent ">
              <AvatarImage src="" />
              <AvatarFallback className="bg-luoBiege text-sm md:text-base">{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-gray-800  text-sm md:text-base">{name}</h4>
            </div>
          </div>
          <div className="text-xs md:text-sm leading-relaxed text-gray-600  line-clamp-5">
            <p>{content}</p>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <Star fill="gold" className="text-transparent" size={18} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// {
//   /* <Card className="h-[180px] bg-luoBiege border-none shadow-md">
//         <div className="p-4 flex flex-col gap-2">
//           <div className="flex flex-row gap-1 w-full items-center">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <div key={index}>
//                 <Star fill="gold" className="text-transparent" size={18} />
//               </div>
//             ))}
//             <BadgeCheck size={24} strokeWidth={1.5} className="text-slate-700" />
//           </div>
//           <p className="line-clamp-5 text-slate-700 font-normal text-sm" title={content}>
//             {content}
//           </p>
//         </div>
//       </Card>
//       <Card className="flex flex-row gap-2 p-2 border-none shadow-none items-center">
//         <Avatar className="border">
//           <AvatarImage className="" src="/user.jpg" alt={name} />
//           <AvatarFallback>{name}</AvatarFallback>
//         </Avatar>
//         <div>
//           <span className="text-sm font-semibold tracking-wider text-slate-700">{name}</span>
//         </div>
//       </Card> */
// }
