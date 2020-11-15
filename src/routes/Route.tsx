import React from 'react';
import {
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouteProps,
    Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false , component: Component , ...rest}) => {
    const { usuario } = useAuth();

    return (
        // render -> Permite modificar a logística de mostrar alguma rota em tela
        <ReactDOMRoute 
            {...rest}
            
            render={({ location }) => {
                return isPrivate === !!usuario ? (
                    <Component />
                ) : (
                    <Redirect to={{
                        pathname: isPrivate ? '/login' : '/trocas-disponiveis',
                        state: {from: location}
                    }}
                    />
                )
            }}
        />
    );
};

export default Route;