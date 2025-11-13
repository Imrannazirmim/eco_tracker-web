import { ChallengeGridSkeleton } from "../../Utils/SkeletonLoader";
import ChallengeCard from "./ChallengeCard";

const placeholderChallenges = [
  {
    _id: "1",
    title: "Bike to Work",
    description: "Commit to cycling to work this week",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
    category: "Transport",
    participants: 234,
  },
  {
    _id: "2",
    title: "Plant a Tree",
    description: "Plant trees in your community garden",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400",
    category: "Conservation",
    participants: 189,
  },
  {
    _id: "3",
    title: "Plastic-Free Shopping",
    description: "Shop without single-use plastics",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c7e2bbc79b?w=400",
    category: "Zero-Waste",
    participants: 412,
  },
  {
    _id: "4",
    title: "Start Composting",
    description: "Begin your home composting journey",
    imageUrl: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400",
    category: "Waste Reduction",
    participants: 156,
  },
  {
    _id: "5",
    title: "Reduce Water Usage",
    description: "Reduce bottled water consumption",
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
    category: "Conservation",
    participants: 298,
  },
  {
    _id: "6",
    title: "Recycle Right",
    description: "Learn proper recycling techniques",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400",
    category: "Waste Reduction",
    participants: 345,
  },
];

const ChallengesSection = ({ challenges, loading }) => {
  const displayChallenges = challenges.length > 0 ? challenges : placeholderChallenges;

  return (
    <section id="challenges" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Active Challenges</h2>
        
        {loading ? (
          <ChallengeGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayChallenges.map((challenge) => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ChallengesSection;