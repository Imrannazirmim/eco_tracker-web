const AccountTab = () => (
  <>
    <h2 className="font-semibold text-lg mb-2 text-red-600">Account Management</h2>
    <p className="text-gray-500 text-sm mb-4">
      Permanently delete your account and all associated data.
    </p>

    <button className="px-4 py-2 bg-red-600 text-white rounded opacity-50 cursor-not-allowed">
      Delete Account
    </button>
  </>
);

export default AccountTab;
