import React, {  useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loading from "../Components/Utils/Loading";
import { useNavigate } from "react-router";

const MyChallenges = () => {
      const [data, setData] = useState([]);
      const auth = getAuth();
      const [loading, setLoading] = useState(true);
      const axiosInstance = useAxiosSecure();
      const user = auth.currentUser;
      const navigate = useNavigate();

      useEffect(() => {
            const loadingActivities = async () => {
                  console.log(user);

                  if (!user) return;
                  try {
                        const res = await axiosInstance.get(`/api/user-challenges?email=${user.email}`);
                        setData(res.data);
                  } catch (error) {
                        toast.error(error.message);
                  } finally {
                        setLoading(false);
                  }
            };
            loadingActivities();
      }, [auth, axiosInstance, user]);
      console.log(data);

      const shortTitle = (title = "") => {
            const words = title.split(" ");
            return words.length <= 20 ? title : words.slice(0, 10).join(" ") + "...";
      };
      if (loading) return <Loading />;
      return (
            <main className="py-20 px-20">
                  <div className="py-8">
                        <h2 className="font-semibold text-2xl">My Challenges</h2>
                        <p className="mt-1 text-gray-600">
                              Welcome back, <strong className="text-green-500">{user.displayName},</strong>
                              Here's look at your progress.
                        </p>
                  </div>
                  <div className="flex gap-8 mb-10">
                        <button className="btn">All</button>
                        <button className="btn">Ongoing</button>
                        <button className="btn">Completed</button>
                  </div>
                  <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {data?.map((item) => (
                              <div key={item._id} className="shadow rounded-b-md">
                                    <img
                                          src={item.imageUrl}
                                          alt={item.challengeTitle}
                                          className="w-full h-52 object-cover rounded-t-md"
                                    />
                                    <div className="p-4 flex justify-between items-center">
                                          <h2 className="font-semibold">
                                                {shortTitle(item.title || item.challengeTitle)}
                                          </h2>
                                          <span className="bg-green-200 text-gray-700 py-1 px-3 rounded-2xl">
                                                {item.role}
                                          </span>
                                    </div>
                                    <div className="p-4">
                                          <div className="flex justify-between items-center  text-gray-600 mb-3">
                                                <h4 className="font-bold text-gray-900">Progress </h4>
                                                <p> {Number(item.progress)}%</p>
                                          </div>
                                          <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div
                                                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                                      style={{ width: `${item.percentage}%` }}
                                                ></div>
                                          </div>
                                    </div>
                                    <div className="flex justify-end p-4 gap-8">
                                          <button className="py-2 px-4  rounded-md bg-pink-500 font-semibold hover:bg-pink-400 text-white">Update</button>
                                          <button
                                                onClick={() => navigate(`/challenges/${item.challengeId}`)}
                                                className="btn"
                                          >
                                                Details
                                          </button>
                                    </div>
                              </div>
                        ))}
                  </section>
            </main>
      );
};
export default MyChallenges;
