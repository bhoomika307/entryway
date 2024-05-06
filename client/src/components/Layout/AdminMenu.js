import React from 'react';
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-site"
            className="list-group-item list-group-item-action"
          >
            Create Site
          </NavLink>
          <NavLink
            to="/dashboard/admin/sites"
            className="list-group-item list-group-item-action"
          >
           Sites
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/bookings"
            className="list-group-item list-group-item-action"
          >
            Bookings
          </NavLink>
          
        </div>
      </div>
    </>
  );
};

export default AdminMenu