import Navlink from "../../components/Navlink/Navlink";
import styles from "./Header.module.css";
import miratsLogo from "../../assets/miratsLogo.png";
import Avatar from "../../components/Avatar/Avatar";

const Header = () => {
  return (
    <>
      <div className={styles.header_container}>
        <header>
          <div className={styles.header_left}>
            <img src={miratsLogo} alt="" />
            <nav>
              <Navlink to="/">Dashboard</Navlink>
              <Navlink to="/sales-order/?view=all">Sales Order</Navlink>
            </nav>
          </div>
          <div className={styles.header_right}>
            <Avatar size="md" type="text" variant="primary">
              KS
            </Avatar>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
