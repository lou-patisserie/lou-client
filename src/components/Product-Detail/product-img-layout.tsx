import Image from "next/image";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../UI/resizable";

export default function ProductDetailImgs() {
  return (
    <div className="max-w-lg h-full mx-4 md:mx-0 flex flex-col gap-2 ">
      <div className="flex h-fit  items-start justify-center transition ease-in duration-150 hover:opacity-70">
        <Image src="/assets/dummy/Lou_Croissant2.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square rounded-lg shadow-lg" />
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex h-fit items-start justify-center transition ease-in duration-150 hover:opacity-70 ">
          <Image src="/assets/dummy/Lou_Croissant3.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square rounded-lg shadow-lg" />
        </div>
        <div className="flex h-fit items-start justify-center transition ease-in duration-150 hover:opacity-70 ">
          <Image src="/assets/dummy/Lou_Croissant0.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
}
