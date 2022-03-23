import { ComponentType } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';
import { toast } from 'react-toastify';
import { useAppSelector } from '../store/configureStore';

interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  roles?: string[];
}

const PrivateRoute = ({ component: Component, roles, ...rest }: Props) => {
  const { user, loadingUser } = useAppSelector((state) => state.account);
  return (
    <>
      {loadingUser === false && (
        <Route
          {...rest}
          render={(props) => {
            if (!user) {
              return (
                <Redirect
                  to={{ pathname: '/login', state: { from: props.location } }}
                />
              );
            }

            if (roles && !roles?.some((r) => user.roles?.includes(r))) {
              toast.error('Not authorised to access this area');
              return <Redirect to={{ pathname: '/catalog' }} />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default PrivateRoute;
