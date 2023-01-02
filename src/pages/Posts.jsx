import { useEffect, useState } from 'react';
import styles from '../styles/posts.module.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const xhrGetPostData = (onPostSuccess, onPostFailure) => {
    const url = `${process.env.REACT_APP_API_URL}/posts`;

    fetch(url)
      .then(res => res.json())
      .then(data => onPostSuccess(data))
      .catch(err => onPostFailure(err));
  };

  const onPostSuccess = data => {
    const {
      data: { posts },
    } = data;
    setPosts(posts);
  };

  const onPostFailure = err => {
    console.log(err);
  };

  const dataView = () => {
    if (posts && posts.length > 0) {
      return posts.map(post => {
        const { id, firstName, lastName, writeup, image, avatar } = post;
        return (
          <div id={`${firstName}_${id}`} className={styles.post_card_wrapper}>
            <div className={styles.img__w}>
              <img src={image} alt={firstName} width="640" height="400" />
            </div>
            <div className={styles.content__w}>
              <p>{writeup}</p>
              <div className={styles.user__w}>
                <div className={styles.user_avtar}>
                  <img src={avatar} alt={firstName} />
                </div>
                <h5>{`${firstName} ${lastName}`}</h5>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  useEffect(() => {
    xhrGetPostData(onPostSuccess, onPostFailure);
  }, []);

  return (
    <div>
      <p className={styles.post_page_para__primary}>List your posts</p>
      <div className={styles.post_main}>{dataView()}</div>
    </div>
  );
};

export default Posts;
