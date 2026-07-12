import React, { useEffect } from 'react'
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
      {isLoading && <p>Loading...</p>}
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
              <p className="data-p p-">{data.request.typeOfRequest}<strong> :نوع المشكلة</strong> </p>
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
