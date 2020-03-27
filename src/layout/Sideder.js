import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import icon_sw from '../const/image/icon-sw.png'
import icon_sw1 from '../const/image/icon-sw1.png'
import '../component/bg.css'
class Sideder extends Component {
    render() {
        return (
            <div >
 {/* Main Sidebar Container */}
 <aside className="main-sidebar sidebar-dark-primary elevation-4" >
    {/* Brand Logo */}
    <NavLink exact to="/profile" className="brand-link ">
      <img src={icon_sw} alt="SW Logo"  className="brand-image img-circle  elevation-3 " style={{opacity: '.8' }} />
      <span className="brand-text font-weight-light"><img src={icon_sw1} alt="SW Logo"  className="brand-image elevation-3 "style={{opacity: '.8' }} /></span>
      <br></br>
    </NavLink>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
          <div className="height nav-item " >
            <NavLink exact to="/"activeClassName="active" className="nav-link  " >
              <i className="nav-icon fas fa-tachometer-alt" />
              <p >
               ABOUT
                
              </p>
            </NavLink >
          </div>

          {/* <li className=" nav-header">EXAMPLES</li> */}
          <div className="height nav-item">
          <NavLink exact to="/" className="nav-link" activeClassName="active">
              <i className="nav-icon far fa-calendar-alt" />
              <p>
                 MYPROJECT
                {/* <span className="badge badge-info right">2</span> */}
              </p>
            </NavLink>
          </div>

            
           
          
              <li className=" nav-header">ประสบการณ์การทำงาน</li>
                
              
              <div className="height nav-item">
                <NavLink exact to="/ShowAirport" activeClassName="active" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>สถานที่</p>
                </NavLink>
              </div>
            
      
          
          {/* <li className="nav-header">LABELS</li>
          <li className="nav-item">
            <NavLink exact to="/Important" className="nav-link">
              <i className="nav-icon far fa-circle text-danger" />
              <p className="text">Important</p>
            </NavLink>
          </li> */}
          <br/>
         
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
 
</div>

        )
    }
}
export default withRouter(Sideder)