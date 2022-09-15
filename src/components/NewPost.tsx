/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { Post } from '../types/Post';

type Props = {
  onAdd: (post: Post) => void,
  postId: number,
};

export const NewPost: React.FC<Props> = React.memo((props) => {
  const { onAdd, postId } = props;
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCommentError(comment.trim().length === 0);
    setNameError(name.trim().length === 0);

    if (name.trim().length === 0 || comment.trim().length === 0) {
      return;
    }

    const newPost: Post = {
      id: postId,
      name: name.trim(),
      avatar,
      isValidUrl,
      comment,
    };

    fetch(avatar, { method: 'HEAD' })
      .then(res => res.headers.get('Content-Type'))
      .then(result => {
        if (result) {
          newPost.isValidUrl = result.startsWith('image');
        }
      })
      .catch(() => setIsValidUrl(false))
      .finally(() => {
        onAdd(newPost);

        setAvatar('');
        setName('');
        setComment('');
        setIsValidUrl(false);
        setCommentError(false);
        setNameError(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          error={nameError}
          fullWidth
          id="standard-textarea"
          label="Введите ваше имя"
          placeholder="Имя"
          variant="standard"
          style={{ marginTop: 30, marginLeft: 10 }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
          }}
        />
        <TextField
          type="url"
          fullWidth
          id="standard-textarea"
          label="Введите ссылку на аватарку"
          placeholder="URL"
          variant="standard"
          style={{ marginTop: 11, marginLeft: 10, maxHeight: 'minContent' }}
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <TextField
          fullWidth
          error={commentError}
          id="standard-textarea"
          label="Введите текст поста"
          variant="outlined"
          multiline
          rows={4}
          style={{ marginTop: 11, marginLeft: 10 }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setCommentError(false);
          }}
        />

        <Button
          variant="contained"
          type="submit"
          style={{ marginTop: 11, marginLeft: 10, width: 500 }}
          startIcon={<SaveIcon />}
        >
          Добавить
        </Button>
      </form>
    </>
  );
});
