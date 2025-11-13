import { useState, useEffect } from "react";
import useAxios from "./useAxios";

const  useChallenges = () => {
  const axios = useAxios();

  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: "All Categories",
    dateRange: "all",
    participants: "all",
    search: "",
  });

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/challenges");
      setChallenges(res.data);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () =>
    setFilters({ category: "All Categories", dateRange: "all", participants: "all", search: "" });

  const calculateDuration = (start, end) => {
    if (!start || !end) return 0;
    return Math.ceil(Math.abs(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
  };

  const filterChallenges = () => {
    let filtered = [...challenges];

    if (filters.category !== "All Categories") {
      filtered = filtered.filter((c) => c.category === filters.category);
    }
    if (filters.search) {
      filtered = filtered.filter((c) =>
        [c.title, c.description].some((text) =>
          text.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }
    if (filters.dateRange !== "all") {
      filtered = filtered.filter((c) => {
        const days = calculateDuration(c.startDate, c.endDate);
        if (filters.dateRange === "week") return days <= 7;
        if (filters.dateRange === "month") return days <= 30;
        if (filters.dateRange === "3months") return days <= 90;
        return true;
      });
    }
    if (filters.participants !== "all") {
      filtered = filtered.filter((c) => {
        if (filters.participants === "small") return c.participants < 100;
        if (filters.participants === "medium") return c.participants < 500 && c.participants >= 100;
        if (filters.participants === "large") return c.participants >= 500;
        return true;
      });
    }

    setFilteredChallenges(filtered);
  };

  useEffect(() => {
    filterChallenges();
  }, [challenges, filters]);

  return { challenges, filteredChallenges, loading, filters, setFilters, resetFilters, fetchChallenges };
}
export default useChallenges