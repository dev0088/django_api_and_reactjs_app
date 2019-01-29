import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { TemplateSidebar } from 'components/shiptalent/template';
import Error from 'components/general/error';
import talentRoutes from './talent/index';
import clientRoutes from './client/index';
import commonRoutes from './common/index';


function renderRoute (route, key) {
  return(
    <Route
      exact={route.exact}
      path={route.path}
      render={props => (
        <route.layout>
          <route.component {...props}/>
        </route.layout>
      )}
      key={key}
    />
  );
}

function renderRoutes (routes){
  return (
    routes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return renderRoute(prop, key);
    })
  );
}

const Index = () => (
  <Switch>
    { renderRoutes(commonRoutes) }
    { renderRoutes(talentRoutes) }
    { renderRoutes(clientRoutes) }

    <Route
      render={props => (
        <TemplateSidebar>
          <Error {...props} title="404" content="Sorry, the route you requested does not exist"/>
        </TemplateSidebar>
      )}
    />

  </Switch>
);

export default Index;
