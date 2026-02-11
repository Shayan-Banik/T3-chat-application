import { ModeToggle } from "@/components/theme-toggle";
import { SunIcon } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-end border-b border-border bg-sidebar px-4 py-3">
      <ModeToggle />
    </div>
  );
};

export default Header;
