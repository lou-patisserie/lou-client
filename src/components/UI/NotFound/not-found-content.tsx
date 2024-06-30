import Link from "next/link";
import classes from "./not-found.module.scss";

type Props = {
  content?: string;
};

export default function NotFoundContent({ content }: Props) {
  return (
    <div id={classes.notfound}>
      <div className={classes.notfound}>
        <div className={classes.notfound404}></div>
        <div className="flex flex-col gap-1">
          <h1 className="drop-shadow-sm">404</h1>
          <h2 className="drop-shadow-sm">Oops! Page Not Be Found</h2>
          <p className="drop-shadow-sm">{content || "Sorry but the page you are looking for does not exist, has been removed, name changed or is temporarily unavailable"}</p>
          <Link className="transition duration-200 ease-in-out hover:opacity-75" href="/">Back to homepage</Link>
        </div>
      </div>
    </div>
  );
}
