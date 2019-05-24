import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signout } from "../../actions/userActions";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  signout() {
    this.props.signout();
    window.location.href = "/";
  }

  render() {
    return (
      <div>
        <Nav>
          <NavItem>
            <NavLink href="/main" active>
              Scheduler
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/personal">Personal</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/groupmain">Group</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/recommendation">Recommendation</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/ranking">Ranking</NavLink>
          </NavItem>

          <Nav className="ml-auto">
            <NavItem>
              <NavLink href="/" onClick={this.signout.bind(this)}>
                Sign Out
              </NavLink>
            </NavItem>
          </Nav>
        </Nav>
      </div>
    );
  }
}

Header.propTypes = {
  signout: PropTypes.func.isRequired,
  userState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userState: state.userState
});

export default connect(
  mapStateToProps,
  { signout }
)(Header);
