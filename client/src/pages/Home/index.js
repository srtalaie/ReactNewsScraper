import React, { Component } from 'react';
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import "./index.css";
import CommentModalWrapper from "../../components/Comment-Modal/CommentModalWrapper";

class Home extends Component {
    state = {
        articles: [],
        author: "",
        body: "",
        comments: [],
        displayState: ""
    }
    
    componentDidMount(){
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
        .then(res => this.setState({ articles: res.data }))
        .catch(err => console.log(err));
    }

    loadComments = (id) => {
        API.getComments(id)
        .then(res => this.setState({ comments: res.data.comment }))
        .catch(err => console.log(err))
    }

    scrapeArticles = () => {
        API.scrapeArticles()
        .then(res => this.setState({ articles: res.data }))
        .catch(err => console.log(err));
    }

    saveArticle = (id) => {
        API.saveArticle(id)
        .then(console.log('successful save'))
        .catch(err => console.log(err))
    }

    commentInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addComment = (id) => {
        let author = this.state.author;
        let body = this.state.body;
        let commentData = {
            author,
            body
        }
        API.addComment(id, commentData)
        .then(res => this.setState({ comments: res.data.comment }))
        .catch(err => console.log(err))
        this.setState({ author: "", body: "" })
    }

    viewComments = (id) => {
        this.loadComments(id);
    }

    closeCommentModal = () => {
        this.setState({ displayState: "visibility: 'hidden'" })
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
                            <input type="text" name="author" value={this.state.author} onChange={this.commentInputChange}></input>
                            <input type="text" name="body" value={this.state.body} onChange={this.commentInputChange}></input>
                            <button className="list-button" onClick={() => this.addComment(article._id)}>Add Comment</button>
                            <button className="list-button" onClick={() => this.viewComments(article.id)}>View Comment</button>
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