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

const router = createBrowserRouter([
      {
            path: "/",
            element: <MainLayout />,
            errorElement: <NotFound />,

            children: [
                  { index: true, element: <Home /> },
                  {
                        path: "challenges",
                        element: <Challenges />,
                  },
                  {
                        path: "challenges/:id",
                        element: <ChallengeDetails />,
                        loader: async ({ params }) => {
                              const response = await fetch(`http://localhost:3000/api/challenges/${params.id}`);
                              if (!response.ok) {
                                    throw new Error("Failed to fetch challenge");
                              }
                              return response.json();
                        },
                  },
                  { path: "events", element: <Events /> },
                  { path: "tips", element: <Tips /> },
                  {
                        path: "my-activities",
                        element: (
                              <PrivateRoute>
                                    <MyActivities />
                              </PrivateRoute>
                        ),
                  },
                  { path: "sign", element: <SignIn /> },
                  { path: "register", element: <Register /> },
                  { path: "*", element: <ErrorPage /> },
            ],
      },
]);
export default router;
