import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import "./layoutDefault.scss";
function LayoutDefault() {
  return (
    <>
      <div className="layout--default">
        <Header />
        <Main />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default LayoutDefault;
