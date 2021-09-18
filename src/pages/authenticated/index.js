import { useAuth } from "../../context/auth";
import Button from "../../components/button";

const Authenticated = (props) => {
  const { logout } = useAuth();
  return (
    <div style={{marginTop: "4rem"}}>
      Hello 🖐, I'm authenticated!
      <Button primary onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};

export default Authenticated;
