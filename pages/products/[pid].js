import * as fs from 'fs/promises';
import path from 'path';
import { Fragment } from 'react';

const ProductDetail = (props) => {
  const { loadedproduct } = props;

  // if (!loadedproduct) {
  //   return <h1>Loading ...</h1>;
  // }

  return (
    <Fragment>
      <h1>{loadedproduct.title}</h1>
      <p>{loadedproduct.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const readData = await fs.readFile(filePath);
  const data = JSON.parse(readData);

  return data;
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedproduct: product,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const paramsWithId = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: paramsWithId,
    fallback: false,
  };
};

export default ProductDetail;
