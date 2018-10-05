import React, { Component } from 'react';
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import "./index.css";

class Home extends Component {
    state = {
        articles: [],
        author: "",
        body: ""
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
        .then(res => this.setState({ articles: res.data }))
        .catch(err => console.log(err));
    }

    saveArticle = (id) => {
        API.saveArticle(id)
        .then(console.log('success'))
        .catch(err => console.log(err))
    }

    addComment = (id) => {
        API.addComment(id)
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
                            <input type="text" name="author"></input>
                            <input type="text" name="body"></input>
                            <button className="list-button" onClick={() => this.createComment(article._id)}>Add Comment</button>
                            <button className="list-button" onClick={() => this.viewComments(article._id)}>View Comment</button>
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