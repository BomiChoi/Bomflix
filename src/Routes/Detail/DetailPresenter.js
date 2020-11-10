import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Helmet from "react-helmet";
import {Link} from "react-router-dom";


const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;
const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;
const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.span`
    font-size: 32px;
    margin-bottom: 10px;
`;
const ItemContainer = styled.div`
    margin: 20px 0;
`;
const Item = styled.span``;
const Divider = styled.span`
    margin: 0 10px;
`;
const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
`;
const Imdb = styled.a`
    color: black;
    background-color: #f4c617;
    border-radius: 3px;
    padding: 2px 3px;
    font-weight: bold;
`;
const TabMenu = styled.div`
    margin-top: 20px;
    display: flex;
`;
const TabBtn = styled.button`
    background: none;
    border: none;
    outline: none;
    width: 33.33%;
    padding: 10px 0;
    font-weight: bold;
    font-size: 14px;
    color: ${props => props.selected ? "white":"rgba(255, 255, 255, 0.7)"};
    background-color: ${props => props.selected ? "rgba(0, 0, 0, 0.5)":"none"};
    &:hover {
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
    }
`;
const Tabs = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    min-height: 200px;
    padding: 20px;
`;
const Tab = styled.div`
    display: ${props => props.current ? "flex":"none"};
    flex-direction: column;
    &:first-child {
        align-items: center;
    }
`;
const Companies = styled.div`
    div {
        display: flex;
        flex-wrap: wrap;
    }
    h3 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 5px;
    }
`;
const Company = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    width: 100px;
    text-align: center;
    span {
        margin-top: 5px;
    }
`;
const Logo = styled.div`
    width: 70px;
    height: 50px;
    background-image: url(${props => props.bgImage});
    background-color: white;
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;
const Countries = styled.div`
    margin-bottom: 20px;
    h3 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 5px;
    }
`;
const Seasons = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Season = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 130px;
    padding: 10px;
    div{
        width: 120px;
        height: 180px;
    }
    h4 {
        margin: 5px 0;
        font-weight: bold;
        font-size: 14px;
    }
`;
const Collections = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Collection = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 130px;
    padding: 10px;
    div{
        width: 120px;
        height: 180px;
    }
    h4 {
        margin: 5px 0;
        font-weight: bold;
        font-size: 14px;
    }
    &:hover {
        opacity: 0.6;
    }
`;



const DetailPresenter = ({result, collection, isMovie, loading, error}) => {
    const [index, setIndex] = useState(0);
    return loading ? (
    <>
        <Helmet>
            <title>Loading | Bomflix</title>
        </Helmet>
        <Loader />
    </>
    ) : (
    <Container>
        <Helmet>
            <title>{result.original_title 
                    ? result.original_title
                    : result.original_name} | Bomflix</title>
        </Helmet>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
        <Content>
            <Cover bgImage={
                result.poster_path 
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                :require("../../assets/popcorn.jpg")
            }/>
            <Data>
                <Title>
                    {result.original_title 
                    ? result.original_title
                    : result.original_name}
                </Title>
                <ItemContainer>
                    <Item>
                        {result.release_date
                        ? result.release_date.substring(0, 4)
                        : result.first_air_date.substring(0, 4)}
                    </Item>
                    <Divider>•</Divider>
                    <Item>
                        {result.runtime
                        ? result.runtime
                        : result.episode_run_time[0]} min
                    </Item>
                    <Divider>•</Divider>
                    <Item>
                        {result.genres && 
                        result.genres.map((genre, index) => 
                            index === result.genres.length-1
                            ? genre.name 
                            : `${genre.name}/`
                        )}
                    </Item>
                    {isMovie && <>
                    <Divider>•</Divider>
                    <Item>
                        <Imdb href={`https://www.imdb.com/title/${result.imdb_id}`}>IMDb</Imdb>
                    </Item>
                    </>}
                    <Divider>•</Divider>
                    <Item>
                        <span>
                            <span role="img" aria-label="rating">
                                ⭐️
                            </span>{" "}
                            {result.vote_average}/10
                        </span>
                    </Item>
                </ItemContainer>
                <Overview>{result.overview}</Overview>
                <TabMenu>
                    <TabBtn onClick={() => setIndex(0)} selected={index === 0}>Video</TabBtn>
                    <TabBtn onClick={() => setIndex(1)} selected={index === 1}>Production Info</TabBtn>
                    <TabBtn onClick={() => setIndex(2)} selected={index === 2}>{isMovie? "Collection" : "Season"}</TabBtn>
                </TabMenu>
                <Tabs>
                    <Tab current={index === 0}>
                        {result.videos.results.length ?
                        <iframe width="420" height="315" src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}>    
                        </iframe>
                        : "No video"
                        }
                    </Tab>
                    <Tab current={index === 1}>
                        <Countries>
                            <h3>Country</h3>
                            <div>
                                {result.production_countries && result.production_countries.length ?
                                result.production_countries.map((country, index) => 
                                    index === result.production_countries.length-1
                                    ? country.name 
                                    : `${country.name}/`
                                ) : "No country information"}
                            </div>
                        </Countries>
                        <Companies>
                            <h3>Company</h3>
                            <div>
                                {result.production_companies && result.production_companies.length ? 
                                result.production_companies.map((company, index) => 
                                    <Company key={index}>
                                        <Logo bgImage={
                                            company.logo_path
                                            ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                                            :require("../../assets/popcorn.jpg")
                                        }/>
                                        <span>{company.name}</span>
                                    </Company>
                                ) : "No company information"}
                            </div>
                        </Companies>
                    </Tab>
                    <Tab current={index === 2}> 
                        {isMovie ? (
                            collection?
                            <Collections>
                                {collection.parts.map((part) =>
                                    <Collection to={`/movie/${part.id}`} key={part.id}>
                                        <Cover bgImage={
                                            part.poster_path 
                                            ? `https://image.tmdb.org/t/p/original${part.poster_path}`
                                            :require("../../assets/popcorn.jpg")
                                        }/>
                                        <h4>
                                            {part.original_title ? part.original_title : part.original_name}
                                        </h4>
                                        <p>
                                            {part.overview.length > 100 ?
                                            `${part.overview.substring(0, 100)}...`
                                            : part.overview
                                            }
                                        </p>
                                    </Collection>
                                )}
                            </Collections>
                            : "No collection"
                        ):(
                            <Seasons>
                                {result.seasons ? 
                                result.seasons.map((season, index)=>
                                <Season key={index}>
                                    <Cover bgImage={
                                        season.poster_path 
                                        ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                                        :require("../../assets/popcorn.jpg")
                                    }/>
                                    <h4>{season.name}</h4>
                                    <p>
                                        {season.overview.length > 100 ?
                                        `${season.overview.substring(0, 100)}...`
                                        : season.overview
                                        }
                                    </p>
                                </Season>)
                                : "No seasons"}
                            </Seasons>
                        )}
                    </Tab>
                </Tabs>
            </Data>
        </Content>
    </Container>
    )
};

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;