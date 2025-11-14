const ProfileInputs = ({ profile, onChange }) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                  type="text"
                  name="displayName"
                  placeholder="Full Name"
                  value={profile.displayName}
                  onChange={onChange}
                  className="border border-gray-300 p-2 rounded"
            />

            <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={profile.username}
                  disabled
                  className="border border-gray-300 p-2 rounded bg-gray-100"
            />

            <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  disabled
                  className="border border-gray-300 p-2 rounded bg-gray-100"
            />

            <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={profile.location}
                  onChange={onChange}
                  className="border border-gray-300 p-2 rounded"
            />

            <textarea
                  name="bio"
                  placeholder="Bio"
                  rows={3}
                  value={profile.bio}
                  onChange={onChange}
                  className="border p-2 border-gray-300 rounded md:col-span-2"
            />
      </div>
);

export default ProfileInputs;
