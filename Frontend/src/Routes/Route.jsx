import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/Layout/MainLayout.jsx";
import Challenges from "../Pages/Challenges.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
import Events from "../Pages/Events.jsx";
import Home from "../Pages/Home.jsx";
import MyActivities from "../Pages/MyActivities.jsx";
import NotFound from "../Pages/NotFound.jsx";
import Tips from "../Pages/Tips.jsx";
import SignIn from "../Pages/SignIn.jsx";
import Register from "../Pages/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ChallengeDetails from "../Components/Layout/ChallengeDetails.jsx";
import { Suspense } from "react";
import Dashboard from "../Pages/Dashboard.jsx";
import Loading from "../Components/Utils/Loading.jsx";
import Profile from "../Pages/Profile.jsx";

const router = createBrowserRouter([
      {
            path: "/",
            element: <MainLayout />,
            errorElement: <NotFound />,

            children: [
                  {
                        index: true,
                        element: (
                              <Suspense>
                                    <Home />
                              </Suspense>
                        ),
                  },
                  {
                        path: "challenges",
                        element: (
                              <Suspense fallback={<Loading />}>
                                    <Challenges />
                              </Suspense>
                        ),
                  },
                  {
                        path: "challenges/:id",
                        element: (
                              <Suspense fallback={<Loading />}>
                                    <ChallengeDetails />,
                              </Suspense>
                        ),
                        loader: async ({ params }) => {
                              const response = await fetch(`http://localhost:3000/api/challenges/${params.id}`);
                              if (!response.ok) {
                                    throw new Error("Failed to fetch challenge");
                              }
                              return response.json();
                        },
                  },
                  {
                        path: "dashboard",
                        element: (
                              <Suspense fallback={<Loading />}>
                                    <PrivateRoute>
                                          <Dashboard />
                                    </PrivateRoute>
                              </Suspense>
                        ),
                  },
                  {
                        path: "profile",
                        element: (
                              <Suspense fallback={<Loading />}>
                                    <PrivateRoute>
                                          <Profile />
                                    </PrivateRoute>
                              </Suspense>
                        ),
                  },
                  {
                        path: "events",
                        element: (
                              <Suspense fallback={<Loading />}>
                                    <Events />
                              </Suspense>
                        ),
                  },
                  {
                        path: "tips",
                        element: (
                              <Suspense fallback={<Loading />}>
                                    <Tips />
                              </Suspense>
                        ),
                  },
                  {
                        path: "my-activities",
                        element: (
                              <Suspense fallback={<Loading />}>
                                    <PrivateRoute>
                                          <MyActivities />
                                    </PrivateRoute>
                              </Suspense>
                        ),
                  },
                  { path: "sign", element: <SignIn /> },
                  { path: "register", element: <Register /> },
                  { path: "*", element: <ErrorPage /> },
            ],
      },
]);
export default router;
