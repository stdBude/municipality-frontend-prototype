import { useEffect } from 'react'
import './alittleMain.css'
import { useGetByUserMutation } from './elements/redux/APIs'
import { useNavigate , useParams} from 'react-router-dom'
import Header from './elements/shared/Header'

type Request = {
    
        _id: string;
        typeOfRequest : string;
        imageRef: string;
        region: string;
        description: string;
        title: string; 
        user: string;
        __v: number;
    
}

const UserData = () => {
 const {id} = useParams<{id: string}>()
  const [getRequests,{data, isLoading, isError}] = useGetByUserMutation()
   const navigate = useNavigate()
 
   useEffect(() =>{
     const token = localStorage.getItem('token')
     if(!token){
         return
     }
     const fetchData = async () => {
         await getRequests({token: token, id: id}).unwrap()
     }
    
     fetchData()
    
    
     
     }, [getRequests])
 
     const handleClick = (_id: string) => {
         navigate(`/Dashboard-item/${_id}`)
     }
 
   return (
     <div>
        <Header/>
         <div className="sidebar-header-user">
           
             <div className="table-order-user">
                 <section className="table-header-user " >
                     <p className='cell-user'>النوع</p>
                     <p className='cell-user'>المنطقة</p>
                     <p className='cell-user'>الوصف</p>
                     <p className='cell-user'>العنوان</p>
                     <p className='cell-user'>الصورة</p>
                 </section>
                 
                     {isLoading ? (
                         <p>Loading...</p>
                     ) : isError ? (
                         <p>Error occurred while fetching requests.</p>
                     ) : (
                         data?.request?.map((request:  Request) => (
                             <section className="request-card-user" onClick={() =>handleClick(request._id)} key={request._id}>
                                 <div className="table-row-user">
                                     <p className='cell-user ' style={{fontSize : "25px", backgroundColor:
                                     request.typeOfRequest === "Road Crack" ? "rgba(52, 250, 13, 0.24)": request.typeOfRequest === "Electricity" ? "rgba(20, 16, 238, 0.29)" :
                                     request.typeOfRequest === "Water Supply" ? "rgba(233, 229, 13, 0.31)" : request.typeOfRequest === "Garbage Collection" ? "rgba(231, 26, 26, 0.27)" : "rgba(14, 10, 10, 0.29)", padding: "5px", borderRadius: "5px",
                                     color: request.typeOfRequest === "Road Crack" ? "rgb(33, 168, 6)": request.typeOfRequest === "Electricity" ? "rgb(14, 12, 180)" :
                                     request.typeOfRequest === "Water Supply" ? "rgb(233, 229, 13)" : request.typeOfRequest === "Garbage Collection" ? "rgb(141, 5, 5)" : "rgb(65, 65, 65)"}}>{request.typeOfRequest}</p>
                                     <p className='cell-user' style={{fontSize : "25px"}}>{request.region}</p>
                                     
                                     {request.description.slice(0, 20) < request.description ?
                                    (<p className='cell' style={{fontSize : "20px", color: "rgb(34, 34, 34)"}}>...{request.description.slice(0, 20)}</p>):
                                    (<p className='cell' style={{fontSize : "20px", color: "rgb(32, 32, 32)"}}>{request.description.slice(0, 20)}</p>)
                                    }
                                    {request.title.slice(0, 8)< request.title ? 
                                    (<p className='cell-user cell-head-user' style={{ padding: "15px", fontWeight: "bolder"  }} >
                                            ...{request.title.slice(0, 8)}
                                    </p>) : (<p className='cell-user cell-head-user' style={{ padding: "15px", fontWeight: "bolder"  }} >
                                            {request.title.slice(0, 8)}
                                    </p>)}
                                     <img className='cell-user' src={request.imageRef} alt={request.title} />
                                     
                                 </div>
                             </section>
                         ))
                     )}
                 
             </div>
         </div>
     </div>
   )
 }

export default UserData
