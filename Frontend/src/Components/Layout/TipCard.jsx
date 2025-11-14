import React, { useContext } from "react";
import { Lightbulb, ThumbsUp, Edit2, Trash2 } from "lucide-react";
import { AuthContext } from "../../Contexts/RootContext";


const TipCard = ({ tip, onEdit, onDelete, onLike, liked }) => {
  const { user } = useContext(AuthContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {tip.category}
              </span>
              <span className="text-gray-500 text-sm">{formatDate(tip.createdAt)}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{`${tip.title.slice(0,20)}...`}</h3>
          </div>
          {tip.createdBy === user?.email && (
            <div className="flex gap-2 ml-2">
              <button onClick={() => onEdit(tip)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit2 size={16} />
              </button>
              <button onClick={() => onDelete(tip._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">{tip.content}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Lightbulb size={16} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">{tip.authorName || "Anonymous"}</span>
            </div>
          </div>

          <button
            onClick={() => onLike(tip._id)}
            disabled={liked}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              liked ? "bg-green-100 text-green-700 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700"
            }`}
          >
            <ThumbsUp size={16} />
            <span>{tip.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCard;
