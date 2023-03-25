const UserProfile = (props) => {
  return (
    <div>
      <h1>{props.id}</h1>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;

  const idURL = params.upid;

  return {
    props: {
      id: `user-id ${idURL}`,
    },
  };
};

export default UserProfile;
