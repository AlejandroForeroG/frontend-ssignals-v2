import styled from "styled-components";
import { v } from "../styles/Variables";
import logo from "../assets/logo.png";
import { AiOutlineExperiment } from "react-icons/ai";
import { BsCaretLeft } from "react-icons/bs";
import { BiHomeAlt2 } from "react-icons/bi";
import {
  MdOutlineAnalytics,
  MdLogout,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { NavLink } from "react-router-dom";


export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container isOpen={sidebarOpen}>
      <button className="Sidebarbutton" onClick={toggleSidebar}>
        <BsCaretLeft />
      </button>
      <div className="Logocontent">
        <div className="imgcontent">
          <img src={logo} alt="logo BIO-OPs" />
        </div>
        <h2> BIO-OPs</h2>
      </div>
      {linksArray.map(({ icon, label, to }) => (
        <div className="LinksContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? `  active` : ``}`}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
      <Divider />
      {secondarylinksArray.map(({ icon, label, to }) => (
        <div className="LinksContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? `  active` : ``}`}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
      <Divider />
    </Container>
  );
}


//#region paginas
const secondarylinksArray = [
  {
    label: "Cuenta",
    icon: <MdOutlineAccountCircle />,
    to: "/",
  },
  {
    label: "Salir",
    icon: <MdLogout />,
    to: "/",
  },
];
const linksArray = [
  {
    label: "Home",
    icon: <BiHomeAlt2 />,
    to: "/",
  },
  {
    label: "Base De Datos",
    icon: <MdOutlineAnalytics />,
    to: "/BaseDatos",
  },
  {
    label: "Pruebas",
    icon: <AiOutlineExperiment />,
    to: "/Pruebas",
  },
];
//#endregion
//#region Styled components

const Container = styled.div`
  z-index: 10;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  color: #212427;
  background-color: #fcfcfd;
  position: sticky;
  height: 100%;
  .Sidebarbutton {
    position: absolute;

    top: ${v.xxlSpacing};
    right: ${({ isOpen }) => (isOpen ? `-18px` : `-40px`)};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #fcfcfd;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? `intial` : `rotate(180deg)`)};
    border: none;
    letter-spacing: inherit;
    text-align: inherit;
    padding: 0;
    font-family: inherit;
    outline: none;
  }
  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${v.lgSpacing}-3;
  }
  .LinksContainer {
    margin: 8px 0;
    padding: 0 15%;
    :hover {
      background-color: #f0f0f0;
    }
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing}-2) 0;
      color: #212427;
      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;
        svg {
          font-size: 25px;
        }
      }
      &.active {
        .Linkicon {
          svg {
            color: ${v.primaryColor};
          }
        }
      }
    }
  }
  .imgcontent {
    display: flex;
    padding-top: 20px;
    img {
      width: 100px;
      max-width: 100%;
      height: auto;
    }
    cursor: pointer;
    transition: all 0.5s;
    transform: ${({ isOpen }) =>
      isOpen ? `scale(0.5)` : `scale(0.7) rotate(180deg)`};
  }
  h2 {
    display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
    font-size: 2rem;
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e0e0e0;
  margin: ${v.lgSpacing} 0;
`;
//#endregion
