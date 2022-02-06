const express = require('express');
const { posts } = require('./data/posts.json')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function filterByQueryPosts(query, postsArray) {
    let filteredResults = postsArray;
    if (query.author) {
        filteredResults = filteredResults.filter(posts => posts.author === query.author);
    }
    if (query.likes) {
        filteredResults = filteredResults.filter(posts => posts.likes === query.likes);
    }
    if (query.popularity) {
        filteredResults = filteredResults.filter(posts => posts.popularity === query.popularity);
    }
    if (query.reads) {
        filteredResults = filteredResults.filter(posts => posts.reads === query.reads);
    }
    if (query.tags) {
        filteredResults = filteredResults.filter(posts => posts.tags === query.tags);
    }
    return filteredResults;
}

function findById(id, postsArray) {
    const result = postsArray.filter(posts => posts.id === id)[0];
    return result;
  }

function findByTag(tags, postArray) {
    const result = postArray.filter(posts => posts.tags === tags)[0];
    return result;
}

app.get('/api/posts', (req, res) => {
    let postsResults = posts;
    if(req.query) {
        postsResults = filterByQueryPosts(req.query, postsResults);
    }
    res.json(postsResults);
});

app.get('/api/posts/:id', (req, res) => {
    const idResults
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});