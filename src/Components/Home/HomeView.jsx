import React from 'react';

// Modules
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

// Styles
import './HomeStyle.css';

// Components
// import TasksList from '../TasksList/TasksListContainer';
// import TasksForm from '../TaskForm/TaskFormContainer';

const { Header, Content, Sider } = Layout;

const HomeView = (props) => {
    
    props = {
        ...props,
        ...props['parent_props']
    };

    let menuItens = [
        { name: 'Tipos de cômodos', route: 'room-types'},
        { name: 'Tarefas', route: 'room-tasks'},
        { name: 'Itens de mercado', route: 'room-market-itens'},
    ]

    return(
        
        <Layout
            style={{
                height: '100vh',
                backgroundColor: 'unset'
            }}
        >
            
            <Header
                className="header" 
                style={{ 
                    background: 'white',
                    boxShadow: '0px 2px 4px 0px rgba(150,150,150,0.5)',
                    zIndex: 10
                }} 
            >
                <div>
                    Mordomo Digital&nbsp; &nbsp; 
                    <span
                        style={{
                            fontSize: 10,
                            fontWeight: 'lighter',
                            fontStyle: 'italic'
                        }}
                    >Backoffice</span>
                </div>
            </Header>
            
            <Layout
                style={{
                    backgroundColor: 'unset'
                }}
            >
            
                <Sider width={200} className="site-layout-background">
                    
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0, paddingTop: 20 }}
                    >
                        <Menu.Item key="1">
                            <Link to='/home'>
                                Início
                            </Link>
                        </Menu.Item>

                        {
                            menuItens.map((element, index) => {
                                return(
                                    <Menu.Item key={index + 2}>
                                        <Link to={`/home/${element.route}`}>
                                            {element.name}
                                        </Link>
                                    </Menu.Item>
                                )
                            })
                        }
                        
                        <Menu.Item 
                            key="5"
                            onClick={() => props.logout()}
                        >
                            Sair
                        </Menu.Item>
                    </Menu>
                    
                </Sider>

                <Layout 
                    style={{ 
                        padding: '0 24px 24px',
                        backgroundColor: 'unset'
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
                        
                        {/* {props.location.pathname === '/home/task' && !props.location.search ? <TasksList parent_props={props} /> : null }
                        {props.location.pathname === '/home/task' && props.location.search ? <TasksForm parent_props={props} /> : null }
                        {props.location.pathname === '/home/task/new' ? <TasksForm parent_props={props} /> : null } */}

                    </Content>

                </Layout>

            </Layout>
        </Layout>

    )

}

export default HomeView;