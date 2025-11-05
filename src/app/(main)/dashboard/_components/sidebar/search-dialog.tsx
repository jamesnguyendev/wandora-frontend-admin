"use client";
import * as React from "react";

import Link from "next/link";

import { LayoutDashboard, Search, Users, Link as LinkIcon, UserRoundCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const searchItems = [
  { group: "Overview", icon: LayoutDashboard, label: "Home", link: "/dashboard/user" },
  { group: "Overview", icon: Users, label: "Users", link: "/dashboard/user" },
  { group: "Services", icon: UserRoundCheck, label: "Tour", link: "/dashboard/tour", disabled: true },
  { group: "Services", icon: LinkIcon, label: "Booking", link: "/dashboard/booking", disabled: true },
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="link"
        className="text-muted-foreground !px-0 font-normal hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        Search...
        <kbd className="bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search by categoryies" />
        <CommandList>
          <CommandEmpty>No result data.</CommandEmpty>
          {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group} key={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <Link href={item.link} key={item.label}>
                      <CommandItem className="!py-1.5" onSelect={() => setOpen(false)}>
                        {item.icon && <item.icon />}
                        {item.label}
                      </CommandItem>
                    </Link>
                  ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
