import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {FrontPage, UserProfile, AllUsers, UserUpdate, TransPort} from './components'
import {me} from './store/index'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/homepage" component={FrontPage} />
        {/* <Route path="/signup" component={Signup} /> */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/transactions" component = {TransPort}/>
            <Route path="/portfolio" component = {TransPort}/>
            <Route path="/profile/update" component={UserUpdate}/>
            <Route path="/profile/:id/update" component={UserUpdate}/>
            <Route path="/profile/:id" component={UserProfile}/>  {/* A user will never see this, strictly for admin access */}
            <Route path="/profile" component={UserProfile}/>
            <Route path="/users" component={AllUsers} />
            
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={FrontPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn:  !!state.userState.loggedInUser.id //|| !!state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
