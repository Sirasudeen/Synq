import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-12 bg-base-200/60">
      <div className="max-w-lg text-center space-y-8">
        {/* Icon Display */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-xl bg-primary/20 flex items-center
              justify-center animate-pulse shadow-md"
            >
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-semibold text-base-content">
          No Chat Selected
        </h2>
        <p className="text-base text-base-content/70">
          Choose a conversation from the sidebar or start a new one to begin chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
