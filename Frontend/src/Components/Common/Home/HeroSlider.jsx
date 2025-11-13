import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const sliderData = [
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

const HeroSlider = () => {
  return (
    <div className="relative w-full h-[70vh]">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="w-full h-full"
      >
        {sliderData.map((slider) => (
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
  );
};

export default HeroSlider;