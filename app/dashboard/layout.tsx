import { ReactNode } from "react";
import NavLinks from "./components/Navlinks";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5">
      <NavLinks />
      {children}
    </div>
  );
}
