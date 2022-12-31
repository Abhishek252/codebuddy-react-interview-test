import { useEffect } from 'react';

const Posts = () => {
  const xhrGetPostData = (onPostSuccess, onPostFailure) => {
    const url = `${process.env.REACT_APP_API_URL}/submit`;
    const opt = {
      method: 'post',
      body: JSON.stringify({
        'emailId': 'john.doe@gmail.com',
        'password': 'QWerty##11',
        'firstName': 'John',
        'lastName': 'Doe',
        'address': '22/B, Baker Street, London - 10089',
        'countryCode': '+91',
        'phoneNumber': '2225550909',
      }),
    };
    fetch(url, { opt })
      .then(res => res.json())
      .then(data => onPostSuccess(data))
      .catch(err => onPostFailure(err));
  };

  const onPostSuccess = data => {
    console.log(data);
  };

  const onPostFailure = err => {
    console.log(err);
  };

  useEffect(() => {
    xhrGetPostData(onPostSuccess, onPostFailure);
  }, []);

  return <div>List your posts</div>;
};

export default Posts;
