import Link from "next/link";
import DottedSeparator from "./dotted-separator";
import Navigation from "./navigation";
import WorkspaceSwitcher from "./workspace-switcher";
import Projects from "./projects";

export const Sidebar = () => {
  return (
    <div className="h-full bg-neutral-100 p-4 w-full">
      <Link href={"/"} className="text-blue-700">
        TeamUp
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </div>
  );
};
