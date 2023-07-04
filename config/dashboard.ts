type DashboardItem = {
  title: string;
  link: string;
  spacing?: boolean;
  submenu?: boolean;
  submenuItems?: DashboardItem[];
  icon: string;
};

export const DashboardMenu: DashboardItem[] = [
  { title: "Dashboard", link: "/dashboard", icon: "dashboard" },
  { title: "Users", link: "/dashboard/users", icon: "user" },
  { title: "Stars", link: "/dashboard/stars", icon: "star" },
  { title: "Posts", spacing: true, link: "/dashboard/posts", icon: "post" },
  {
    title: "Blogs",
    link: "/dashboard/blogs",
    icon: "edit",
  },
  { title: "Analytics", link: "/dashboard/analytics", icon: "activity" },
  { title: "Settings", link: "/dashboard/settings", icon: "settings" },
];
