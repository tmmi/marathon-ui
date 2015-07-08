var classNames = require("classnames");
var React = require("react/addons");

var DeploymentEvents = require("../events/DeploymentEvents");
var DeploymentStore = require("../stores/DeploymentStore");
var DeploymentActions = require("../actions/DeploymentActions");

var NavTabsComponent = React.createClass({
  displayName: "NavTabsComponent",

  propTypes: {
    activeTabId: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    tabs: React.PropTypes.array.isRequired
  },

  getInitialState: function () {
    return {
      activeDeployments: DeploymentStore.deployments.length
    };
  },

  getDefaultProps: function () {
    return {
      className: ""
    };
  },

  componentWillMount: function () {
    DeploymentStore.on(DeploymentEvents.CHANGE, () => {
      this.setState({activeDeployments: DeploymentStore.deployments.length});
    });
  },

  getBadge: function (tab) {
    if (tab.id !== "deployments" || this.state.activeDeployments < 1 ) {
      return null;
    }
    return <span className="badge">{this.state.activeDeployments}</span>;
  },

  render: function () {
    var activeTabId = this.props.activeTabId;

    var tabs = this.props.tabs.map(function (tab) {
      var tabClassSet = classNames({
        "active": tab.id === activeTabId
      });

      var badge = this.getBadge(tab);

      return (
        <li className={tabClassSet} key={tab.id}>
          <a href={"#" + tab.id}>
            {tab.text}
          </a>
          {badge}
        </li>
      );
    }, this);

    return (
      <ul className={this.props.className + " nav navbar navbar-static-top nav-tabs"}>
        {tabs}
      </ul>
    );
  }
});

module.exports = NavTabsComponent;
