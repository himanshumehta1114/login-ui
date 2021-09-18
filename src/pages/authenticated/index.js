import { memo } from "react";
import { useAuth } from "../../context/auth";
import Button from "../../components/button";

/**
 * Renders the authenticated screen
 *
 * @returns
 */
const Authenticated = () => {
  const { logout } = useAuth();
  return (
    <div style={{ marginTop: "4rem" }}>
      Hello 🖐, I'm authenticated!
      <Button primary onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};

export default memo(Authenticated);
