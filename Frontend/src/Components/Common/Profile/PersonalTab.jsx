import CoverPhotoUpload from "./CoverPhotoUpload";
import ProfileInputs from "./ProfileInputs";
import ProfilePictureUpload from "./ProfilePictureUpload";


const PersonalTab = ({ profile, handleChange, handleFileChange, setProfile }) => {
  return (
    <>
      <h2 className="font-semibold text-lg mb-2">Personal Information</h2>
      <p className="text-gray-500 text-sm mb-4">
        Update your photo and personal details here.
      </p>

      <ProfilePictureUpload
        src={profile.photoURL}
        onChange={handleFileChange}
        onRemove={() => setProfile((prev) => ({ ...prev, photoURL: "" }))}
      />

      <CoverPhotoUpload src={profile.coverPhoto} onChange={handleFileChange} />

      <ProfileInputs profile={profile} onChange={handleChange} />

      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded opacity-50 cursor-not-allowed">
          Save Changes
        </button>
      </div>
    </>
  );
};

export default PersonalTab;
