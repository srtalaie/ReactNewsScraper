import React, { Component } from 'react';
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import "./index.css";
import CommentModal from "../../components/Comment-Modal";
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
        console.log(commentData);
        API.addComment(id, commentData)
        .then(console.log("successful comment"))
        .catch(err => console.log(err))
    }

    viewComments = (id) => {
        API.getComments(id)
        .then(res => this.setState({ comments: res.data }))
        .catch(err => console.log(err))
        this.setState({ displayState: "show" })
    }

    closeCommentModal = () => {
        this.setState({ displayState: "none" })
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
                            <button className="list-button" onClick={() => this.viewComments(article._id)}>View Comment</button>
                        </ListItem>
                        );
                    })}
                    <CommentModalWrapper
                        displayState = {this.state.displayState}
                        {...this.state.comments.map((comment) => {
                            <CommentModal
                            body = {comment.body}
                            author = {comment.author}
                            key = {comment.key}
                            />
                        })}
                        hideMe = {this.closeCommentModal}
                    />
                    </List>
                ) : (
                    <h3>No Results to Display</h3>
                )}
            </div>
        );
    }
}

export default Home;