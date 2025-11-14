const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
    <div className="flex flex-col gap-2">
      <button
        className={`text-left px-3 py-2 rounded ${
          activeTab === "personal" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
        }`}
        onClick={() => setActiveTab("personal")}
      >
        Personal Information
      </button>

      <button
        className={`text-left px-3 py-2 rounded ${
          activeTab === "account" ? "bg-red-100 text-red-700" : "hover:bg-gray-100"
        }`}
        onClick={() => setActiveTab("account")}
      >
        Account Management
      </button>
    </div>
  </div>
);

export {Sidebar}