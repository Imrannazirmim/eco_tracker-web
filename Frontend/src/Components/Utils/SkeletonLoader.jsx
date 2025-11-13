// SkeletonLoader.jsx - Custom skeleton loaders using react-loading-skeleton

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Challenge Card Skeleton
export const ChallengeCardSkeleton = () => {
      return (
            <div className="shadow rounded-b-md">
                  {/* Image skeleton */}
                  <Skeleton height={208} className="rounded-t-md" />

                  {/* Content skeleton */}
                  <div className="flex flex-col mt-4 mb-4 gap-2 px-4">
                        {/* Category */}
                        <Skeleton width={100} height={12} />

                        {/* Title */}
                        <Skeleton width="80%" height={20} />

                        {/* Divider */}
                        <hr className="text-gray-200" />

                        {/* Duration with icon */}
                        <div className="flex items-center gap-2">
                              <Skeleton circle width={16} height={16} />
                              <Skeleton width={80} height={16} />
                        </div>
                  </div>
            </div>
      );
};

// Multiple Challenge Cards Skeleton
export const ChallengeGridSkeleton = ({ count = 8 }) => {
      return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {Array.from({ length: count }).map((_, index) => (
                        <ChallengeCardSkeleton key={index} />
                  ))}
            </div>
      );
};

// Event Card Skeleton
export const EventCardSkeleton = () => {
      return (
            <div className="bg-white p-5 rounded-lg shadow-sm">
                  <Skeleton width="75%" height={20} className="mb-3" />
                  <div className="space-y-2">
                        <Skeleton width="60%" height={16} />
                        <Skeleton width="70%" height={16} />
                        <Skeleton width="50%" height={16} />
                  </div>
            </div>
      );
};

// Events List Skeleton
export const EventsListSkeleton = ({ count = 3 }) => {
      return (
            <div className="space-y-4">
                  {Array.from({ length: count }).map((_, index) => (
                        <EventCardSkeleton key={index} />
                  ))}
            </div>
      );
};

// Tip Card Skeleton
export const TipCardSkeleton = () => {
      return (
            <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <Skeleton circle width={32} height={32} />
                  <div className="flex-1">
                        <Skeleton width="80%" height={20} className="mb-2" />
                        <Skeleton width="40%" height={16} />
                  </div>
                  <Skeleton circle width={20} height={20} />
            </div>
      );
};

// Tips List Skeleton
export const TipsListSkeleton = ({ count = 3 }) => {
      return (
            <div className="space-y-4">
                  {Array.from({ length: count }).map((_, index) => (
                        <TipCardSkeleton key={index} />
                  ))}
            </div>
      );
};

// Activity Card Skeleton
export const ActivityCardSkeleton = () => {
      return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                  {/* Header */}
                  <div className="flex items-start space-x-4 mb-4">
                        <Skeleton width={80} height={80} className="rounded-lg" />
                        <div className="flex-1">
                              <Skeleton width="75%" height={24} className="mb-2" />
                              <Skeleton width="50%" height={16} className="mb-2" />
                              <Skeleton width={100} height={20} borderRadius={20} />
                        </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                        <div className="flex justify-between mb-2">
                              <Skeleton width={80} height={16} />
                              <Skeleton width={60} height={16} />
                        </div>
                        <Skeleton height={8} borderRadius={20} />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                              <Skeleton width={80} height={16} className="mb-1" />
                              <Skeleton width={100} height={20} />
                        </div>
                        <div>
                              <Skeleton width={80} height={16} className="mb-1" />
                              <Skeleton width={100} height={20} />
                        </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3">
                        <Skeleton height={40} className="flex-1" />
                        <Skeleton height={40} className="flex-1" />
                  </div>
            </div>
      );
};

// Activities Grid Skeleton
export const ActivitiesGridSkeleton = ({ count = 4 }) => {
      return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: count }).map((_, index) => (
                        <ActivityCardSkeleton key={index} />
                  ))}
            </div>
      );
};

// Table Row Skeleton (for My Challenges)
export const TableRowSkeleton = () => {
      return (
            <tr className="border-b border-gray-200">
                  <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                              <Skeleton width={48} height={48} className="rounded-lg" />
                              <div>
                                    <Skeleton width={200} height={20} className="mb-2" />
                                    <Skeleton width={120} height={16} />
                              </div>
                        </div>
                  </td>
                  <td className="px-6 py-4">
                        <Skeleton width={80} height={24} borderRadius={20} />
                  </td>
                  <td className="px-6 py-4">
                        <Skeleton width={100} height={16} />
                  </td>
                  <td className="px-6 py-4">
                        <Skeleton width="100%" height={8} borderRadius={20} className="mb-2" />
                        <Skeleton width={60} height={16} />
                  </td>
                  <td className="px-6 py-4">
                        <div className="flex space-x-2">
                              <Skeleton width={80} height={36} />
                              <Skeleton width={80} height={36} />
                        </div>
                  </td>
            </tr>
      );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5 }) => {
      return (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <table className="min-w-full">
                        <thead className="bg-gray-50">
                              <tr>
                                    {["Challenge", "Status", "Role", "Progress", "Actions"].map((_, i) => (
                                          <th key={i} className="px-6 py-4 text-left">
                                                <Skeleton width={100} height={16} />
                                          </th>
                                    ))}
                              </tr>
                        </thead>
                        <tbody>
                              {Array.from({ length: rows }).map((_, index) => (
                                    <TableRowSkeleton key={index} />
                              ))}
                        </tbody>
                  </table>
            </div>
      );
};

// Page Header Skeleton
export const PageHeaderSkeleton = () => {
      return (
            <div className="mb-8">
                  <Skeleton width={300} height={40} className="mb-3" />
                  <Skeleton width={450} height={20} />
            </div>
      );
};

// Challenge Details Skeleton
export const ChallengeDetailsSkeleton = () => {
      return (
            <div className="min-h-screen bg-gray-50 py-8">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Hero Image */}
                        <Skeleton height={384} className="rounded-2xl mb-8" />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                              {/* Main Content */}
                              <div className="lg:col-span-2 space-y-6">
                                    <Skeleton width="75%" height={40} />

                                    {/* Category badges */}
                                    <div className="flex space-x-3">
                                          <Skeleton width={120} height={32} borderRadius={20} />
                                          <Skeleton width={100} height={32} borderRadius={20} />
                                    </div>

                                    {/* Description */}
                                    <div className="bg-white rounded-xl p-6">
                                          <Skeleton width={180} height={24} className="mb-4" />
                                          <Skeleton count={3} height={16} className="mb-2" />
                                    </div>

                                    {/* How to participate */}
                                    <div className="bg-white rounded-xl p-6">
                                          <Skeleton width={220} height={24} className="mb-4" />
                                          {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="flex items-start space-x-3 mb-3">
                                                      <Skeleton circle width={24} height={24} />
                                                      <Skeleton width="90%" height={16} />
                                                </div>
                                          ))}
                                    </div>
                              </div>

                              {/* Sidebar */}
                              <div className="space-y-6">
                                    <div className="bg-white rounded-xl p-6">
                                          <Skeleton width={150} height={24} className="mb-4" />
                                          <div className="space-y-4">
                                                <div>
                                                      <Skeleton width={100} height={16} className="mb-2" />
                                                      <Skeleton width={80} height={32} />
                                                </div>
                                                <div>
                                                      <Skeleton width={100} height={16} className="mb-2" />
                                                      <Skeleton width={120} height={32} />
                                                </div>
                                          </div>
                                    </div>

                                    <div className="bg-white rounded-xl p-6">
                                          <Skeleton width={180} height={24} className="mb-4" />
                                          <Skeleton height={12} borderRadius={20} className="mb-2" />
                                          <Skeleton width={140} height={16} />
                                    </div>

                                    <Skeleton height={48} borderRadius={8} />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

// Stats Card Skeleton (Dashboard)
export const StatsCardSkeleton = () => {
      return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                        <Skeleton circle width={48} height={48} />
                        <Skeleton width={60} height={24} borderRadius={20} />
                  </div>
                  <Skeleton width={100} height={32} className="mb-2" />
                  <Skeleton width={140} height={16} />
            </div>
      );
};

// Stats Grid Skeleton
export const StatsGridSkeleton = ({ count = 4 }) => {
      return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: count }).map((_, index) => (
                        <StatsCardSkeleton key={index} />
                  ))}
            </div>
      );
};

export default {
      ChallengeCardSkeleton,
      ChallengeGridSkeleton,
      EventCardSkeleton,
      EventsListSkeleton,
      TipCardSkeleton,
      TipsListSkeleton,
      ActivityCardSkeleton,
      ActivitiesGridSkeleton,
      TableRowSkeleton,
      TableSkeleton,
      PageHeaderSkeleton,
      ChallengeDetailsSkeleton,
      StatsCardSkeleton,
      StatsGridSkeleton,
};
