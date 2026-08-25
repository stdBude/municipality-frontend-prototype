import { FaBuildingColumns } from "react-icons/fa6";
import './Header.css'
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const smallPhone = useMediaQuery({ query : "(min-width: 320px)"})
  const smallTablet = useMediaQuery({ query : "(min-width: 480px)"})
  const Tablets = useMediaQuery({ query : "(min-width: 768px)"})
  const SmallLaptop = useMediaQuery({ query : "(min-width: 1024px)"})
  const Desktop = useMediaQuery({ query : "(min-width: 1280px)"})
  return (
    <div className="will">
      <FaBuildingColumns style={{marginLeft: SmallLaptop? "10px": smallPhone?"1px" : "1px"}} color="rgb(211, 179, 0)" fontSize={SmallLaptop ?50 :smallTablet ? 40: smallPhone?35 :50} />
      <span className = "Header"> Municipality</span>
      
    </div>
  )
}

export default Header
