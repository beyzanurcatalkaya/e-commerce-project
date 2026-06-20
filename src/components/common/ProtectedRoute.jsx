import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...rest }) {
  const location = useLocation();
  const user = useSelector((state) => state.client.user);

  const isLoggedIn = user && Object.keys(user).length > 0;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;