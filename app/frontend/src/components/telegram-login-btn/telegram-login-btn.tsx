// @flow
import React, { Context } from "react";
import PropTypes from "prop-types";
import { login } from "../../utils/login";
import { NavigateFunction, NavigateProps, RouterProps, useNavigate } from "react-router-dom";
import AppContext, { appContext } from "../app-context/app-context";
import { JsxElement } from "typescript";

interface Props {
  botName: string;
  dataOnauth?: (user: any) => void;
  buttonSize?: "large" | "medium" | "small";
  dataAuthUrl?: string;
  cornerRadius?: number;
  requestAccess?: string;
  usePic?: boolean;
  lang?: string;
  widgetVersion?: number;
  className?: string;
  children?: React.ReactNode;
  navigate: NavigateFunction;
  //contextType: JsxElement;
}

export class TelegramLoginButton extends React.Component<Props> {
  //readonly navigate = useNavigate();
  static contextType = appContext;
  readonly context!: React.ContextType<typeof appContext>

  componentDidMount() {
    const {
      botName,
      buttonSize,
      cornerRadius,
      requestAccess,
      usePic,
      dataOnauth,
      dataAuthUrl,
      lang,
      widgetVersion,
    } = this.props;
    window.TelegramLoginWidget = {
      dataOnauth: (user: any) => {
        dataOnauth && dataOnauth(user);
        login(user, this.props.navigate, this.context.setNewState);
      },
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?" + widgetVersion;
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize || "large");
    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", String(cornerRadius));
    }
    script.setAttribute("data-request-access", requestAccess || "write");
    script.setAttribute("data-userpic", usePic ? "true" : "false");
    script.setAttribute("data-lang", lang || "en");
    if (dataAuthUrl !== undefined) {
      script.setAttribute("data-auth-url", dataAuthUrl);
    } else {
      script.setAttribute(
        "data-onauth",
        "TelegramLoginWidget.dataOnauth(user)"
      );
    }
    script.async = true;
    if (this.instance) {
      this.instance.appendChild(script);
    }
  }

  instance: HTMLDivElement | null = null;

  render() {
    const { className, children } = this.props;
    return (
      <div
        className={className}
        ref={(component) => {
          this.instance = component;
        }}
      >
        {children}
      </div>
    );
  }
}

/*TelegramLoginButton.propTypes = {
  botName: PropTypes.string.isRequired,
  dataOnauth: PropTypes.func,
  buttonSize: PropTypes.oneOf(["large", "medium", "small"]),
  cornerRadius: PropTypes.number,
  requestAccess: PropTypes.string,
  usePic: PropTypes.bool,
  lang: PropTypes.string,
  widgetVersion: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};

TelegramLoginButton.defaultProps = {
  botName: "samplebot",
  dataOnauth: undefined,
  buttonSize: "large",
  requestAccess: "write",
  usePic: true,
  lang: "en",
  widgetVersion: 9,
};*/