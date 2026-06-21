"use client";

import React from "react";
import { Check, ChevronsDownIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/Components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { User } from "@/types";

const roles = [
  {
    id: 1,
    name: "Viewer",
    description: "Can view and comment."
  },
  {
    id: 2,
    name: "Developer",
    description: "Can view, comment and edit."
  },
  {
    id: 3,
    name: "Billing",
    description: "Can view, comment and manage billing."
  },
  {
    id: 4,
    name: "Owner",
    description: "Admin-level access to all resources."
  }
];

interface MemberItem {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  roleName: string;
}

interface Props {
  users?: User[];
}

export function TeamMembersCard({ users = [] }: Props) {
  // Convert User[] to MemberItem[]
  const initialMembers: MemberItem[] = React.useMemo(() => {
    if (users && users.length > 0) {
      return users.slice(0, 3).map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        avatar: `/images/avatars/0${(u.id % 4) + 1}.png`, // Mock avatar based on ID
        roleName: u.roles?.[0]?.name || "Viewer"
      }));
    }
    // Fallback Mock data
    return [
      {
        id: 1,
        name: "Toby Belhome",
        email: "contact@bundui.io",
        avatar: `/images/avatars/01.png`,
        roleName: "Viewer"
      },
      {
        id: 2,
        name: "Jackson Lee",
        email: "pre@example.com",
        avatar: `/images/avatars/02.png`,
        roleName: "Developer"
      },
      {
        id: 3,
        name: "Hally Gray",
        email: "hally@site.com",
        avatar: `/images/avatars/03.png`,
        roleName: "Viewer"
      }
    ];
  }, [users]);

  const [data, setData] = React.useState<MemberItem[]>(initialMembers);

  // Sync state if users prop updates
  React.useEffect(() => {
    setData(initialMembers);
  }, [initialMembers]);

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Invite your team members to collaborate.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {data.map((member, key) => {
          const userInitials = member.name
            ? member.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            : "US";

          return (
            <div key={key} className="flex min-w-0 items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <Avatar className="shrink-0">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-sm leading-none font-medium">{member.name}</p>
                  <p className="text-muted-foreground truncate text-sm">{member.email}</p>
                </div>
              </div>
              <Popover
                open={openIndex === key}
                onOpenChange={(isOpen) => setOpenIndex(isOpen ? key : null)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="shrink-0">
                    {member.roleName}{" "}
                    <ChevronsDownIcon className="text-muted-foreground ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="end">
                  <Command>
                    <CommandInput placeholder="Select new role..." />
                    <CommandList>
                      <CommandEmpty>No roles found.</CommandEmpty>
                      <CommandGroup>
                        {roles.map((role, roleKey) => (
                          <CommandItem
                            key={roleKey}
                            onSelect={() => {
                              setData((prevData) =>
                                prevData.map((m) =>
                                  m.id === member.id ? { ...m, roleName: role.name } : m
                                )
                              );
                              setOpenIndex(null);
                            }}
                            className="teamaspace-y-1 flex items-start px-4 py-2">
                            <div>
                              <p>{role.name}</p>
                              <p className="text-muted-foreground text-sm">{role.description}</p>
                            </div>
                            {member.roleName === role.name ? (
                              <Check className="text-primary ml-auto flex size-4" />
                            ) : null}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
