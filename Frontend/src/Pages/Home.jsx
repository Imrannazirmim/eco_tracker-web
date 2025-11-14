import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import HeroSlider from "../Components/Common/Home/HeroSlider";
import StatsSection from "../Components/Common/Home/StatesSection";
import ChallengesSection from "../Components/Common/Home/ChallengesSection";
import TipsEventsSection from "../Components/Common/Home/TipsEventSection";
import GreenSection from "../Components/Common/Home/GreenSection";

const Home = () => {
      const axiosSecure = useAxiosSecure();
      const [challenges, setChallenges] = useState([]);
      const [events, setEvents] = useState([]);
      const [tips, setTips] = useState([]);
      const [loading, setLoading] = useState(true);
      const [stats, setStats] = useState({
            challenges: 0,
            users: 0,
            co2Reduced: 0,
            treesPlanted: 0,
      });

      useEffect(() => {
            fetchData();
      }, []);

      const fetchData = async () => {
            setLoading(true);
            try {
                  const [challengesRes, statsRes] = await Promise.all([
                        axiosSecure.get("/api/challenges"),
                        axiosSecure.get("/api/stats"),
                  ]);

                  setChallenges(challengesRes.data.slice(0, 6));

                  if (statsRes.data.success) {
                        setStats({
                              challenges: statsRes.data.stats.challenges,
                              users: statsRes.data.stats.users,
                              co2Reduced: statsRes.data.stats.co2Reduced,
                              treesPlanted: statsRes.data.stats.treesPlanted,
                        });
                  }

                  try {
                        const eventsRes = await axiosSecure.get("/api/events?upcoming=true");
                        setEvents(eventsRes.data.slice(0, 3));
                  } catch (error) {
                        console.error("Error fetching events:", error);
                        setEvents([]);
                  }

                  try {
                        const tipsRes = await axiosSecure.get("/api/tips");
                        setTips(tipsRes.data.slice(0, 3));
                  } catch (error) {
                        toast.error(error.message);

                        setTips([]);
                  }
            } catch (error) {
                  toast.error(error.message);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <>
                  <ToastContainer />
                  <div className="min-h-screen bg-white">
                        <HeroSlider />
                        <StatsSection stats={stats} />
                        <ChallengesSection challenges={challenges} loading={loading} />
                        <TipsEventsSection tips={tips} events={events} />
                        <GreenSection />
                  </div>
            </>
      );
};

export default Home;
