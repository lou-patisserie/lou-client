import { Link } from "lucide-react";

type Props = {
  className?: string;
};

export default function ShareLinks({ className }: Props) {
  return (
    <button className={className}>
      <Link />
    </button>
  );
}
