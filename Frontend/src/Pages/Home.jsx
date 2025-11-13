import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
      Leaf,
      Users,
      Target,
      TrendingUp,
      ArrowRight,
      Calendar,
      MapPin,
      CheckCircle,
      Lightbulb,
      Facebook,
      Twitter,
      Instagram,
      Youtube,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Footer from "../Components/Common/Footer/Footer";

const Home = () => {
      const axiosSecure = useAxiosSecure();
      const [challenges, setChallenges] = useState([]);
      const [events, setEvents] = useState([]);
      const [tips, setTips] = useState([]);
      const [stats, setStats] = useState({
            challenges: 0,
            users: 0,
            co2Reduced: 0,
            treesPlanted: 0,
      });

      const sliderImages = [
            {
                  id: 1,
                  image: "https://static.vecteezy.com/system/resources/previews/006/066/678/non_2x/dark-path-in-the-forest-green-landscape-forest-background-free-photo.jpg",
                  title: "Join the Movement. Make a Real Impact.",
                  subtitle: "Discover challenges, share tips, and track your contribution to a healthier green planet.",
            },
            {
                  id: 2,
                  image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                  title: "Build Sustainable Habits",
                  subtitle: "Take on eco-challenges and make a difference one day at a time.",
            },
            {
                  id: 3,
                  image: "https://images.unsplash.com/photo-1511497584788-876760111969",
                  title: "Connect with Green Communities",
                  subtitle: "Join thousands making positive environmental changes together.",
            },
      ];

      useEffect(() => {
            fetchData();
      }, []);

      const fetchData = async () => {
            try {
                  // Fetch challenges
                  const challengesRes = await axiosSecure.get("/api/challenges?status=active");
                  setChallenges(challengesRes.data.slice(0, 6));

                  // Try to fetch events (optional)
                  try {
                        const eventsRes = await axiosSecure.get("/api/events?upcoming=true");
                        setEvents(eventsRes.data.slice(0, 3));
                  } catch (eventError) {
                        setEvents([]);
                        throw new Error(eventError.message);
                  }

                  // Try to fetch tips (optional)
                  try {
                        const tipsRes = await axiosSecure.get("/api/tips");
                        setTips(tipsRes.data.slice(0, 3));
                  } catch (tipError) {
                        setTips([]);
                        throw new Error(tipError.message);
                  }

                  // Calculate stats
                  setStats({
                        challenges: challengesRes.data.length,
                        users: 8912,
                        co2Reduced: 45670,
                        treesPlanted: 5832,
                  });
            } catch (error) {
                  throw new Error(error);
            }
      };

      return (
            <div className="min-h-screen bg-white">
                  {/* Hero Slider */}
                  <div className="relative w-full h-[70vh]">
                        <Swiper
                              navigation={true}
                              pagination={{ clickable: true }}
                              autoplay={{ delay: 5000, disableOnInteraction: false }}
                              loop={true}
                              modules={[Navigation, Pagination, Autoplay]}
                              className="w-full h-full"
                        >
                              {sliderImages.map((slider) => (
                                    <SwiperSlide key={slider.id} className="relative">
                                          <img
                                                src={slider.image}
                                                alt={slider.title}
                                                className="w-full h-full object-cover"
                                          />
                                          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                                                      <div className="text-white max-w-3xl">
                                                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                                                  {slider.title}
                                                            </h1>
                                                            <p className="text-xl md:text-2xl mb-8 text-gray-200">
                                                                  {slider.subtitle}
                                                            </p>
                                                            <div className="flex flex-wrap gap-4">
                                                                  <button className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2">
                                                                        <span>Explore Challenges</span>
                                                                        <ArrowRight className="w-5 h-5" />
                                                                  </button>
                                                                  <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/50">
                                                                        Learn More
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </SwiperSlide>
                              ))}
                        </Swiper>
                  </div>

                  {/* Stats Section */}
                  <div className="bg-linear-to-r from-green-50 to-blue-50 py-12">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div className="text-center">
                                          <p className="text-sm text-gray-600 mb-2">Completed Today</p>
                                          <p className="text-4xl font-bold text-gray-900">
                                                {stats.challenges.toLocaleString()}
                                          </p>
                                    </div>
                                    <div className="text-center">
                                          <p className="text-sm text-gray-600 mb-2">Active Members Right</p>
                                          <p className="text-4xl font-bold text-gray-900">
                                                {stats.users.toLocaleString()}
                                          </p>
                                    </div>
                                    <div className="text-center">
                                          <p className="text-sm text-gray-600 mb-2">Water Consumption (Liters)</p>
                                          <p className="text-4xl font-bold text-gray-900">
                                                {stats.co2Reduced.toLocaleString()}
                                          </p>
                                    </div>
                                    <div className="text-center">
                                          <p className="text-sm text-gray-600 mb-2">Active Members</p>
                                          <p className="text-4xl font-bold text-gray-900">
                                                {stats.treesPlanted.toLocaleString()}
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Active Challenges */}
                  <section id="challenges" className="py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <h2 className="text-3xl font-bold text-gray-900 mb-8">Active Challenges</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {challenges.length > 0
                                          ? challenges.map((challenge) => (
                                                  <div
                                                        key={challenge._id}
                                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                                                  >
                                                        <img
                                                              src={
                                                                    challenge.imageUrl ||
                                                                    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"
                                                              }
                                                              alt={challenge.title}
                                                              className="w-full h-48 object-cover"
                                                        />
                                                        <div className="p-6">
                                                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                                    {challenge.title}
                                                              </h3>
                                                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                                    {challenge.description}
                                                              </p>
                                                              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                                    <span className="flex items-center space-x-1">
                                                                          <Users className="w-4 h-4" />
                                                                          <span>
                                                                                {challenge.participants || 0}{" "}
                                                                                participants
                                                                          </span>
                                                                    </span>
                                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                                          {challenge.category}
                                                                    </span>
                                                              </div>
                                                              <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                                                                    Join Challenge
                                                              </button>
                                                        </div>
                                                  </div>
                                            ))
                                          : // Placeholder cards
                                            [1, 2, 3, 4, 5, 6].map((i) => (
                                                  <div
                                                        key={i}
                                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                                                  >
                                                        <img
                                                              src={`https://images.unsplash.com/photo-${
                                                                    i === 1
                                                                          ? "1542601906990-b4d3fb778b09"
                                                                          : i === 2
                                                                          ? "1466692476868-aef1dfb1e735"
                                                                          : i === 3
                                                                          ? "1532996122724-e3c7e2bbc79b"
                                                                          : i === 4
                                                                          ? "1604187351574-c75ca79f5807"
                                                                          : i === 5
                                                                          ? "1501594907352-04cda38ebc29"
                                                                          : "1611273426858-450d8e3c9fce"
                                                              }?w=400`}
                                                              alt={`Challenge ${i}`}
                                                              className="w-full h-48 object-cover"
                                                        />
                                                        <div className="p-6">
                                                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                                    {i === 1
                                                                          ? "Bike to Work"
                                                                          : i === 2
                                                                          ? "Plant a Tree"
                                                                          : i === 3
                                                                          ? "Plastic-Free Shopping"
                                                                          : i === 4
                                                                          ? "Start Composting"
                                                                          : i === 5
                                                                          ? "Water Plastic-Bottles"
                                                                          : "Recycle Right"}
                                                              </h3>
                                                              <p className="text-gray-600 text-sm mb-4">
                                                                    {i === 1
                                                                          ? "Commit to cycling to work this week"
                                                                          : i === 2
                                                                          ? "Plant trees in your community garden"
                                                                          : i === 3
                                                                          ? "Shop without single-use plastics"
                                                                          : i === 4
                                                                          ? "Begin your home composting journey"
                                                                          : i === 5
                                                                          ? "Reduce bottled water consumption"
                                                                          : "Learn proper recycling techniques"}
                                                              </p>
                                                              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                                    <span className="flex items-center space-x-1">
                                                                          <Users className="w-4 h-4" />
                                                                          <span>
                                                                                {Math.floor(Math.random() * 500) + 100}{" "}
                                                                                participants
                                                                          </span>
                                                                    </span>
                                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                                          {i % 2 === 0 ? "Conservation" : "Zero-Waste"}
                                                                    </span>
                                                              </div>
                                                              <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                                                                    Join Challenge
                                                              </button>
                                                        </div>
                                                  </div>
                                            ))}
                              </div>
                        </div>
                  </section>

                  {/* Two Column Section: Tips & Events */}
                  <section className="py-16 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {/* Latest Community Tips */}
                                    <div>
                                          <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                                Latest Community Tips
                                          </h2>
                                          <div className="space-y-4">
                                                {[
                                                      {
                                                            id: 1,
                                                            title: "5 Ways to Upcycle Old T-shirts",
                                                            author: "Sarah M.",
                                                      },
                                                      {
                                                            id: 2,
                                                            title: "Natural Air-Purifying Plants for Your Home",
                                                            author: "Mike J.",
                                                      },
                                                      {
                                                            id: 3,
                                                            title: "Reducing Food Waste: A Beginner's Guide",
                                                            author: "Emma R.",
                                                      },
                                                ].map((tip, index) => (
                                                      <div
                                                            key={tip.id}
                                                            className="flex items-start space-x-4 bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                                                      >
                                                            <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                                  <span className="text-green-600 font-semibold">
                                                                        {index + 1}
                                                                  </span>
                                                            </div>
                                                            <div className="flex-1">
                                                                  <h3 className="font-semibold text-gray-900 mb-1">
                                                                        {tip.title}
                                                                  </h3>
                                                                  <p className="text-sm text-gray-500">
                                                                        By {tip.author}
                                                                  </p>
                                                            </div>
                                                            <ArrowRight className="w-5 h-5 text-gray-400" />
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    {/* Upcoming Events */}
                                    <div>
                                          <h2 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                                          <div className="space-y-4">
                                                {[
                                                      {
                                                            id: 1,
                                                            title: "Community Beach Cleanup",
                                                            date: "Dec 15, 2024 • 9:00 AM",
                                                            location: "Ocean Beach, San Francisco",
                                                            attendees: 45,
                                                      },
                                                      {
                                                            id: 2,
                                                            title: "Farmers Market Meetup",
                                                            date: "Dec 18, 2024 • 10:00 AM",
                                                            location: "Ferry Building",
                                                            attendees: 32,
                                                      },
                                                      {
                                                            id: 3,
                                                            title: "Tree Planting Day",
                                                            date: "Dec 22, 2024 • 8:00 AM",
                                                            location: "Golden Gate Park",
                                                            attendees: 67,
                                                      },
                                                ].map((event) => (
                                                      <div
                                                            key={event.id}
                                                            className="bg-white p-5 rounded-lg hover:shadow-md transition-shadow"
                                                      >
                                                            <h3 className="font-semibold text-gray-900 mb-2">
                                                                  {event.title}
                                                            </h3>
                                                            <div className="space-y-2 text-sm text-gray-600">
                                                                  <p className="flex items-center space-x-2">
                                                                        <Calendar className="w-4 h-4" />
                                                                        <span>{event.date}</span>
                                                                  </p>
                                                                  <p className="flex items-center space-x-2">
                                                                        <MapPin className="w-4 h-4" />
                                                                        <span>{event.location}</span>
                                                                  </p>
                                                                  <p className="flex items-center space-x-2">
                                                                        <Users className="w-4 h-4" />
                                                                        <span>{event.attendees} attending</span>
                                                                  </p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Why Go Green Section */}
                  <section className="py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div>
                                          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Go Green?</h2>
                                          <p className="text-gray-600 mb-8">
                                                By participating in EcoTrack challenges, you're not just making small
                                                changes—you're part of a global movement to reduce our environmental
                                                footprint and create a sustainable future for generations to come.
                                          </p>
                                          <div className="space-y-4">
                                                {[
                                                      {
                                                            title: "Improved Health",
                                                            desc: "Reduce toxins in the environment and advocate for healthier living for EVERYONE in your community.",
                                                      },
                                                      {
                                                            title: "Protected Ecosystems",
                                                            desc: "Protect the planets natural habitats and biodiversity through conscious lifestyle choices.",
                                                      },
                                                      {
                                                            title: "Financial Savings",
                                                            desc: "By optimizing your energy and water consumption, you save money and reduce waste.",
                                                      },
                                                      {
                                                            title: "Build Community",
                                                            desc: "Connect with other like-minded people and work to make a collective impact on a larger scale.",
                                                      },
                                                ].map((item, index) => (
                                                      <div key={index} className="flex items-start space-x-3">
                                                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                                            <div>
                                                                  <h3 className="font-semibold text-gray-900 mb-1">
                                                                        {item.title}
                                                                  </h3>
                                                                  <p className="text-gray-600 text-sm">{item.desc}</p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    {/* How It Works */}
                                    <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-2xl p-8">
                                          <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
                                          <div className="space-y-6">
                                                {[
                                                      {
                                                            step: 1,
                                                            title: "Browse",
                                                            desc: "Explore hundreds of eco-challenges tailored to your lifestyle",
                                                            icon: Target,
                                                      },
                                                      {
                                                            step: 2,
                                                            title: "Participate",
                                                            desc: "Join challenges and track your progress with our easy-to-use tools",
                                                            icon: Users,
                                                      },
                                                      {
                                                            step: 3,
                                                            title: "Connect",
                                                            desc: "Share tips, inspire others, and celebrate milestones together",
                                                            icon: TrendingUp,
                                                      },
                                                ].map((item) => {
                                                      const Icon = item.icon;
                                                      return (
                                                            <div key={item.step} className="flex items-start space-x-4">
                                                                  <div className="shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                                                        <Icon className="w-6 h-6 text-white" />
                                                                  </div>
                                                                  <div>
                                                                        <h3 className="font-semibold text-gray-900 mb-1">
                                                                              {item.step}. {item.title}
                                                                        </h3>
                                                                        <p className="text-gray-600 text-sm">
                                                                              {item.desc}
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                      );
                                                })}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </div>
      );
};

export default Home;
