const ProfilePictureUpload = ({ src, onChange, onRemove }) => (
  <div className="flex items-center gap-4 mb-4">
    <img
      src={src || "/default-avatar.png"}
      alt="Profile"
      className="w-20 h-20 rounded-full object-cover"
    />

    <div className="flex gap-2">
      <label className="px-3 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 text-sm">
        Change
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChange(e, "photoURL")}
        />
      </label>

      {src && (
        <button
          onClick={onRemove}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
        >
          Remove
        </button>
      )}
    </div>
  </div>
);

export default ProfilePictureUpload;
