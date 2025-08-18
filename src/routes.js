import React from "react";

// Existing Admin Imports
import MainDashboard from "views/admin/Dashboard";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// New Admin Pages (TraceVita)
import Users from "./views/admin/Users";
import Recipes from "./views/admin/Recipes";
import EducationCards from "views/admin/EducationCards";
import PartnerOffers from "views/admin/PartnerOffers";
import MealPlans from "views/admin/MealPlans";
import AIAnalytics from "views/admin/AIAnalytics";
import Settings from "views/admin/Settings";
import Support from "views/admin/Suport";
import GiftCard from "views/admin/GiftCard";
import Reffreal from "views/admin/Reffreal";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdPeople,
  MdRestaurant,
  MdSchool,
  MdCardGiftcard,
  MdEventNote,
  MdInsights,
  MdSettings,
  MdSupport,
  MdShare,
  MdHeadset
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: <MdPeople className="h-6 w-6" />,
    component: <Users />,
  },
  {
    name: "API Analytics",
    layout: "/admin",
    path: "api-analytics",
    icon: <MdInsights className="h-6 w-6" />,
    component: <AIAnalytics />,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "settings",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Settings />,
  },
  {
    name: "Referral Management",
    layout: "/admin",
    path: "referral-management",
    icon: <MdShare className="h-6 w-6" />,
    component: <Reffreal />,
  },
  {
    name: "Gift Cards Management",
    layout: "/admin",
    path: "gift-cards-management",
    icon: <MdCardGiftcard className="h-6 w-6" />,
    component: <GiftCard />,
  },
  {
    name: "Support and Feedback",
    layout: "/admin",
    path: "support-feedback",
    icon: <MdHeadset className="h-6 w-6" />,
    component: <Support />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];

export default routes;
