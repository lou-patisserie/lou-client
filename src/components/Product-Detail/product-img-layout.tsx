import Image from "next/image";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../UI/resizable";

export default function ProductDetailImgs() {
  return (
    <ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg  mx-4">
      <ResizablePanel defaultSize={35}>
        <ResizablePanelGroup direction="vertical" className="pr-1">
          <ResizablePanel >
            <div className="flex h-full  items-center justify-center transition ease-in duration-150 hover:opacity-70">
            <Image src="/assets/dummy/Lou_Croissant2.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square"  />
            </div>
          </ResizablePanel>
          <ResizableHandle className="bg-transparent " />
          <ResizablePanel >
            <div className="flex h-full items-center  justify-center transition ease-in duration-150 hover:opacity-70 ">
            <Image src="/assets/dummy/Lou_Croissant3.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square"  />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle className="bg-transparent " />
      <ResizablePanel defaultSize={65}>
        <div className="flex h-[265px] items-center justify-center transition ease-in duration-150 hover:opacity-70 ">
          <Image src="/assets/dummy/Lou_Croissant0.jpg" width={900} height={900} alt="Luo Croissant" className="object-cover aspect-square"  />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
