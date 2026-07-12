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
    <div>
        <div className="sidebar-header">
            <section className="sidebar">
                <h2>Filter</h2>
                <div className="filter">
                    <div className="filter-item">
                        <label htmlFor="filter">Filter Region:</label>
                        <input type="text" id="filter" name="filter" placeholder="Region" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="filter">Filter Type:</label>
                        <input type="text" id="filter" name="filter" placeholder="Request type" value={filterType} onChange={(e) => setFilterType(e.target.value)} />
                    </div>
                </div>
            </section>
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
                        filteredRequests.map((request: Request) => (
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

export default Main
