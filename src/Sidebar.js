import React from "react";
import CurrentUserName from "./CurrentUserName";
import NavMenu from "./NavMenu";

export default function Sidebar(props) {
  return (
    <div className="sidenav">
      <CurrentUserName cUser={props.cUser} />
      <NavMenu
        cUser={props.cUser}
        goBackHandler={props.goBackHandler}
        onHandleLogout={props.handleLogout}
        onHandleDelete={props.handleDelete}
      />
      {props.cUser ? null : (
        <ul className="sample-info">
          <li>
            <b>Sample Users:</b>
          </li>
          <li>thanh@gmail.com</li>
          <li>jenine@gmail.com</li>
          <li>marcus@gmail.com</li>
          <li>yang@gmail.com</li>
          <li>dorian@gmail.com</li>
          <li>Password: password</li>
        </ul>
      )}
    </div>
  );
}
