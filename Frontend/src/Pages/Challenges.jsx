import { MdDateRange } from "react-icons/md";
import useAxios from "../Hooks/useAxios.jsx";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../Contexts/RootContext.jsx";
import { ChallengeGridSkeleton } from "../Components/Utils/SkeletonLoader.jsx";

const Challenges = () => {
      const axiosInstance = useAxios();
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
      const { user } = useContext(AuthContext);

      const calculateDuration = (startDate, endDate) => {
            if (!startDate || !endDate) return 0;
            try {
                  const start = new Date(startDate);
                  const end = new Date(endDate);
                  const diffTime = Math.abs(end - start);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays;
            } catch (error) {
                  toast.error(error.message);
            }
      };

      useEffect(() => {
            const fetchChallenges = async () => {
                  try {
                        const response = await axiosInstance.get("/api/challenges");
                        setData(response.data);
                        setLoading(false);
                  } catch (error) {
                        toast.error(error.message);
                        setLoading(false);
                  }
            };
            fetchChallenges();
      }, [axiosInstance]);

      return (
            <>
                  <ToastContainer />
                  <main className="py-8 px-4 sm:px-8 lg:px-20">
                        <div className="text-center py-16 sm:py-32 space-y-4">
                              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold">
                                    Find Your Next EcoChallenge
                              </h2>
                              <p className="text-green-700">
                                    Join Global Community making difference, One Challenge at a time.
                              </p>
                              <input
                                    type="text"
                                    placeholder="Search for challenge"
                                    className="py-2 px-4 border border-gray-300 w-full max-w-xl rounded-3xl"
                              />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-10 sm:py-20 gap-4">
                              <div>
                                    <h2 className="text-green-900">Browse by Category</h2>
                                    <select className="select-category mt-3 px-4 py-2 border border-gray-300 rounded-lg">
                                          <option value="">All Categories</option>
                                          {[...new Set(data?.map((item) => item.category))].map((category) => (
                                                <option value={category} key={category}>
                                                      {category}
                                                </option>
                                          ))}
                                    </select>
                              </div>
                              <div>
                                    {user && (
                                          <button
                                                onClick={() => navigate("/create-challenges")}
                                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                          >
                                                Create Challenge
                                          </button>
                                    )}
                              </div>
                        </div>

                        {loading ? (
                              <ChallengeGridSkeleton count={8} />
                        ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {data && data.length > 0 ? (
                                          data.map((item) => (
                                                <div
                                                      onClick={() => navigate(`/challenges/${item._id}`)}
                                                      key={item._id}
                                                      className="shadow rounded-b-md cursor-pointer hover:shadow-lg transition-shadow"
                                                >
                                                      <img
                                                            src={item.imageUrl || "https://via.placeholder.com/400x300"}
                                                            alt={item.title}
                                                            className="w-full h-52 object-cover rounded-t-md"
                                                      />
                                                      <div className="flex flex-col mt-4 mb-4 gap-2 px-4">
                                                            <span className="text-green-700 text-[.8rem]">
                                                                  {item.category}
                                                            </span>
                                                            <p className="font-semibold">{item.title}</p>
                                                            <hr className="text-gray-200" />
                                                            <div className="flex items-center gap-2 text-[1rem] text-green-900">
                                                                  <MdDateRange />
                                                                  <p className="text-sm">
                                                                        {calculateDuration(
                                                                              item.startDate,
                                                                              item.endDate
                                                                        )}{" "}
                                                                        Days
                                                                  </p>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))
                                    ) : (
                                          <div className="col-span-full text-center py-12">
                                                <p className="text-gray-500 text-lg">No challenges available yet.</p>
                                                {user && (
                                                      <button
                                                            onClick={() => navigate("/create-challenges")}
                                                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                      >
                                                            Create First Challenge
                                                      </button>
                                                )}
                                          </div>
                                    )}
                              </div>
                        )}
                  </main>
            </>
      );
};

export default Challenges;
