import React, { Component, PropTypes } from "react";
import moment from "moment";
import { Icon } from "/imports/plugins/core/ui/client/components";
import { i18next } from "/client/api";

class EmailTableColumn extends Component {
  static propTypes = {
    row: PropTypes.object
  }

  handleAction = () => {
    const { row } = this.props;

    const emailId = row.original._id;
    const emailAddress = row.original.data.to;

    Meteor.call("emails/retryFailed", emailId, (err) => {
      if (err) {
        return Alerts.toast(i18next.t("app.error", { error: err.reason }), "error");
      }
      return Alerts.toast(i18next.t("mail.alerts.resendSuccess", { email: emailAddress }), "success");
    });
  }

  render() {
    const { row } = this.props;

    const renderColumn = row.column.id;

    if (renderColumn === "status") {
      if (row.value === "completed") {
        return (
          <span>
            <Icon icon="fa fa-circle" className="pull-left valid" />
          </span>
        );
      }
      return (
        <span>
          <Icon icon="fa fa-circle" className="pull-left error" />
          <span onClick={this.handleAction} title={this.props.data}>
            <Icon icon="fa fa-share" className="pull-right" />
          </span>
        </span>
      );
    }
    if (renderColumn === "updated") {
      const createdDate = moment(row.value).format("LLL");
      return (
        <span>{createdDate}</span>
      );
    }
    return (
      <span>{row.value}</span>
    );
  }
}

export default EmailTableColumn;
