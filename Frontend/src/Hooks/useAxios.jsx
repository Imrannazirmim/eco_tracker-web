import axios from "axios";

const axiosInstance = axios.create({
      baseURL: `https://eco-traker-server-api.vercel.app`,
});

const useAxios = () => {
      return axiosInstance;
};
export default useAxios;
