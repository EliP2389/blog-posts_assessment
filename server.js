const express = require('express');
const { posts } = require('./data/posts.json')

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });