import  { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Header from './elements/shared/Header'
import { useGetRequestByIdMutation } from './elements/redux/APIs'
import './DashboardItem.css'

const DashboardItem = () => {
  const {id} = useParams<{id: string}>()
  const [getRequestById,{data, isLoading, isError}] = useGetRequestByIdMutation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
        return
    }
    const fetchData = async () => {
        await getRequestById({id, token}).unwrap()
      }
      fetchData()
  },[])
  return (
    <div>
      <Header/>
      {isLoading && <p style={{fontFamily: "Arial", textAlign: "center", position: "relative", top: "200px"}}>Loading...</p>}
      {isError && <p>Error occurred while fetching request details.</p>}
      {data && (
        <div>
         { data?.request && (
          <div>
            <section className="request-details">
              <h2 style={{ textAlign: 'right' }}>{data.request.title}</h2>
              <section className="request-info">
                <img src={data.request.imageRef} alt={data.request.title} />
              </section>
            </section>
             <section className="request-details data" >
              <p className="data-p p-"><a style={{backgroundColor:
              data.request.typeOfRequest === "Road Crack" ? "rgba(52, 250, 13, 0.24)": data.request.typeOfRequest === "Electricity" ? "rgba(20, 16, 238, 0.29)" :
              data.request.typeOfRequest === "Water Supply" ? "rgba(233, 229, 13, 0.31)" : data.request.typeOfRequest === "Garbage Collection" ? "rgba(231, 26, 26, 0.27)" : "rgba(14, 10, 10, 0.29)", padding: "5px", borderRadius: "5px",
              color: data.request.typeOfRequest === "Road Crack" ? "rgb(33, 168, 6)": data.request.typeOfRequest === "Electricity" ? "rgb(14, 12, 180)" :
              data.request.typeOfRequest === "Water Supply" ? "rgb(233, 229, 13)" : data.request.typeOfRequest === "Garbage Collection" ? "rgb(141, 5, 5)" : "rgb(65, 65, 65)"}}>{data.request.typeOfRequest}</a><strong> :نوع المشكلة</strong> </p>
              <p className="data-p p-"><strong> المنطقة: </strong>{data.request.region} </p>
              <div className="data-p">
                <a id="description-label"> :الوصف</a>
                <p >{data.request.description} </p>
              </div>
            </section>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DashboardItem
