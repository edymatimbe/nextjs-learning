const Profile = (props) => {
  return <h1>{props.username} </h1>;
};

export const getServerSideProps = async (context) => {
  const { params, req, res } = context;

  console.log(res);
  return {
    props: {
      username: 'Edy',
    },
  };
};

export default Profile;
