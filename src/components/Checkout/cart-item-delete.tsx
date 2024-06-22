import { Trash2 } from "lucide-react";
import { useToast } from "../UI/use-toast";

type Props = {
  onDelete: (id: string) => void;
  itemId: string;
  name: string;
};

export default function DeleteCartItem({ onDelete, itemId, name }: Props) {
  const { toast } = useToast();

  const handleDelete = () => {
    onDelete(itemId);
    toast({
      title: `Delete Success`,
      description: (
        <div className="flex flex-col gap-0">
          <span>{name} removed from your cart.</span>
        </div>
      ),
      duration: 5000,
      variant: "destructive",
    });
  };
  return (
    <button onClick={handleDelete}>
      <Trash2 className="hover:text-rose-700 focus:text-rose-700 transition duration-200 ease-in-out" />
    </button>
  );
}
