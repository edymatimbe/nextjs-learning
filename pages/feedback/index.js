import fs from 'fs';
import path from 'path';
import { useState } from 'react';

const PeedbackPage = (props) => {
  const [getData, setGetData] = useState();

  const handleSinge = (id) => {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGetData(data.feedback);
      });
  };

  return (
    <div>
      <h1>feedbacks</h1>
      {getData && <p>{getData.email}</p>}
      <ul>
        {props.feedbacks.map((feed) => {
          return (
            <li key={feed.id}>
              <p>{feed.feedback}</p>
              <button onClick={handleSinge.bind(null, feed.id)}>
                Show More
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  console.log(data);

  return {
    props: {
      feedbacks: data,
    },
  };
};

export default PeedbackPage;
