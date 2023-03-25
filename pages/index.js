import * as fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

const HomePage = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {' '}
          <Link href={`/${product.id}`}>{product.title}</Link>{' '}
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async (context) => {
  console.log('Regenarting ...');
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const readData = await fs.readFile(filePath);
  const data = JSON.parse(readData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  if (data.products.lenght === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 5,
  };
};

export default HomePage;
