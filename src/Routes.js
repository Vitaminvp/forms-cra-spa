import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderAppBar from "./components/HeaderAppBar";
import App from "./App";
import FormNew from "./containers/FormNew";
import FormDetail from "./containers/FormDetail";
import FormFill from "./containers/FormFill";
import Page404 from "./components/Page404";
import { IntlProvider } from "react-intl";
import messages from "./constants/messages";
import { setLang } from "./reducers/lang";
import AuthProvider from "./services";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Callback from "./components/callback";
import Profile from "./components/Profile";

class Routes extends Component {
  render() {
    const { lang, setLang } = this.props;
    return (
        <Router>
      <IntlProvider locale={lang} messages={messages[lang]}>
        <AuthProvider>

            <HeaderAppBar setLang={setLang} language={lang} />
            <Switch>
              <Route path="/callback" component={Callback} />
              <Route exact path="/" component={App} />
              <Route path="/new" component={FormNew} />
              <PrivateRoute path="/edit/:formId" component={FormDetail} />
              <Route path="/fill/:formId" component={FormFill} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route component={Page404} />
            </Switch>

        </AuthProvider>
      </IntlProvider>
        </Router>
    );
  }
}

const mapStateToProps = ({ lang }) => ({
  lang: lang.value
});

const mapDispatchToProps = {
  setLang
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
