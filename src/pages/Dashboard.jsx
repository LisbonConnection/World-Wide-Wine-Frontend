import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <>
    <div>
        <Link to="/addwine">
        <button>Create a wine</button>
        </Link>
    </div>
    </>

  )
}

export default Dashboard