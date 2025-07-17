import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hi there! Need help picking a theme?", isSent: false },
  { id: 2, content: "Yeah! Just trying to find one that fits my vibe. 😄", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-24 max-w-5xl">
      <div className="space-y-10">
        {/* Theme Selection */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold">Choose Your Vibe</h2>
          <p className="text-sm text-base-content/70">
            Select a theme that matches your mood or productivity style.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-2 p-2 rounded-lg border border-transparent transition-all
                  ${theme === t ? "bg-base-200 border-primary ring-2 ring-primary/30" : "hover:bg-base-100"}
                `}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative w-full h-8 rounded-md overflow-hidden ring-1 ring-base-300 shadow-sm"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-0.5 p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center text-base-content/80">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Chat Preview */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Live Chat Preview</h3>

          <div className="rounded-xl overflow-hidden bg-base-100 border border-base-300 shadow-xl">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto space-y-4">
                {/* Chat UI */}
                <div className="bg-base-100 rounded-xl overflow-hidden border border-base-300">
                  {/* Header */}
                  <div className="px-4 py-3 bg-base-100 border-b border-base-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold">
                        A
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">AI Assistant</h4>
                        <p className="text-xs text-base-content/70">Online • Always ready</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-xl p-3 text-sm shadow-sm
                            ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200 text-base-content"}
                          `}
                        >
                          <p>{message.content}</p>
                          <p
                            className={`
                              text-[10px] mt-1.5
                              ${message.isSent ? "text-primary-content/70" : "text-base-content/60"}
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
