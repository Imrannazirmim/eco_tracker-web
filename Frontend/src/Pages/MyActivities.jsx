import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyActivities = () => {
      const [data, setData] = useState([]);
      const auth = getAuth();
      const axiosInstance = useAxiosSecure();
      const token = auth.currentUser;

      useEffect(() => {
            axiosInstance.get(`/api/challenges?email=${token.email}`).then((data) => setData(data));
      }, [axiosInstance, data, token]);
      return <div>MyActivities</div>;
};
export default MyActivities;
