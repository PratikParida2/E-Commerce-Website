import React from 'react'
import { useState } from 'react'
import {AiOutlineHome,AiOutlineShopping,AiOutlineLogin,AiOutlineUserAdd,AiOutlineShoppingCart} from 'react-icons/ai';
import {FaHeart} from 'react-icons/fa'
import { Link ,Links,useNavigate} from 'react-router-dom';
import './Navigation.css'
import { useSelector,useDispatch } from 'react-redux';
import { setCredential,logout } from '../../Redux/features/Authentication/AuthenticationSlice';
import { useLoginMutation } from '../../Redux/api/usersSlice';
const Navigation = () => {
  const [userInfo]=useSelector(state=>state.login);
  const [dropDownOpen,setDropDownOpen]=useState(false);
  const [showSidebar,setShowSidebar]=useState(false);
  const toggleDropDown=()=>
  {
    setDropDownOpen(!dropDownOpen);
  }
  const toggleSidebar=()=>
  {
    setShowSidebar(!showSidebar);
  }
  const closeSidebar=()=>
  {
    setShowSidebar(false);
  }
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [login]=useLoginMutation();

  const loginHandler=async ()=>
  {
      try 
      {
        await login().unwrap();
        dispatch(login());
        navigate('/login');
      } 
      catch (error) {
        console.log("We Got An Error"+error);
      }
  }

  return (
    <div style={{zIndex:999}}
    className={`${showSidebar?'hidden':'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%]  h-[100vh] fixed` }
    id='navigation-container'
    >
      <div className='flex flex-col justify-center space-y-4'>
        <Link to='/'
          className='flex items-center transition-transform hover:translate-x-2'
        >
          <AiOutlineHome size={26}/>
          <span className='hidden nav-item-name mt-[3rem]'>HOME</span>{" "}
        </Link>
        <Link to='/shop'
          className='flex items-center transition-transform hover:translate-x-2'
        >
          <AiOutlineShopping size={26}/>
          <span className='hidden nav-item-name mt-[3rem]'>SHOP</span>{" "}
        </Link>
        <Link to='/cart'
          className='flex items-center transition-transform hover:translate-x-2'
        >
          <AiOutlineShoppingCart size={26}/>
          <span className='hidden nav-item-name mt-[3rem]'>CART</span>{" "}
        </Link>
        <Link to='/favorite'
          className='flex items-center transition-transform hover:translate-x-2'
        >
          <FaHeart size={26}/>
          <span className='hidden nav-item-name mt-[3rem]'>FAVORITE</span>{" "}
        </Link>
      </div>

      <div className="relative">
          <button onClick={toggleDropDown} className='flex items-center text-gray-800 focus:outline-none'>

          </button>
      </div>

      <div>
      <Link to='/login'
          className='flex items-center transition-transform hover:translate-x-2'
        >
          <AiOutlineLogin size={26}/>
          <span className='hidden nav-item-name mt-[3rem]'>Login</span>{" "}
        </Link>
         
          <Link to='/register'
          className='flex items-center transition-transform hover:translate-x-2'
        >
          <AiOutlineUserAdd size={26}/>
          <span className='hidden nav-item-name mt-[3rem]'>Register</span>{" "}
        </Link>
      </div>
    </div>
  )
}

export default Navigation
