import React from 'react'

function Sidebar() {
  return (
    <div>
      <h2>Sidebar</h2>
      <ul>
        <li><a href="/admin/dashboard">Dashboard</a></li>
        <li><a href="/admin/users">Users</a></li>
        <li><a href="/admin/tasks">Tasks</a></li>
      </ul>
    </div>
  )
}

export default Sidebar
