import { useLoaderData, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/RootContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ChallengeDetailsCard from "../Common/ChallengeDetails/ChallengeDetailsCard";
import ChallengeHeader from "../Common/ChallengeDetails/ChallengeHeader";
import ChallengeDescription from "../Common/ChallengeDetails/ChallengeDescription";
import Participate from "../Common/ChallengeDetails/Participate";
import EnviromentImpact from "../Common/ChallengeDetails/EnvironmentImpact";
import CommunityGoal from "../Common/ChallengeDetails/CommunityGoal";
import ChallengeActions from "../Common/ChallengeDetails/ChallengeAction";
import ChallengeImage from "../Common/ChallengeDetails/ChallengeImage";
import { ArrowLeft } from "lucide-react";
import { ChallengeDetailsSkeleton } from "../Utils/SkeletonLoader";

const ChallengeDetails = () => {
      const challenge = useLoaderData();
      const navigate = useNavigate();
      const { user } = useContext(AuthContext);
      const axiosInstance = useAxiosSecure();
      const [loading, setLoading] = useState(true)

      const [alreadyJoined, setAlreadyJoined] = useState(false);
      const [isJoining, setIsJoining] = useState(false);
      const [participants, setParticipants] = useState(challenge?.participants || 0);

      useEffect(() => {
            const checkJoinStatus = async () => {
                  if (!user || !challenge?._id) return;
                  setLoading(true)
                  try {
                        const response = await axiosInstance.get(`/api/user-challenges?email=${user.email}`);
                        const userChallenges = response.data;
                        const hasJoined = userChallenges.some((uc) => uc.challengeId === challenge._id.toString());
                        setAlreadyJoined(hasJoined);
                  } catch (error) {
                        console.error("Error checking join status:", error);
                  }finally{
                        setLoading(false)
                  }
            };

            checkJoinStatus();
      }, [user, challenge?._id, axiosInstance]);

      if (!challenge) {
            return (
                  <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                              <h2 className="text-2xl font-bold text-gray-900 mb-4">Challenge Not Found</h2>
                              <button
                                    onClick={() => navigate("/challenges")}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                              >
                                    Back to Challenges
                              </button>
                        </div>
                  </div>
            );
      }

      const handleJoin = async () => {
            if (!user) {
                  Swal.fire({
                        title: "Login Required",
                        text: "Please login to join this challenge",
                        icon: "warning",
                        confirmButtonText: "Go to Login",
                  }).then((result) => {
                        if (result.isConfirmed) {
                              navigate("/sign");
                        }
                  });
                  return;
            }

            if (isJoining || alreadyJoined) return;

            try {
                  setIsJoining(true);
                  const res = await axiosInstance.post(`/api/challenges/join/${challenge._id}`);

                  if (res.data.success) {
                        setAlreadyJoined(true);
                        setParticipants((prev) => prev + 1);

                        Swal.fire({
                              title: "Success!",
                              text: "You have successfully joined the challenge.",
                              icon: "success",
                              confirmButtonColor: "#16a34a",
                        });
                  }
            } catch (error) {
                  const errorMessage = error.response?.data?.message || error.message || "Failed to join challenge";

                  Swal.fire({
                        title: "Oops!",
                        text: errorMessage,
                        icon: "error",
                        confirmButtonColor: "#dc2626",
                  });
            } finally {
                  setIsJoining(false);
            }
      };
      if(loading)return <ChallengeDetailsSkeleton/>

      return (
            <>
                  <ToastContainer />
                  <div className="min-h-screen bg-gray-50 py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <button
                                    className="mb-6 flex gap-2 px-4 py-2 bg-pink-200  hover:bg-pink-300 border border-gray-300 rounded-lg  transition-colors"
                                    onClick={() => navigate("/challenges")}
                              >
                                    <ArrowLeft/> Back to Challenges
                              </button>

                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Column */}
                                    <div className="lg:col-span-1 space-y-6">
                                          <ChallengeImage imageUrl={challenge.imageUrl} title={challenge.title} />
                                          <ChallengeDetailsCard challenge={challenge} participants={participants} />
                                    </div>

                                    {/* Right Column */}
                                    <div className="lg:col-span-2 space-y-6">
                                          <div className="bg-white rounded-2xl p-8 shadow-sm">
                                                <ChallengeHeader
                                                      category={challenge.category}
                                                      secondaryTag={challenge.secondaryTag}
                                                      title={challenge.title}
                                                />

                                                <ChallengeDescription description={challenge.description} />

                                                <Participate steps={challenge.howToParticipate} />

                                                <EnviromentImpact impact={challenge.environmentalImpact} />

                                                <CommunityGoal goal={challenge.communityGoal} />

                                                <ChallengeActions
                                                      onJoin={handleJoin}
                                                      alreadyJoined={alreadyJoined}
                                                      isJoining={isJoining}
                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default ChallengeDetails;
