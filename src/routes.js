import React from "react";

// Existing Admin Imports
import MainDashboard from "views/admin/Dashboard";
// import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// New Admin Pages (TraceVita)
import Users from "views/admin/Users";
import Recipes from "views/admin/Recipes";
import EducationCards from "views/admin/EducationCards";
import PartnerOffers from "views/admin/PartnerOffers";
import MealPlans from "views/admin/MealPlans";
import AIAnalytics from "views/admin/AIAnalytics";
import Settings from "views/admin/Settings";

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
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   path: "data-tables",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   component: <DataTables />,
  // },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  // 🌿 New Admin Routes for TraceVita
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: <MdPeople className="h-6 w-6" />,
    component: <Users />,
  },
  {
    name: "Recipes",
    layout: "/admin",
    path: "recipes",
    icon: <MdRestaurant className="h-6 w-6" />,
    component: <Recipes />,
  },
  {
    name: "Education Cards",
    layout: "/admin",
    path: "education-cards",
    icon: <MdSchool className="h-6 w-6" />,
    component: <EducationCards />,
  },
  {
    name: "Partner Offers",
    layout: "/admin",
    path: "partner-offers",
    icon: <MdCardGiftcard className="h-6 w-6" />,
    component: <PartnerOffers />,
  },
  {
    name: "Meal Plans",
    layout: "/admin",
    path: "meal-plans",
    icon: <MdEventNote className="h-6 w-6" />,
    component: <MealPlans />,
  },
  {
    name: "AI Analytics",
    layout: "/admin",
    path: "ai-analytics",
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
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];

export default routes;
