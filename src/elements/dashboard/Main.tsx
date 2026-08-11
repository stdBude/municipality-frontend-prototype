import { useEffect, useState } from 'react'
import './Main.css'
import { useGetRequestsMutation } from '../redux/APIs'
import { useNavigate } from 'react-router-dom'

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
const Main = () => {
  const [getRequests,{data, isLoading, isError}] = useGetRequestsMutation()
  const navigate = useNavigate()
  const [filterRegion, setFilterRegion] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() =>{
    const token = localStorage.getItem('token')
    if(!token){
        return
    }
    const fetchData = async () => {
        await getRequests(token).unwrap()
    }
   
    fetchData()
   
   
    
    }, [getRequests])

    const handleClick = (_id: string) => {
        navigate(`/Dashboard-item/${_id}`)
    }

    const requests = data?.requests || []
    const filteredRequests = requests.filter((request: Request) => {
        const regionMatch = filterRegion
            ? request.region.toLowerCase().includes(filterRegion.toLowerCase())
            : true
        const typeMatch = filterType
            ? request.typeOfRequest.toLowerCase().includes(filterType.toLowerCase())
            : true

        return regionMatch && typeMatch
    })

  return (
    <div className='align'>
        <div className="sidebar-header">
            <section className="sidebar">
                <h2 style={{fontFamily:"Arial, Helvetica, sans-serif", fontSize:"40px", marginLeft:"10%"}}>الفلترة</h2>
                <div className="filter">
                    <div className="filter-item">
                        <input type="text" className='filter-input' id="filter" name="filter" placeholder="Region" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} />
                        <label htmlFor="filter">فلترة المكان</label>
                        
                    </div>
                    <div className="filter-item">
                        <input type="text" className='filter-input' id="filter" name="filter" placeholder="Request type" value={filterType} onChange={(e) => setFilterType(e.target.value)} />
                        <label htmlFor="filter">فلترة النوع</label>
                        
                    </div>
                </div>
            </section>
            <div className="table">
                <section className="table-header " >
                    <p className='cell'>النوع</p>
                    <p className='cell'>المنطقة</p>
                    <p className='cell'>الوصف</p>
                    <p className='cell'>العنوان</p>
                    <p className='cell'>الصورة</p>
                </section>
                <div className= "whole">
                    {isLoading ? (
                        <p style={{fontFamily:"Arial"}}>Loading...</p>
                    ) : isError ? (
                        <p>Error occurred while fetching requests.</p>
                    ) : (
                        filteredRequests.map((request: Request) => (
                            <section className="request-card"  onClick={() =>handleClick(request._id)} key={request._id}>
                                <div className="table-row">
                                    <p className='cell ' style={{fontSize : "25px" , backgroundColor:
                                     request.typeOfRequest === "Road Crack" ? "rgba(52, 250, 13, 0.24)": request.typeOfRequest === "Electricity" ? "rgba(20, 16, 238, 0.29)" :
                                     request.typeOfRequest === "Water Supply" ? "rgba(233, 229, 13, 0.31)" : request.typeOfRequest === "Garbage Collection" ? "rgba(231, 26, 26, 0.27)" : "rgba(14, 10, 10, 0.29)", padding: "5px", borderRadius: "5px",
                                     color: request.typeOfRequest === "Road Crack" ? "rgb(33, 168, 6)": request.typeOfRequest === "Electricity" ? "rgb(14, 12, 180)" :
                                     request.typeOfRequest === "Water Supply" ? "rgb(233, 229, 13)" : request.typeOfRequest === "Garbage Collection" ? "rgb(141, 5, 5)" : "rgb(65, 65, 65)" }}>{request.typeOfRequest}</p>
                                    <p className='cell' style={{fontSize : "25px"}}>{request.region}</p>
                                    {request.description.slice(0, 20) < request.description ?
                                    (<p className='cell' style={{fontSize : "15px", color: "rgb(34, 34, 34)"}}>...{request.description.slice(0, 20)}</p>):
                                    (<p className='cell' style={{fontSize : "15px", color: "rgb(32, 32, 32)"}}>{request.description.slice(0, 20)}</p>)
                                    }
                                    {request.title.slice(0, 8)< request.title ? 
                                    (<p className='cell cell-head' style={{ padding: "15px", fontWeight: "bolder"  }} >
                                            ...{request.title.slice(0, 8)}
                                    </p>) : (<p className='cell cell-head' style={{ padding: "15px", fontWeight: "bolder"  }} >
                                            {request.title.slice(0, 8)}
                                    </p>)}
                                    <img className='cell' src={request.imageRef} alt={request.title} />
                                </div>
                            </section>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main
