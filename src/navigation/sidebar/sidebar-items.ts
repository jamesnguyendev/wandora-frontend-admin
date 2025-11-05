import { type LucideIcon, PlaneTakeoff, ConciergeBell, Users } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Overview",
    items: [
      {
        title: "Users",
        url: "/dashboard/user",
        icon: Users,
      },
    ],
  },
  {
    id: 2,
    label: "Services",
    items: [
      {
        title: "Tours",
        url: "/dashboard/tour",
        icon: PlaneTakeoff,
      },
      {
        title: "Booking",
        url: "/dashboard/booking",
        icon: ConciergeBell,
      },
    ],
  },
];
