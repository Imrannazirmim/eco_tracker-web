import React from "react";

const TipForm = React.memo(({ formData, setFormData, categories }) => {
      console.log("TipForm rendered"); // test
      return (
            <div className="space-y-4">
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tip Title *</label>
                        <input
                              type="text"
                              value={formData.title}
                              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                  </div>

                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                        <textarea
                              value={formData.content}
                              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                              rows={6}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                              <select
                                    value={formData.category}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              >
                                    {categories
                                          .filter((c) => c !== "all")
                                          .map((cat) => (
                                                <option key={cat} value={cat}>
                                                      {cat}
                                                </option>
                                          ))}
                              </select>
                        </div>

                        <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                              <input
                                    type="text"
                                    value={formData.authorName}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, authorName: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              />
                        </div>
                  </div>
            </div>
      );
});

export default TipForm;
