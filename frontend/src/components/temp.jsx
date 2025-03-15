import React from 'react'
import { Link } from 'react-router-dom'

const Temp = () => {
  return (
    <div className="flex gap-2">
    <Link to="/user/login" className="btn btn-outline btn-sm">
        Login
    </Link>
    <Link to="/user/signup" className="btn btn-primary btn-sm">
        Signup
    </Link>
</div>
  )
}

export default Temp