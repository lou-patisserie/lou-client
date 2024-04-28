import { Trash2 } from "lucide-react";

type Props = {
  onDelete: (id: number) => void;
  itemId: number; // Add this line
};

export default function DeleteCartItem({ onDelete, itemId }: Props) {
  return (
    <button onClick={() => onDelete(itemId)}>
      <Trash2 className="hover:text-rose-700 focus:text-rose-700 transition duration-200 ease-in-out" />
    </button>
  );
}
