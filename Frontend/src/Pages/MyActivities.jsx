import React, { useState, useEffect } from "react";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Leaf, Droplets, Trash2, Zap, TrendingUp, Award } from "lucide-react";
import { getAuth } from "firebase/auth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const MyActivities = () => {
      const [activities, setActivities] = useState([]);
      const [loading, setLoading] = useState(true);
      const [timeFilter, setTimeFilter] = useState("week");
      const [activityType, setActivityType] = useState("all");
      const auth = getAuth();
      const axiosSecure = useAxiosSecure();
      const navigate = useNavigate();

      useEffect(() => {
            const fetchActivities = async () => {
                  const user = auth.currentUser;

                  if (!user) {
                        setLoading(false);
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
                        console.error("Error fetching activities:", err);
                        toast.error("Failed to load activities");
                  } finally {
                        setLoading(false);
                  }
            };

            fetchActivities();
      }, [auth, axiosSecure, navigate]);

      // Calculate impact statistics from activities
      const calculateImpactStats = () => {
            const totalProgress = activities.reduce((sum, activity) => sum + (activity.progress || 0), 0);
            const avgProgress = activities.length > 0 ? totalProgress / activities.length : 0;

            // Mock calculations - Replace with real impact data from your backend
            const co2Reduced = Math.round(avgProgress * 2.5);
            const waterSaved = Math.round(avgProgress * 15);
            const wasteDiverted = Math.round(avgProgress * 0.8);
            const energyConserved = Math.round(avgProgress * 1.2);

            return { co2Reduced, waterSaved, wasteDiverted, energyConserved };
      };

      // Generate weekly data based on activities
      const generateWeeklyData = () => {
            const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
            return days.map((day) => ({
                  day,
                  value: Math.floor(Math.random() * 15) + 10, // Mock data - replace with real data
            }));
      };

      // Generate activity breakdown by category
      const generateActivityBreakdown = () => {
            if (activities.length === 0) {
                  return [{ name: "No Data", value: 100, color: "#6b7280" }];
            }

            const categories = {};
            activities.forEach((activity) => {
                  const category = activity.challengeInfo?.category || "Other";
                  categories[category] = (categories[category] || 0) + 1;
            });

            const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
            return Object.entries(categories).map(([name, count], index) => ({
                  name,
                  value: Math.round((count / activities.length) * 100),
                  color: colors[index % colors.length],
            }));
      };

      // Calculate milestones
      const calculateMilestones = () => {
            const totalProgress = activities.reduce((sum, act) => sum + (act.progress || 0), 0);
            const completedChallenges = activities.filter(
                  (act) => act.status === "Finished" || act.progress >= 100
            ).length;
            const createdChallenges = activities.filter((act) => act.role === "creator").length;

            return [
                  {
                        icon: Leaf,
                        label: `${activities.length} Challenges Joined`,
                        achieved: activities.length >= 5,
                        color: activities.length >= 5 ? "text-green-500" : "text-gray-500",
                  },
                  {
                        icon: Droplets,
                        label: `${completedChallenges} Completed`,
                        achieved: completedChallenges >= 3,
                        color: completedChallenges >= 3 ? "text-blue-500" : "text-gray-500",
                  },
                  {
                        icon: Award,
                        label: `${createdChallenges} Created`,
                        achieved: createdChallenges >= 1,
                        color: createdChallenges >= 1 ? "text-yellow-500" : "text-gray-500",
                  },
                  {
                        icon: Zap,
                        label: "Impact Leader",
                        achieved: totalProgress >= 500,
                        color: totalProgress >= 500 ? "text-purple-500" : "text-gray-500",
                  },
            ];
      };

      const impactStats = calculateImpactStats();
      const weeklyData = generateWeeklyData();
      const activityData = generateActivityBreakdown();
      const milestones = calculateMilestones();

      const currentTotal = weeklyData.reduce((sum, item) => sum + item.value, 0);
      const previousTotal = 120; // Mock previous week data
      const percentChange = (((currentTotal - previousTotal) / previousTotal) * 100).toFixed(1);

      // Calculate comparison data
      const yourImpact = Math.min(100, Math.round(activities.reduce((sum, act) => sum + (act.progress || 0), 0) / 10));
      const communityAvg = 55;

      if (loading) {
            return (
                  <div className="min-h-screen bg-linear-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center">
                        <div className="text-center text-white">
                              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto mb-4"></div>
                              <p className="text-gray-300">Loading your impact data...</p>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-linear-to-br from-gray-900 via-green-900 to-gray-900 text-white p-6">
                  <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                              <h1 className="text-4xl font-bold mb-2">My Environmental Impact</h1>
                              <p className="text-gray-400">See the positive change you're making</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all">
                                    <p className="text-gray-400 text-sm mb-2">Total CO2 Reduced</p>
                                    <p className="text-3xl font-bold">{impactStats.co2Reduced} kg</p>
                              </div>
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
                                    <p className="text-gray-400 text-sm mb-2">Water Saved</p>
                                    <p className="text-3xl font-bold">{impactStats.waterSaved.toLocaleString()} L</p>
                              </div>
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-yellow-500 transition-all">
                                    <p className="text-gray-400 text-sm mb-2">Waste Diverted</p>
                                    <p className="text-3xl font-bold">{impactStats.wasteDiverted} kg</p>
                              </div>
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all">
                                    <p className="text-gray-400 text-sm mb-2">Energy Conserved</p>
                                    <p className="text-3xl font-bold">{impactStats.energyConserved} kWh</p>
                              </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-4 mb-8">
                              <div className="flex gap-2">
                                    {["week", "month", "year", "all-time"].map((filter) => (
                                          <button
                                                key={filter}
                                                onClick={() => setTimeFilter(filter)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                                      timeFilter === filter
                                                            ? "bg-green-600 text-white"
                                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                }`}
                                          >
                                                {filter === "all-time"
                                                      ? "All Time"
                                                      : filter.charAt(0).toUpperCase() + filter.slice(1)}
                                          </button>
                                    ))}
                              </div>
                              <select
                                    value={activityType}
                                    onChange={(e) => setActivityType(e.target.value)}
                                    className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 outline-none"
                              >
                                    <option value="all">All Activities</option>
                                    {[...new Set(activities.map((a) => a.challengeInfo?.category))]
                                          .filter(Boolean)
                                          .map((cat) => (
                                                <option key={cat} value={cat}>
                                                      {cat}
                                                </option>
                                          ))}
                              </select>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                              {/* Impact Over Time Chart */}
                              <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                                    <div className="mb-6">
                                          <h2 className="text-2xl font-bold mb-2">Your Impact Over Time</h2>
                                          <div className="flex items-center gap-2">
                                                <span className="text-3xl font-bold">{currentTotal} kg CO₂</span>
                                                <span
                                                      className={`flex items-center gap-1 text-sm ${
                                                            percentChange > 0 ? "text-green-400" : "text-red-400"
                                                      }`}
                                                >
                                                      <TrendingUp className="w-4 h-4" />
                                                      This Week {percentChange > 0 ? "+" : ""}
                                                      {percentChange}%
                                                </span>
                                          </div>
                                    </div>
                                    <ResponsiveContainer width="100%" height={300}>
                                          <LineChart data={weeklyData}>
                                                <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: "12px" }} />
                                                <YAxis hide />
                                                <Tooltip
                                                      contentStyle={{
                                                            backgroundColor: "#1f2937",
                                                            border: "1px solid #374151",
                                                            borderRadius: "8px",
                                                            color: "#fff",
                                                      }}
                                                />
                                                <Line
                                                      type="monotone"
                                                      dataKey="value"
                                                      stroke="#10b981"
                                                      strokeWidth={3}
                                                      dot={{ fill: "#10b981", r: 5 }}
                                                      activeDot={{ r: 7 }}
                                                />
                                          </LineChart>
                                    </ResponsiveContainer>
                              </div>

                              {/* Impact by Activity Pie Chart */}
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                                    <h2 className="text-2xl font-bold mb-6">Impact by Activity</h2>
                                    <ResponsiveContainer width="100%" height={250}>
                                          <PieChart>
                                                <Pie
                                                      data={activityData}
                                                      cx="50%"
                                                      cy="50%"
                                                      innerRadius={60}
                                                      outerRadius={90}
                                                      paddingAngle={5}
                                                      dataKey="value"
                                                >
                                                      {activityData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                      ))}
                                                </Pie>
                                                <Tooltip
                                                      contentStyle={{
                                                            backgroundColor: "#1f2937",
                                                            border: "1px solid #374151",
                                                            borderRadius: "8px",
                                                            color: "#fff",
                                                      }}
                                                />
                                          </PieChart>
                                    </ResponsiveContainer>
                                    <div className="mt-4 space-y-2">
                                          {activityData.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                      <div className="flex items-center gap-2">
                                                            <div
                                                                  className="w-3 h-3 rounded-full"
                                                                  style={{ backgroundColor: item.color }}
                                                            ></div>
                                                            <span className="text-sm text-gray-300">{item.name}</span>
                                                      </div>
                                                      <span className="text-sm font-semibold">{item.value}%</span>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                              {/* How You Compare */}
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                                    <h2 className="text-2xl font-bold mb-2">How You Compare</h2>
                                    <p className="text-gray-400 text-sm mb-6">This Week</p>
                                    <div className="space-y-6">
                                          <div>
                                                <div className="flex justify-between mb-2">
                                                      <span className="text-sm text-gray-300">Your Impact</span>
                                                      <span className="text-sm font-bold">{yourImpact} kg</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                      <div
                                                            className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500"
                                                            style={{ width: `${yourImpact}%` }}
                                                      ></div>
                                                </div>
                                          </div>
                                          <div>
                                                <div className="flex justify-between mb-2">
                                                      <span className="text-sm text-gray-300">Community Avg</span>
                                                      <span className="text-sm font-bold">{communityAvg} kg</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                      <div
                                                            className="bg-gradient-to-r from-gray-500 to-gray-400 h-3 rounded-full transition-all duration-500"
                                                            style={{ width: `${communityAvg}%` }}
                                                      ></div>
                                                </div>
                                          </div>
                                    </div>
                                    {yourImpact > communityAvg && (
                                          <div className="mt-6 p-4 bg-green-900/30 border border-green-700/50 rounded-lg">
                                                <p className="text-green-400 font-semibold">
                                                      🎉 You're {yourImpact - communityAvg}kg above the community
                                                      average!
                                                </p>
                                          </div>
                                    )}
                              </div>

                              {/* Your Milestones */}
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                                    <h2 className="text-2xl font-bold mb-6">Your Milestones</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                          {milestones.map((milestone, index) => {
                                                const Icon = milestone.icon;
                                                return (
                                                      <div
                                                            key={index}
                                                            className={`relative p-6 rounded-xl border-2 transition-all ${
                                                                  milestone.achieved
                                                                        ? "bg-linear-to-br from-green-900/50 to-blue-900/50 border-green-500"
                                                                        : "bg-gray-800/30 border-gray-700"
                                                            }`}
                                                      >
                                                            {milestone.achieved && (
                                                                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                                        <span className="text-white text-lg">✓</span>
                                                                  </div>
                                                            )}
                                                            <div
                                                                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                                                                        milestone.achieved
                                                                              ? "bg-green-500/20"
                                                                              : "bg-gray-700"
                                                                  }`}
                                                            >
                                                                  <Icon className={`w-6 h-6 ${milestone.color}`} />
                                                            </div>
                                                            <p
                                                                  className={`text-sm font-medium ${
                                                                        milestone.achieved
                                                                              ? "text-white"
                                                                              : "text-gray-400"
                                                                  }`}
                                                            >
                                                                  {milestone.label}
                                                            </p>
                                                      </div>
                                                );
                                          })}
                                    </div>
                              </div>
                        </div>

                        {/* Active Challenges List */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
                              <h2 className="text-2xl font-bold mb-6">Your Active Challenges</h2>
                              {activities.length === 0 ? (
                                    <div className="text-center py-12">
                                          <p className="text-gray-400 mb-4">
                                                No challenges yet. Start making an impact today!
                                          </p>
                                          <button
                                                onClick={() => navigate("/challenges")}
                                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                          >
                                                Browse Challenges
                                          </button>
                                    </div>
                              ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                          {activities.slice(0, 6).map((activity) => (
                                                <div
                                                      key={activity._id}
                                                      className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-green-500 transition-all cursor-pointer"
                                                      onClick={() => navigate(`/my-activities/${activity.challengeId}`)}
                                                >
                                                      <div className="flex items-start justify-between mb-3">
                                                            <h3 className="font-bold text-white line-clamp-1">
                                                                  {activity.challengeInfo?.title || "Challenge"}
                                                            </h3>
                                                            <span
                                                                  className={`px-2 py-1 rounded text-xs font-semibold ${
                                                                        activity.role === "creator"
                                                                              ? "bg-amber-500/20 text-amber-400"
                                                                              : "bg-blue-500/20 text-blue-400"
                                                                  }`}
                                                            >
                                                                  {activity.role === "creator"
                                                                        ? "Creator"
                                                                        : "Participant"}
                                                            </span>
                                                      </div>
                                                      <p className="text-xs text-gray-400 mb-3">
                                                            {activity.challengeInfo?.category || "General"}
                                                      </p>
                                                      <div className="mb-2">
                                                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                                                  <span>Progress</span>
                                                                  <span className="font-semibold text-green-400">
                                                                        {activity.progress || 0}%
                                                                  </span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                                  <div
                                                                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                                                                        style={{ width: `${activity.progress || 0}%` }}
                                                                  ></div>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}
                              {activities.length > 6 && (
                                    <div className="text-center mt-6">
                                          <button
                                                onClick={() => navigate("/challenges")}
                                                className="text-green-400 hover:text-green-300 font-medium"
                                          >
                                                View All Challenges →
                                          </button>
                                    </div>
                              )}
                        </div>

                        {/* Call to Action */}
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center">
                              <Award className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                              <h2 className="text-3xl font-bold mb-2">Keep Up the Great Work!</h2>
                              <p className="text-gray-100 mb-6">
                                    You're making a real difference. Join more challenges to increase your impact!
                              </p>
                              <button
                                    onClick={() => navigate("/challenges")}
                                    className="px-8 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                              >
                                    Browse Challenges
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default MyActivities;
