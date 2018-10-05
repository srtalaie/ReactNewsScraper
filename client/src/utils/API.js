import axios from "axios";

export default {
    scrapeArticles: function(){
        return axios.get("/scrape");
    },

    getArticles: function(){
        return axios.get("/articles");
    },

    saveArticle: function(id){
        return axios.post(`/saved/${id}`);
    },

    getAllSavedArticles: function(){
        return axios.get("/saved");
    },

    addComment: function(id, commentData){
        return axios.post(`/addComment/${id}`, commentData);
    },

    getComments: function(id){
        return axios.get(`/getComment/${id}`)
    },

    deleteComment: function(id){
        return axios.get(`/deletComment/${id}`);
    }
} 