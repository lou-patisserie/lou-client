import { Input } from "../UI/input";

type Props = {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  typeName: string;
};

export default function SearchProducts({ searchQuery, onSearchChange, typeName }: Props) {
  return <Input type="search" value={searchQuery} onChange={onSearchChange} className="max-w-full md:max-w-md focus-visible:ring-luoDarkBiege rounded-none border-luoDarkBiege border-opacity-35" placeholder={`Search ${typeName} . . .`} />;
}
