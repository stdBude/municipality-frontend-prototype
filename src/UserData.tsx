import { useEffect } from 'react'
import './Main.css'
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
         <div className="sidebar-header">
           
             <div className="table-order">
                 <section className="table-header " >
                     <p className='cell'>Type</p>
                     <p className='cell'>Region</p>
                     <p className='cell'>Description</p>
                     <p className='cell'>image</p>
                     <p className='cell'>Title</p>
                 </section>
                 
                     {isLoading ? (
                         <p>Loading...</p>
                     ) : isError ? (
                         <p>Error occurred while fetching requests.</p>
                     ) : (
                         data?.request?.map((request:  Request) => (
                             <section className="request-card" onClick={() =>handleClick(request._id)} key={request._id}>
                                 <div className="table-row">
                                     <p className='cell '>{request.typeOfRequest}</p>
                                     <p className='cell'>{request.region}</p>
                                     <p className='cell'>...{request.description.slice(0, 10)}</p>
                                     <img className='cell' src={request.imageRef} alt={request.title} />
                                     <p className='cell cell-head' style={{ fontWeight: 'bold', fontSize: '25px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.99)', backgroundColor: '#dfc324', padding: '15px', borderRadius: '20px' }}>
                                         {request.title.slice(0, 10)}
                                     </p>
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
