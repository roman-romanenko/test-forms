import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Post } from '../types/Post';

export type Props = {
  posts: Post[];
};

export const PostList: React.FC<Props> = React.memo((props) => {
  const { posts } = props;

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {posts.map(post => (
          <ListItem key={post.id} style={{ backgroundColor: 'lightGreen', borderRadius: 10, marginBottom: 5 }}>
            <ListItemAvatar>
              {post.isValidUrl
                ? (
                  <Avatar>
                    <img src={`${post.avatar}`} alt={`${post.name}`} style={{ width: 60 }} />
                  </Avatar>
                )
                : <Avatar sx={{ bgcolor: deepOrange[500] }}>{post.name[0]}</Avatar>}
            </ListItemAvatar>
            <ListItemText
              primary={`${post.name}`}
              secondary={`${post.comment}`}
              style={{ wordWrap: 'break-word' }}
            />
          </ListItem>
        ))}

      </List>

    </>
  );
});
