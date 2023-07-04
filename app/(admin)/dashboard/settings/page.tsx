import { DashboardHeader } from "@/components/Heading";

const Settings = async () => {
  return (
    <div className="grid items-start gap-8">
      <DashboardHeader heading="Settings" text="Site settings"></DashboardHeader>
    </div>
  );
};

export default Settings;
