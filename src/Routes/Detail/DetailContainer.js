import React from "react";
import { moviesApi, TVApi, collectionApi } from "../../api";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {location: {pathname}} = props;
        this.state = {
            result: null,
            collection: null,
            loading: true,
            error: null,
            isMovie: pathname.includes("/movie")
        };
    }
    
    async componentDidMount() {
        const {
            match: {
                params:{id}
            },
            history: {push}
        } = this.props;
        const {isMovie} = this.state;
        const parsedId = parseInt(id);
        if(isNaN(parsedId)) {
            return push("/");
        }
        let result = null;
        let collection = null;
        try{
            if(isMovie) {
                ({data:result} = await moviesApi.movieDetail(parsedId));
            } else {
                ({data:result} = await TVApi.showDetail(parsedId));
            }
            if(result.belongs_to_collection) {
                ({data:collection} = await collectionApi(result.belongs_to_collection.id));
            }
            console.log(result);
        }catch{
            this.setState({error: "Can't find anything"});
        }finally{
            this.setState({loading: false, result, collection})
        }
    }

    render() {
        const {result, collection, isMovie, loading, error} = this.state;
        return <DetailPresenter 
            result={result}
            collection={collection}
            isMovie = {isMovie}
            loading={loading}
            error={error}
        />;
    }
}