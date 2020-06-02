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
        <div className="sample-info">
          <ul>
            <li>
              <b>Sample Users:</b>
            </li>
            <li>thanh@gmail.com</li>
            <li>jenine@gmail.com</li>
            <li>marcus@gmail.com</li>
            <li>yang@gmail.com</li>
            <li>dorian@gmail.com</li>
            <br />
            <li>Password: password</li>
            <li>
              <a href="https://github.com/dannylee8/m5f">
                GitHub Frontend repo
              </a>
            </li>
            <li>
              <a href="https://github.com/dannylee8/m5b">GitHub Backend repo</a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=_rki3cc7K0g">
                Video walkthru at YouTube
              </a>
            </li>
            <li>
              <a href="https://www.panix.com/~dreamer/">Visit my homepage</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
