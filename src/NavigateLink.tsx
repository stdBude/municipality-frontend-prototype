import { useParams } from "react-router-dom"
import Header from "./elements/shared/Header"

import FormNavigate from "./elements/Navigate/FormNavigate"


const NavigateLink = () => {
  const { id } = useParams<{ id?: string }>()

  const idValue = id ?? ""

  return (
    <div>
      <Header />
      <FormNavigate idValue={idValue} />
    </div>
  )
}

export default NavigateLink
