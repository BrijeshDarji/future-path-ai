import { memo } from "react";

import Header from "./Header";
import Footer from "./Footer";
import ScrollToBottom from "./ScrollToBottom";

function Container(props) {
  return (
    <>
      <Header />
      <main className="main-div-content">{props.children}</main>
      <ScrollToBottom />
      <Footer />
    </>
  );
}

export default memo(Container);
