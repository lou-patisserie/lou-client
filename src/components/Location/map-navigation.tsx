import { Button } from "../UI/button";

export default function MapNavigationChannel() {
  const mapNav = () => {
    window.open("https://maps.app.goo.gl/upummRANJ3cR3HC46");
  };
  return (
    <Button onClick={mapNav} className="bg-luoDarkBiege text-luoBiege hover:bg-[#e8dbca] rounded-none transition ease-in-out duration-150 mt-8 px-10">
      See on Google Maps
    </Button>
  );
}
