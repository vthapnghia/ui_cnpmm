import Navbar from "../../component/Navbar";

function User(props) {
  return (
    <>
      <Navbar />
      <props.component/>
    </>
  );
}

export default User;
