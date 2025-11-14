import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ImpactStats from "../Components/Layout/ImpactStats";
import ImpactOverTimeChart from "../Components/Layout/ImpactOverTimeChart";
import ActivityBreakdownChart from "../Components/Layout/ActivityBreakdownChart";
import CompareImpact from "../Components/Layout/CompareImpact";
import Milestones from "../Components/Layout/Milestones";
import ActiveChallenges from "../Components/Layout/ActiveChallenges";
import { ActivitiesGridSkeleton, ActivityCardSkeleton } from "../Components/Utils/SkeletonLoader";

const MyActivities = () => {
      const [activities, setActivities] = useState([]);
      const [loading, setLoading] = useState(true);

      const auth = getAuth();
      const axiosSecure = useAxiosSecure();
      const navigate = useNavigate();

      useEffect(() => {
            const fetchData = async () => {
                  const user = auth.currentUser;

                  if (!user) {
                        toast.error("Please login to view your activities");
                        navigate("/login");
                        return;
                  }

                  try {
                        const token = await user.getIdToken();
                        const res = await axiosSecure.get("/api/user-challenges", {
                              headers: { Authorization: `Bearer ${token}` },
                        });

                        setActivities(res.data || []);
                  } catch (err) {
                        toast.error("Failed to load activities");
                        console.error(err);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchData();
      }, [auth, axiosSecure, navigate]);

      if (loading) {
            return <ActivityCardSkeleton />
      }

      return (
            <div className="min-h-screen p-6 text-white bg-linear-to-br from-gray-900 via-green-900 to-gray-900">
                  <div className=" mx-auto">
                        <h1 className="text-4xl font-bold mb-2">My Environmental Impact</h1>
                        <p className="text-gray-400 mb-8">See the positive change you’re making</p>

                        <ImpactStats activities={activities} />

                        <div className="grid grid-col-1 md:grid-col-2 lg:grid-cols-3 mx-auto gap-6 mt-10">
                              <ImpactOverTimeChart activities={activities} />
                              <ActivityBreakdownChart activities={activities} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                              <CompareImpact activities={activities} />
                              <Milestones activities={activities} />
                        </div>

                        <ActiveChallenges activities={activities} />
                  </div>
            </div>
      );
};

export default MyActivities;
