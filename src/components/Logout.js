const Logout = ({ user, clearStorage }) => {
  return (
    <p>
      {user.name} logged in <button onClick={clearStorage}>Log Out</button>
    </p>
  );
};

export default Logout;
