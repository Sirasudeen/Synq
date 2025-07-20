import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col bg-base-100 transition-all duration-300">
      {/* Header */}
      <div className="border-b border-base-300 w-full px-4 py-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-primary" />
          <span className="font-semibold text-base-content hidden lg:block">Your Contacts</span>
        </div>

        {/* Filter toggle */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-base-content/80">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs"
            />
            <span>Online Only</span>
          </label>
          <span className="text-xs text-base-content/60">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3 px-2 space-y-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              group w-full flex items-center gap-3 px-3 py-2 rounded-lg
              hover:bg-base-200 transition
              ${selectedUser?._id === user._id ? "bg-base-200 ring-1 ring-primary/20" : ""}
            `}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/profile.jpg"}
                alt={user.fullName}
                className="size-10 lg:size-12 rounded-full object-cover border border-base-300"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>

            {/* Info (lg only) */}
            <div className="hidden lg:block min-w-0">
              <div className="font-medium text-sm truncate text-base-content">
                {user.fullName}
              </div>
              <div className="text-xs text-base-content/50">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-sm text-base-content/60 py-6">
            {showOnlineOnly ? "No users online" : "No contacts available"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
