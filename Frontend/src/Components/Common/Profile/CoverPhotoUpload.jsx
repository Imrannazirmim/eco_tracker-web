const CoverPhotoUpload = ({ src, onChange }) => (
  <div className="mb-4">
    <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
      {src ? (
        <img
          src={src}
          alt="Cover"
          className="w-full h-32 object-cover rounded mb-2"
        />
      ) : (
        <p className="text-gray-400 mb-2">Upload a cover photo</p>
      )}

      <label className="px-3 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 text-sm">
        Choose File
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChange(e, "coverPhoto")}
        />
      </label>
    </div>
  </div>
);

export default CoverPhotoUpload;
