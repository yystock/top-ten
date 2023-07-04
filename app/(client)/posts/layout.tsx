import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "Posts.",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto h-full max-w-7xl pt-12 sm:container">
      <div className="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
        <ul className="col-span-2 flex flex-col space-y-6">{children}</ul>

        {/* info sidebar */}
        <div className="order-first h-fit overflow-hidden rounded-lg border border-gray-200 md:order-last">
          <div className="px-6 py-4">
            <p className="py-3 font-semibold">Future Ad Area</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
