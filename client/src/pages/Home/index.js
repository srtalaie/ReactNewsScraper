import React, { Component } from 'react';
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import "./index.css";

class Home extends Component {
    state = {
        articles: []
    }
    
    componentDidMount(){
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
        .then(res => this.setState({ articles: res.data }))
        .catch(err => console.log(err));
    }

    scrapeArticles = () => {
        API.scrapeArticles()
        .then(res => this.setState({articles: [...this.state.articles, res.data]}))
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <button className="scrape-button" onClick={() => this.scrapeArticles()}>Scrape for More Articles!</button>
                {this.state.articles.length ? (
                    <List>
                    {this.state.articles.map(article => {
                        return (
                        <ListItem key={article._id}>
                            <a href={article.link}>
                            <strong>
                                {article.title}
                            </strong>
                            </a>
                            <button className="list-button" onClick={() => this.saveArticle(article._id)}>Save</button>
                            <button className="list-button" onClick={() => this.createComment(article._id)}>Add Comment</button>
                        </ListItem>
                        );
                    })}
                    </List>
                ) : (
                    <h3>No Results to Display</h3>
                )}
            </div>
        );
    }
}

export default Home;