import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllJob } from "../../Services/usersServices";
import { Tag } from "antd";
import SearchList from "./SearchList";
function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const citySearch = searchParams.get("city") || "";
  const keywordsSearch = searchParams.get("keyword") || "";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllJob();
      if (response) {
        const newData = response.filter((item) => {
          const city = citySearch ? item.city?.includes(citySearch) : true;
          const keyword = keywordsSearch
            ? item.tags?.includes(keywordsSearch)
            : true;
          const status = item.status;
          console.log(city, keyword, status);
          return city && keyword && status;
        });
        setData(newData.reverse());
      }
    };
    fetchApi();
  }, [citySearch, keywordsSearch]);
  return (
    <>
      <div>
        <strong>Kết quả tìm kiếm: </strong>
        {citySearch && <Tag color="orange">{citySearch}</Tag>}
        {keywordsSearch && <Tag color="blue">{keywordsSearch}</Tag>}
      </div>
      {data && <SearchList data={data} />}
    </>
  );
}

export default Search;
