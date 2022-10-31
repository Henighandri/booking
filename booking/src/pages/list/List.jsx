import { useContext, useState } from "react";

import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchBlock from "../../components/searchBlock/SearchBlock";
import SearchItem from "../../components/searchItem/SearchItem";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./list.css";
const List = () => {
  const { city, dispatch } = useContext(SearchContext);
  const [url, setUrl] = useState(`/hotels/?featured=true&city=${city}`);

  const searchHandler = (destination, date, min, max, options) => {
    setUrl(
      `/hotels/?featured=true&limit=5&city=${destination}&min=${min}&max=${max}`
    );
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, dates: date, options },
    });
  };

  const { data, loading, error } = useFetch(url);
  if (error) {
    <div>error please try again</div>;
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listWrapper">
            <SearchBlock searchHandler={searchHandler} />
            <div className="listResult">
              {loading || !data.hotels
                ? "Loading please Wait"
                : data.hotels.length === 0
                ? "No Result"
                : data.hotels.map((hotel) => (
                    <SearchItem key={hotel._id} hotel={hotel} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
