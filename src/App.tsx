import React, { useState } from 'react';
import './App.scss';
import Grid from '@mui/material/Grid';
import { Post } from './types/Post';
import { NewPost } from './components/NewPost';
import { PostList } from './components/PostList';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(
    JSON.parse(localStorage.getItem('posts') || '[]'),
  );

  let id = 0;

  if (posts.length > 0) {
    id = posts[posts.length - 1].id;
  }

  const addPost = (post: Post) => {
    setPosts(prevPosts => [...prevPosts, post]);
    id += 1;
    localStorage.setItem('posts', JSON.stringify([...posts, post]));
  };

  return (
    <main className="main">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div><NewPost onAdd={addPost} postId={id} /></div>
          <p style={{ textAlign: 'right', fontWeight: 'bold' }}>{`Обьявлений: ${posts.length}`}</p>
          {posts.length > 0 && <div><PostList posts={[...posts].reverse()} /></div>}

        </Grid>
        <Grid item xs={4}>
          {posts.length > 0 && <div><PostList posts={[...posts].slice(-5).reverse()} /></div>}
        </Grid>
      </Grid>
    </main>
  );
};
