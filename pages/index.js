import { useRef, useState } from 'react';

function HomePage() {
  const [mess, setMess] = useState([]);
  const emailInput = useRef();
  const feedbackInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const emailValue = emailInput.current.value;
    const feedbackValue = feedbackInput.current.value;

    const reqBody = { email: emailValue, feedback: feedbackValue };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const loadSubmitedData = () => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => setMess(data.feedback));
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInput} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInput}></textarea>
        </div>
        <button>Submit</button>
      </form>
      <hr />
      <button onClick={loadSubmitedData}>Load Data</button>
      <ul>
        {mess.map((me) => (
          <li key={me.id}>
            <p>{me.email}</p>
            <p>{me.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
