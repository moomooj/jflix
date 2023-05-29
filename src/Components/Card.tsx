import styled from "styled-components";
import { getDetails } from "../api";
import { makeImagePath } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { Params, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface IProps {
  match: Params<string>;
}
interface IMovieDtails {
  backdrop_path: string;
  tagline: string;
  title: string;
  overview: string;
  genres: any[];
  original_title: string;
  poster_path: string;
  release_date: string;
  runtime: string;
  vote_average: number;

  name: string;
  original_name: string;
  first_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
}

function Card({ match }: IProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<IMovieDtails | null>(["card", "Info"], {
    queryFn: () => getDetails(match),
  });

  const onOverlayClick = () => {
    if (match.movieId) {
      navigate("/");
    } else if (match.tvId) {
      navigate("/tv");
    }
  };
  return isLoading ? (
    <h1>로딩중</h1>
  ) : (
    <AnimatePresence>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <BigCard>
          {match.movieId ? (
            data ? (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      data.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <MovieInfoWrap>
                  <Poster src={`${makeImagePath(data.poster_path)}`} alt="sd" />
                  <Wrapper>
                    <MovieTitles>
                      <h1>{data.title}</h1>
                      <h2>{data.original_title}</h2>
                    </MovieTitles>
                    <MovieInfos>
                      <h3>
                        {`${data.release_date} ∙ ${
                          data.runtime
                        }분 ∙ 평점 ${Math.floor(data.vote_average)}점 ∙ `}
                        {data.genres.map((genres) => genres.name + " ")}
                      </h3>
                      <h4>{data.tagline !== "" ? `▪︎ ${data.tagline}` : ""}</h4>
                      <p>{data.overview}</p>
                    </MovieInfos>
                  </Wrapper>
                </MovieInfoWrap>
              </>
            ) : null
          ) : data ? (
            <>
              <BigCover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    data.backdrop_path,
                    "w500"
                  )})`,
                }}
              />
              <MovieInfoWrap>
                <Poster src={`${makeImagePath(data.poster_path)}`} alt="sd" />
                <Wrapper>
                  <MovieTitles>
                    <h1>{data.name}</h1>
                    <h2>{data.original_name}</h2>
                  </MovieTitles>
                  <MovieInfos>
                    <h3>
                      {`${data.first_air_date} ∙ 총 ${
                        data.number_of_seasons
                      } 시즌 ${
                        data.number_of_episodes
                      } 에피소드 ∙ 평점 ${Math.floor(data.vote_average)}점 ∙ `}
                      {data.genres.map((genres) => genres.name + " ")}
                    </h3>
                    <h4>{data.tagline !== "" ? `▪︎ ${data.tagline}` : ""}</h4>
                    <p>{data.overview}</p>
                  </MovieInfos>
                </Wrapper>
              </MovieInfoWrap>
            </>
          ) : null}
        </BigCard>
      </Overlay>
    </AnimatePresence>
  );
}

export default Card;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigCard = styled(motion.div)`
  position: fixed;
  width: 60vw;
  min-width: 500px;
  height: 80vh;
  top: 10vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 40vh;
`;

const MovieInfoWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  width: 90%;
  display: flex;
`;

const Poster = styled.img`
  width: 35%;
`;
const Wrapper = styled.div`
  margin-left: 20px;
`;
const MovieTitles = styled.div`
  height: 50%;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  h1 {
    font-size: 50px;
    font-weight: 700;
  }
  h2 {
  }
`;

const MovieInfos = styled.div`
  height: 50%;
  h3 {
    margin-top: 30px;
  }
  h4 {
    span {
    }
    margin-top: 20px;
  }
  p {
    margin-top: 10px;
  }
`;

/*
isLoading ? (
    <h1>로딩중</h1>
  ) : data ? (
    <>
      <BigCover
        style={{
          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
            data.backdrop_path,
            "w500"
          )})`,
        }}
      />
      <MovieInfoWrap>
        <Poster src={`${makeImagePath(data.poster_path)}`} alt="sd" />
        <Wrapper>
          <MovieTitles>
            <h1>{data.title}</h1>
            <h2>{data.original_title}</h2>
          </MovieTitles>
          <MovieInfos>
            <h3>
              {`${data.release_date} ∙ ${data.runtime}분 ∙ 평점 ${Math.floor(
                data.vote_average
              )}점 ∙ `}
              {data.genres.map((genres) => genres.name + " ")}
            </h3>
            <h4>{data.tagline !== "" ? `▪︎ ${data.tagline}` : ""}</h4>
            <p>{data.overview}</p>
          </MovieInfos>
        </Wrapper>
      </MovieInfoWrap>
    </>
  ) : null;

  */
