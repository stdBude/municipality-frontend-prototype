import { useNavigate } from "react-router-dom"
import "./FormNavigate.css"
import { FaBuildingColumns } from "react-icons/fa6";

interface Props{
    idValue : string
}

const FormNavigate = ({idValue}:Props) => {
    const navigate = useNavigate();

    const handleUser = () => {
        navigate(`/user-dashboard/${idValue}`)
    }
    const handledash = () => {
         navigate(`/user-data/${idValue}`)
    }
  return (
    <div className="form-navigate-div">
        <section className="form-navigate">
            <FaBuildingColumns id ="login-logo1"  color="rgb(211, 179, 0)" fontSize={50} />
            <h2 id="navigate-header" style={{marginTop:"0px",marginBottom:"0"}}>Choose link</h2>
            <div className="div-form-mechanism"style={{marginTop:"40px", paddingTop:"0"}}>
                <div className="div-form-mechanism-piece"style={{marginTop:"0", paddingTop:"0"}} >
                    <label className="div-form-label" htmlFor="user-data"> User Data Creation</label>
                    <button className="div-form-button" onClick={handleUser}> Enter</button>
                </div>
                <div className="div-form-mechanism-piece div-form-margin" >
                    <label className="div-form-label" htmlFor="userdashboard"> User Dashboard</label>
                    <button className="div-form-button" onClick={handledash}> Enter</button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default FormNavigate
