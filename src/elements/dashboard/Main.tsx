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
                <h2 style={{fontFamily:"Arial, Helvetica, sans-serif", fontSize:"40px", marginLeft:"10%"}}>Filter</h2>
                <div className="filter">
                    <div className="filter-item">
                        <label htmlFor="filter">Filter Region:</label>
                        <input type="text" className='filter-input' id="filter" name="filter" placeholder="Region" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="filter">Filter Type:</label>
                        <input type="text" className='filter-input' id="filter" name="filter" placeholder="Request type" value={filterType} onChange={(e) => setFilterType(e.target.value)} />
                    </div>
                </div>
            </section>
            <div className="table">
                <section className="table-header " >
                    <p className='cell'>Type</p>
                    <p className='cell'>Region</p>
                    <p className='cell'>Description</p>
                    <p className='cell'>Title</p>
                    <p className='cell'>image</p>
                </section>
                <div className= "whole">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>Error occurred while fetching requests.</p>
                    ) : (
                        filteredRequests.map((request: Request) => (
                            <section className="request-card" onClick={() =>handleClick(request._id)} key={request._id}>
                                <div className="table-row">
                                    <p className='cell ' style={{fontSize : "25px"}}>{request.typeOfRequest}</p>
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
