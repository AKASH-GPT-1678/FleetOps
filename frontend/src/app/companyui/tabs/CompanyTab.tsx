import { IoIosHome } from "react-icons/io";
import { FaUserTie, FaTruck } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";

export const CompanyTabs = (active : string) => [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: (
      <IoIosHome
        size={30}
        color={active === "dashboard" ? "#27BBF5" : "grey"}
      />
    ),
  },
  {
    label: "Drivers",
    key: "drivers",
    icon: (
      <FaUserTie
        size={30}
        color={active === "drivers" ? "#27BBF5" : "grey"}
      />
    ),
  },
  {
    label: "Delivery",
    key: "delivery",
    icon: (
      <MdLocalShipping
        size={30}
        color={active === "delivery" ? "#27BBF5" : "grey"}
      />
    ),
  },
  {
    label: "Report",
    key: "report",
    icon: (
      <MdOutlineReportProblem
        size={30}
        color={active === "report" ? "#27BBF5" : "grey"}
      />
    ),
  },
  {
    label: "Tracking",
    key: "tracking",
    icon: (
      <MdOutlineForwardToInbox
        size={30}
        color={active === "tracking" ? "#27BBF5" : "grey"}
      />
    ),
  },
  {
    label: "Vehicle",
    key: "vehicle",
    icon: (
      <FaTruck
        size={30}
        color={active === "vehicle" ? "#27BBF5" : "grey"}
      />
    ),
  },
  {
    label: "Settings",
    key: "settings",
    icon: (
      <IoSettingsSharp
        size={30}
        color={active === "settings" ? "#27BBF5" : "grey"}
      />
    ),
  },
];