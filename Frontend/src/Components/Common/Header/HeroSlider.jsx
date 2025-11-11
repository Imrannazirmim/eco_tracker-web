import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";

const HeroSlider = () => {
      const sliderImg = [
            {
                  id: 1,
                  image: "https://static.vecteezy.com/system/resources/previews/006/066/678/non_2x/dark-path-in-the-forest-green-landscape-forest-background-free-photo.jpg",
            },
            { id: 2, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e" },
            { id: 3, image: "https://images.unsplash.com/photo-1511497584788-876760111969" },
            { id: 4, image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8" },
            { id: 6, image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" },
      ];

      return (
            <div className="relative w-full h-[70vh]">
                  <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="w-full h-full"
                  >
                        {sliderImg.map((slider) => (
                              <SwiperSlide key={slider.id} className="relative">
                                    <img
                                          src={slider.image}
                                          alt={`Nature slide ${slider.id}`}
                                          className="w-full h-full object-cover"
                                    />
                                    {/* Dark overlay for better text visibility if needed */}
                                    <div className="absolute inset-0 bg-black/60">
                                          <div>
                                                <h2>EcoTrack best challenges</h2>
                                          </div>
                                    </div>
                              </SwiperSlide>
                        ))}
                  </Swiper>
            </div>
      );
};

export default HeroSlider;
