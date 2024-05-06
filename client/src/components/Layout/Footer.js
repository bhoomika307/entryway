import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
        <h6 className='text-center'>
            All Right Reserved &copy; EntryWay
        </h6>
        <p className='text-center mt-3'>
            <Link to='/about'>About</Link>
            |
            <Link to='/contact'>Contact</Link>
            |
            <Link to='/policy'>Privacy Policy</Link>
           
        </p>
    </div>
  )
}

export default Footer