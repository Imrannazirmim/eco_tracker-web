import { MdDateRange } from "react-icons/md";
import useAxios from "../Hooks/useAxios.jsx";
import { useEffect, useState } from "react";
import Loading from "../Components/Utils/Loading.jsx";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const Challenges = () => {
      const axiosInstance = useAxios();
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();

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
      if (loading) return <Loading />;
      return (
            <>
                  <ToastContainer />
                  <main className="py-8 px-20">
                        <div className="text-center py-32 space-y-4">
                              <h2 className="text-6xl font-semibold">Find Your Next EcoChallenge</h2>
                              <p className="text-green-700">
                                    Join Grobal Community making difference, One Challenge at a time.{" "}
                              </p>

                              <input
                                    type="text"
                                    placeholder="Search for challenge"
                                    className="py-2 px-4 border border-gray-300 w-3xl rounded-3xl"
                              />
                        </div>
                        <div className="py-20">
                              <h2 className=" text-green-900">Browse of Category</h2>
                              <select name="" id="" className="select-category mt-3">
                                    {[...new Set(data?.map((item) => item.category))].map((category) => (
                                          <option value={category} key={category}>
                                                {category}
                                          </option>
                                    ))}
                              </select> 
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                              {data &&
                                    data.map((item) => (
                                          <div
                                                onClick={() => navigate(`/challenges/${item._id}`)}
                                                key={item._id}
                                                className="shadow rounded-b-md"
                                          >
                                                <img
                                                      src={item.imageUrl}
                                                      alt=""
                                                      className="w-full h-52 object-cover rounded-t-md"
                                                />
                                                <div className="flex flex-col mt-4 mb-4 gap-2 px-4">
                                                      <span className="text-green-700  text-[.8rem]">
                                                            {item.category}
                                                      </span>
                                                      <p className="font-semibold">{item.title}</p>
                                                      <hr className="text-gray-200" />
                                                      <div className="flex items-center gap-2 text-[1rem] text-green-900">
                                                            <MdDateRange />

                                                            <p className="text-sm">{`${item.duration}Days`}</p>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                        </div>
                  </main>
            </>
      );
};
export default Challenges;
