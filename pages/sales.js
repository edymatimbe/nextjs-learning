import { useEffect, useState } from 'react';
import useSWR from 'swr';

// Global
const tranforFunction = (transformedData, providedData) => {
  for (const key in providedData) {
    transformedData.push({
      id: key,
      username: providedData[key].username,
      volume: providedData[key].volume,
    });
  }
};

const SalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);

  // const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(
    'https://nextjs-app-2e0a0-default-rtdb.firebaseio.com/sales.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transData = [];

      tranforFunction(transData, data);

      setSales(transData);
    }
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch('https://nextjs-app-2e0a0-default-rtdb.firebaseio.com/sales.json')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transData = [];

  //       for (const key in data) {
  //         transData.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transData);
  //       setLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>{`${sale.username} - ${sale.volume}`}</li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  // fetch('https://nextjs-app-2e0a0-default-rtdb.firebaseio.com/sales.json')
  //   .then((res) => res.json())
  //   .then((data) => {

  const response = await fetch(
    'https://nextjs-app-2e0a0-default-rtdb.firebaseio.com/sales.json'
  );

  const data = await response.json();

  const transData = [];

  tranforFunction(transData, data);

  return { props: { sales: transData } };
};

export default SalesPage;
