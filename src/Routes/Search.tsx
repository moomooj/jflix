import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { getSearch } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";

interface ISerch {
  results: ASD[];
}

interface ASD {
  id: number;
  backdrop_path: string | null;
  media_type: string;
  original_title: string;
  title: string;
  name: string;
}

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<ISerch>(["search", "info"], {
    enabled: !!keyword,
    queryFn: () => getSearch(keyword),
  });
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <h1>로딩중입니다</h1>
      ) : data ? (
        data.results.length !== 0 ? (
          <Cards>
            {data.results.map((items) =>
              !items.backdrop_path ? null : (
                <Card
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      items.backdrop_path,
                      "w500"
                    )})`,
                  }}
                  to={
                    items.media_type === "tv"
                      ? `/tv/${items.id}`
                      : `/movies/${items.id}`
                  }
                  key={items.id}
                >
                  {items.title ? items.title : items.name}
                </Card>
              )
            )}
          </Cards>
        ) : (
          <h1>검색결과가 없습니다.</h1>
        )
      ) : (
        <h1>검색결과가 없습니다.</h1>
      )}
    </Wrapper>
  );
}

export default Search;

const Wrapper = styled.div`
  margin: 100px 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cards = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  padding: 5px;
`;

const Card = styled(Link)`
  padding: 120px 40px;
`;
