import React, { useState } from "react";
import { X } from "lucide-react";

const UpdateProgressModal = ({ challenge, onClose, onUpdate }) => {
      const [progress, setProgress] = useState(challenge.progress || 0);
      const [isUpdating, setIsUpdating] = useState(false);

      const handleSubmit = async (e) => {
            e.preventDefault();

            if (progress < 0 || progress > 100) {
                  alert("Progress must be between 0 and 100");
                  return;
            }

            setIsUpdating(true);
            try {
                  await onUpdate(progress);
            } finally {
                  setIsUpdating(false);
            }
      };

      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                              <h2 className="text-2xl font-bold text-gray-900">Update Progress</h2>
                              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <X size={24} />
                              </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                              <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                          {challenge.challengeTitle || challenge.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                          Current Progress: {challenge.progress || 0}%
                                    </p>
                              </div>

                              <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                          New Progress: {progress}%
                                    </label>
                                    <input
                                          type="range"
                                          min="0"
                                          max="100"
                                          value={progress}
                                          onChange={(e) => setProgress(Number(e.target.value))}
                                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                          <span>0%</span>
                                          <span>25%</span>
                                          <span>50%</span>
                                          <span>75%</span>
                                          <span>100%</span>
                                    </div>
                              </div>

                              <div className="mb-6">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                          <div
                                                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                          ></div>
                                    </div>
                              </div>

                              <div className="mb-6">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Quick Select:</p>
                                    <div className="flex gap-2">
                                          {[0, 25, 50, 75, 100].map((value) => (
                                                <button
                                                      key={value}
                                                      type="button"
                                                      onClick={() => setProgress(value)}
                                                      className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                                                            progress === value
                                                                  ? "bg-green-600 text-white"
                                                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                      }`}
                                                >
                                                      {value}%
                                                </button>
                                          ))}
                                    </div>
                              </div>

                              <div className="flex gap-3">
                                    <button
                                          type="button"
                                          onClick={onClose}
                                          disabled={isUpdating}
                                          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
                                    >
                                          Cancel
                                    </button>
                                    <button
                                          type="submit"
                                          disabled={isUpdating}
                                          className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                                    >
                                          {isUpdating ? (
                                                <span className="flex items-center justify-center gap-2">
                                                      Updating...
                                                </span>
                                          ) : (
                                                "Update Progress"
                                          )}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default UpdateProgressModal;
