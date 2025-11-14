import React from "react";
import { CheckCircle, Target, Users, TrendingUp } from "lucide-react";

const benefits = [
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
];

const steps = [
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
];

const GreenSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Why Go Green */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Go Green?</h2>
            <p className="text-gray-600 mb-8">
              By participating in EcoTrack challenges, you're not just making small
              changes—you're part of a global movement to reduce our environmental
              footprint and create a sustainable future for generations to come.
            </p>
            <div className="space-y-4">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
            <div className="space-y-6">
              {steps.map((item) => {
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
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenSection;