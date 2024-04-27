import axios from "axios";

export const getSearchLocations = async (searchTerm: string) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/search.json",
    params: { q: searchTerm },
    headers: {
      "X-RapidAPI-Key": "1b9c31d152msh57380cfd320d6d0p1208b9jsn79fb66fdb9e6",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data;
};
