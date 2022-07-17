import axios, { AxiosResponse } from "axios";
import Airport from "../interfaces/Airport";

const getAirports = async (): Promise<AxiosResponse<Array<Airport>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:8000/airports"
  });
};

const searchFlights = async (departure_code: string, arrival_code: string): Promise<AxiosResponse> => {
  return await axios({
    method: "GET",
    url: `http://localhost:8000/search/departure=${departure_code}-arrival=${arrival_code}`
  });
};

export { getAirports, searchFlights };
