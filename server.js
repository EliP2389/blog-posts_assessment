const express = require('express');
const { type } = require('express/lib/response');
const { posts } = require('./data/posts.json')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function filterByQueryPosts(query, postsArray) {
    let tagsArray = [];
    let filteredResults = postsArray;
    if (query.tags) {
        if (typeof query.tags === 'string') {
            tagsArray = [query.tags]
        } else {
            tagsArray = query.tags;
        }
        tagsArray.forEach(tag => {
            filteredResults = filteredResults.filter(
                posts => posts.tags.indexOf(tag) !== -1
            );
        });
    }
    if (query.author) {
        filteredResults = filteredResults.filter(post => post.author === query.author);
    }
    return filteredResults;
}

app.get('/api/posts', (req, res) => {
    let postsResults = posts;
    if (req.query) {
        postsResults = filterByQueryPosts(req.query, postsResults);
    }
    res.json(postsResults);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});