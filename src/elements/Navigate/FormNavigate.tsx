import { useNavigate } from "react-router-dom"
import "./FormNavigate.css"

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
            <h2 id="navigate-header" >Choose link</h2>
            <div className="div-form-mechanism">
                <div className="div-form-mechanism-piece">
                    <label className="div-form-label" htmlFor="user-data"> User Data</label>
                    <button className="div-form-button" onClick={handleUser}> Enter</button>
                </div>
                <div className="div-form-mechanism-piece">
                    <label className="div-form-label" htmlFor="userdashboard"> User Data Creation</label>
                    <button className="div-form-button" onClick={handledash}> Enter</button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default FormNavigate
