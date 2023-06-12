import {
  IconDashboard,
  IconProperty,
  IconAgent,
  IconReview,
  IconProfile,
  IconMessage,
} from "@/components/icons";
import { TSidebarLink } from "../types/general.types";

export const sidebarLinks: TSidebarLink[] = [
  {
    id: 1,
    icon: <IconDashboard></IconDashboard>,
    title: "Dashboard",
    url: "/",
  },
  {
    id: 2,
    icon: <IconProperty></IconProperty>,
    title: "Property",
    url: "/property",
  },
  {
    id: 3,
    icon: <IconAgent></IconAgent>,
    title: "Agent",
    url: "/agent",
  },
  {
    id: 4,
    icon: <IconReview></IconReview>,
    title: "Review",
    url: "/review",
  },
  ,
  {
    id: 5,
    icon: <IconMessage></IconMessage>,
    title: "Message",
    url: "/message",
  },
  {
    id: 10,
    icon: <IconProfile></IconProfile>,
    title: "Profile",
    url: "/profile",
  },
];
