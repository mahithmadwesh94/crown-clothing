import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss'
import { useContext, useState } from "react";
import { UserContext } from "../../components/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../components/context/cart.context";

const Navigation = () => {
  const {currentUser,setCurrentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  const [cartOpen,setCartOpen] = useState(false);



  const signOutHandler = async() => {
    await signOutUser();
    setCurrentUser(null)
  }
  
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
         <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          { currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>Logout</span>
          ):(
             <Link className="nav-link" to="/auth">
             Login
           </Link>
          )}
       <CartIcon />
        </div>
       {isCartOpen && <CartDropDown/>}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
