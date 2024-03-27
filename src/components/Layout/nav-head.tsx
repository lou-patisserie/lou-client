import TopLogo from "./top-logo";
import { TopNavigationMenu } from "./top-nav-menu";

export default function NavHeader() {
  return (
    <div className="flex justify-between mx-10 mt-2.5">
      <div className="flex items-center text-center">
        <TopLogo />
      </div>
      <div className="">
        <TopNavigationMenu />
      </div>
      <div></div>
    </div>
  );
}
