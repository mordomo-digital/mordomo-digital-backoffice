import React from "react";

// Modules
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

// Styles
import "./HomeStyle.css";

// Components
import * as roomTypes from "../RoomTypes/room-types";
import RoomTypesForm from "../RoomTypes/Form/FormContainer";

import RoomTasksList from "../RoomTasks/List/ListContainer";
import RoomTasksForm from "../RoomTasks/Form/FormContainer";

import * as roomItems from "../RoomItems/room-items";
import RoomItemsForm from "../RoomItems/Form/FormContainer";

import ExpressScheduleDayList from "../ExpressSchedule/ExpressScheduleDay/List/ListContainer";
import ExpressScheduleDayForm from "../ExpressSchedule/ExpressScheduleDay/Form/FormContainer";

import ExpressScheduleWeekList from "../ExpressSchedule/ExpressScheduleWeek/List/ListContainer";
import ExpressScheduleWeekForm from "../ExpressSchedule/ExpressScheduleWeek/Form/FormContainer";

import ExpressScheduleDefaultTasksWeekForm from "../ExpressSchedule/ExpressScheduleDefaultWeekTasks/Form/FormContainer";

import CleaningScheduleDayList from "../CleaningSchedule/CleaningScheduleDay/List/ListContainer";
import CleaningScheduleDayForm from "../CleaningSchedule/CleaningScheduleDay/Form/FormContainer";

import CleaningScheduleWeekList from "../CleaningSchedule/CleaningScheduleWeek/List/ListContainer";
import CleaningScheduleWeekForm from "../CleaningSchedule/CleaningScheduleWeek/Form/FormContainer";

import MarketItensList from "../MarketItens/List/ListContainer";
import MarketItensForm from "../MarketItens/Form/FormContainer";

import MarketItemGroupsList from "../MarketItemGroups/List/ListContainer";
import MarketItemGroupsForm from "../MarketItemGroups/Form/FormContainer";

import MenuOptionsList from "../MenuOptions/List/ListContainer";
import MenuOptionsForm from "../MenuOptions/Form/FormContainer";

import MenuGroupsList from "../MenuGroups/List/ListContainer";
import MenuGroupsForm from "../MenuGroups/Form/FormContainer";

import BabysitterTasksList from "../BabysitterTasks/List/ListContainer";
import BabysitterTasksForm from "../BabysitterTasks/Form/FormContainer";

import UsersList from "../Users/List/ListContainer";
import UsersForm from "../Users/Form/FormContainer";

import BonusList from "../Bonus/List/ListContainer";
import BonusForm from "../Bonus/Form/FormContainer";

import Reports from "../Reports/reports";

import ConfigSchedule from "../ConfigSchedule/configSchedule";

import MordomoStorePdfList from "../MordomoStore/pdfs/List/ListContainer";
import MordomoStorePdfForm from "../MordomoStore/pdfs/Form/FormContainer";

import CsatList from "../Csat/List/ListContainer";

// Images
import icon from "../../assets/img/icon.png";

const { Header, Content, Sider } = Layout;

const HomeView = (props) => {
  props = {
    ...props,
    ...props["parent_props"],
  };

  let menuItens = [
    [
      { title: "Cômodos" },
      { name: "Tipos", route: "room-types" },
      { name: "Tarefas", route: "room-tasks" },
      { name: "Itens", route: "room-items" },
    ],
    [
      { title: "Cronograma Express" },
      { name: "Tarefas diárias", route: "express-schedule-day" },
      { name: "Faxina semanal", route: "express-schedule-week" },
      {
        name: "Serviços comuns",
        route: "express-schedule-default-tasks-week/update",
      },
    ],
    [
      { title: "Cronograma Express v2" },
      { name: "Tarefas diárias", route: "cleaning-schedule-day" },
      { name: "Faxina semanal", route: "cleaning-schedule-week" },
    ],
    [
      { title: "Mercado" },
      { name: "Itens de mercado", route: "market-itens" },
      { name: "Grupo de itens", route: "market-item-groups" },
    ],
    [
      { title: "Cardápio" },
      { name: "Opções", route: "menu-options" },
      { name: "Grupos", route: "menu-groups" },
    ],
    { name: "Usuários", route: "users" },
    { name: "Bônus", route: "bonus" },
    [{ title: "Mordomo Store" }, { name: "PDFs", route: "mordomo-store/pdf" }],
    { name: "Relatórios", route: "reports" },
    { name: "Pesquisa de satisfação", route: "csat" },
    // { name: 'Cronograma v1.0', route: 'config-schedule' },
    // { name: 'Babá', route: 'babysitter-tasks' },
  ];

  /**
   * Check if variable is an array
   * @param {*} a variable
   */
  let isArray = function (a) {
    return !!a && a.constructor === Array;
  };

  return (
    <Layout className="home-bg">
      <Header className="header home-header">
        <div>
          <img src={icon} alt="icon" className="home-icon" />
          <div className="home-title-subtitle">
            <div className="home-title">Mordomo Digital</div>
            <div className="home-subtitle">Backoffice</div>
          </div>
        </div>
      </Header>

      <Layout
        style={{
          backgroundColor: "unset",
        }}
      >
        <Sider width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0, paddingTop: 20 }}
          >
            <Menu.Item key="1">
              <Link to="/home">Início</Link>
            </Menu.Item>

            {menuItens.map((element, index) => {
              if (!isArray(element)) {
                return (
                  <Menu.Item key={index + 2}>
                    <Link to={`/home/${element.route}`}>{element.name}</Link>
                  </Menu.Item>
                );
              } else {
                return (
                  <Menu.SubMenu
                    key={`sub${index + 2}`}
                    title={element[0].title}
                  >
                    {element.map((subElemv, subIndex) => {
                      if (subIndex > 0) {
                        return (
                          <Menu.Item key={`${index + 2}_${subIndex}`}>
                            <Link to={`/home/${subElemv.route}`}>
                              {subElemv.name}
                            </Link>
                          </Menu.Item>
                        );
                      } else return null;
                    })}
                  </Menu.SubMenu>
                );
              }
            })}

            <Menu.Item
              key={menuItens.length + 3}
              onClick={() => props.logout()}
            >
              Sair
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout
          style={{
            padding: "0 24px 24px",
            backgroundColor: "unset",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.location.pathname === "/home/room-types" &&
            !props.location.search
              ? roomTypes.roomTypesList()
              : null}
            {props.location.pathname === "/home/room-types/new" ? (
              <RoomTypesForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/room-types/update" ? (
              <RoomTypesForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/room-tasks" &&
            !props.location.search ? (
              <RoomTasksList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/room-tasks/new" ? (
              <RoomTasksForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/room-tasks/update" ? (
              <RoomTasksForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/room-items" &&
            !props.location.search
              ? roomItems.roomItemsList()
              : null}
            {props.location.pathname === "/home/room-items/new" ? (
              <RoomItemsForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/room-items/update" ? (
              <RoomItemsForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/express-schedule-day" &&
            !props.location.search ? (
              <ExpressScheduleDayList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/express-schedule-day/new" ? (
              <ExpressScheduleDayForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/express-schedule-day/update" ? (
              <ExpressScheduleDayForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/express-schedule-week" &&
            !props.location.search ? (
              <ExpressScheduleWeekList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/express-schedule-week/new" ? (
              <ExpressScheduleWeekForm parent_props={props} />
            ) : null}
            {props.location.pathname ===
            "/home/express-schedule-week/update" ? (
              <ExpressScheduleWeekForm parent_props={props} />
            ) : null}

            {props.location.pathname ===
            "/home/express-schedule-default-tasks-week/update" ? (
              <ExpressScheduleDefaultTasksWeekForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/cleaning-schedule-day" &&
            !props.location.search ? (
              <CleaningScheduleDayList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/cleaning-schedule-day/new" ? (
              <CleaningScheduleDayForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/cleaning-schedule-day/update" ? (
              <CleaningScheduleDayForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/cleaning-schedule-week" &&
            !props.location.search ? (
              <CleaningScheduleWeekList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/cleaning-schedule-week/new" ? (
              <CleaningScheduleWeekForm parent_props={props} />
            ) : null}
            {props.location.pathname ===
            "/home/cleaning-schedule-week/update" ? (
              <CleaningScheduleWeekForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/market-itens" &&
            !props.location.search ? (
              <MarketItensList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/market-itens/new" ? (
              <MarketItensForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/market-itens/update" ? (
              <MarketItensForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/market-item-groups" &&
            !props.location.search ? (
              <MarketItemGroupsList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/market-item-groups/new" ? (
              <MarketItemGroupsForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/market-item-groups/update" ? (
              <MarketItemGroupsForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/menu-options" &&
            !props.location.search ? (
              <MenuOptionsList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/menu-options/new" ? (
              <MenuOptionsForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/menu-options/update" ? (
              <MenuOptionsForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/menu-groups" &&
            !props.location.search ? (
              <MenuGroupsList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/menu-groups/new" ? (
              <MenuGroupsForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/menu-groups/update" ? (
              <MenuGroupsForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/babysitter-tasks" &&
            !props.location.search ? (
              <BabysitterTasksList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/babysitter-tasks/new" ? (
              <BabysitterTasksForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/babysitter-tasks/update" ? (
              <BabysitterTasksForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/users" &&
            !props.location.search ? (
              <UsersList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/users/update" ? (
              <UsersForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/bonus" &&
            !props.location.search ? (
              <BonusList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/bonus/new" ? (
              <BonusForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/bonus/update" ? (
              <BonusForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/mordomo-store/pdf" &&
            !props.location.search ? (
              <MordomoStorePdfList parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/mordomo-store/pdf/new" ? (
              <MordomoStorePdfForm parent_props={props} />
            ) : null}
            {props.location.pathname === "/home/mordomo-store/pdf/update" ? (
              <MordomoStorePdfForm parent_props={props} />
            ) : null}

            {props.location.pathname === "/home/reports" ? <Reports /> : null}

            {props.location.pathname === "/home/config-schedule" ? (
              <ConfigSchedule />
            ) : null}

            {props.location.pathname === "/home/csat" ? <CsatList /> : null}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomeView;
