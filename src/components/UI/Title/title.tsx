type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return <h1 className="text-2xl text-luoDarkBiege font-semibold tracking-wide">{title}</h1>;
}
