import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { MdDynamicFeed } from "react-icons/md";
import { IoIosGitCompare } from "react-icons/io";
const tabs = [
  { name: "Feed", path: "/feed", icon: <MdDynamicFeed /> },
  { name: "Matches", path: "/feed/matches", icon: <FaHandshake /> },
  { name: "Messages", path: "/feed/messages", icon: <MdOutlineMessage /> },
  { name: "Requests", path: "/feed/requests", icon: <IoIosGitCompare /> },
];

const DashboardLayout = () => {
  return (
    <div className="min-h-[90vh] flex flex-col md:flex-row bg-gray-950 text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-60 border-r! border-gray-800 bg-gray-900 p-4!">
        <h2 className="text-xl font-semibold mb-6!">Dashboard</h2>
        <nav className="flex flex-col gap-2!">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end={tab.name === "Feed"}
              className={({ isActive }) =>
                `px-3! py-2! rounded-lg! ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
            >
              <div className="flex items-center gap-2!">
                <div className="text-xl">{tab.icon}</div>
                <p className="text-sm m-0">{tab.name}</p>{" "}
              </div>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4! md:p-6! overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile Bottom Tabs */}
      <nav className="fixed bottom-0 left-0 w-full md:hidden flex justify-around border-t border-gray-800 bg-gray-900 p-2!">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            end={tab.name === "Feed"}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-emerald-500" : "text-gray-400"
              }`
            }
          >
            <div className="flex gap-2!">
              <div className="text-lg">{tab.icon}</div>
              <p className="text-xs">{tab.name}</p>
            </div>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DashboardLayout;
