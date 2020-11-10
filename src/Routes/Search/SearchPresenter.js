import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
    padding: 20px;
`;
const Form = styled.form`
    margin-bottom: 50px;
    font-size: 28px;
    display: flex;
    align-items: center;
`;
const Input = styled.input`
    all: unset;
    width: 100%;
    margin-left: 5px;
`;

const SearchPresenter = ({
    movieResults, 
    tvResults, 
    searchTerm, 
    loading, 
    error, 
    handleSubmit,
    updateTerm
}) => (
<>
    <Helmet>
        <title>Search | Bomflix</title>
    </Helmet>
    <Container>
        <Form onSubmit={handleSubmit}>
            <span>🔍</span>
            <Input 
                placeholder="Search Movies or TV Shows..." 
                value={searchTerm} 
                onChange={updateTerm} 
            />
        </Form>
        {loading ? <Loader /> : (
            <>
                {movieResults && movieResults.length > 0 && (
                    <Section title="Movie Results">
                        {movieResults.map(movie =>(
                            <Poster
                                key = {movie.id}
                                id={movie.id}
                                imageUrl = {movie.poster_path}
                                title={movie.original_title}
                                rating = {movie.vote_average}
                                year = {movie.release_date && movie.release_date.substring(0, 4)}
                                isMovie = {true}
                            />
                        ))}
                    </Section>
                )}
                {tvResults && tvResults.length > 0 && (
                    <Section title="TV Results">
                        {tvResults.map(show =>(
                            <Poster
                                key = {show.id}
                                id={show.id}
                                imageUrl = {show.poster_path}
                                title={show.original_name}
                                rating = {show.vote_average}
                                year = {show.first_air_date && show.first_air_date.substring(0, 4)}
                                isMovie = {false}
                            />
                        ))}
                    </Section>
                )}
                {error && <Message color="#e74c3c" text={error} />}
                {tvResults && 
                    movieResults && 
                    tvResults.length === 0 && 
                    movieResults.length === 0 && (
                    <Message text="Nothing found" color="#95a5a6"/>
                )}
            </>
        )}
    </Container>
</>
);


SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    searchTerm:PropTypes.string,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;