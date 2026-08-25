import { useEffect, useState } from 'react'
import './Main.css'
import { useGetRequestsMutation, useGetCountsMutation } from '../redux/APIs'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaRoad } from "react-icons/fa6";
import { IoTrashBinSharp } from "react-icons/io5";
import { IoWater } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiUserCommunityFill } from "react-icons/ri";
import { IoChatboxEllipses } from "react-icons/io5";

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

type RequestsResponse = {
    requests?: Request[]
}

const Main = () => {
    const [getRequests, { isLoading: requestsLoading, isError: requestsError }] = useGetRequestsMutation()
    const [getCounts, { data: countsData, isLoading: countsLoading, isError: countsError }] = useGetCountsMutation()
    const navigate = useNavigate()
    const [filterRegion, setFilterRegion] = useState('');
    const [filterType, setFilterType] = useState('');
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentStatePage, setCurrentStatePage] = useState<number[]>([])
    const [pressed, setPressed] = useState<boolean[]>([false,false])
    const [data, setData] = useState<Request[]>([])



  useEffect(() =>{
    const token = localStorage.getItem('token')
    if(!token){
        return
    }
    const fetchData = async () => {
        const dataTem = (await getRequests({ token, currentPage }).unwrap()) as RequestsResponse | Request[]
        const counts = await getCounts(token).unwrap()  // ✅ use the resolved data
        const normalizedRequests = Array.isArray(dataTem) ? dataTem : dataTem?.requests ?? []
        setData(normalizedRequests)
            const pages = Math.ceil(counts.theWhole / 5)
            setTotalPages(pages)

            const pageArray = Array.from({ length: pages }, (_, i) => i + 1)
            setCurrentStatePage(pageArray)
    }
    
    fetchData()
   
   
    
    }, [getRequests, getCounts, currentPage])

    const handleClick = (_id: string) => {
        navigate(`/Dashboard-item/${_id}`)
    }

    const filteredRequests = data.filter((request: Request) => {
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
                <div className='statistics'>
                    <div className='statisics-total'>
                        
                       <p style = {{fontWeight:"bold", display: "inline-block" }}> العدد الكلي </p>
                       <RiUserCommunityFill style={{display: "inline-block", position:"relative", left: "35%",  top: "3%"}} size = "35px" />
                       <div className='totals'>
                            <div className='total-results'>
                                <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline',position:"relative", top:"10px"}}> العدد اكلي للنتائج </p>
                                {countsLoading ? (
                                <p>loading</p>
                                ) : countsError ? (
                                <p>error</p>
                                ) : countsData ? (
                                <p style = {{fontWeight:"bold",fontSize: "40px", position:"relative", top:"10px"}}>{countsData.theWhole}</p>
                                    ) : null}
                            </div>
                            <div className='total-results'>
                                <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}> العدد الكلي للمناطق</p>
                                {countsLoading ? (
                                <p>loading</p>
                                ) : countsError ? (
                                <p>error</p>
                                ) : countsData ? (
                                <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px" }}>{countsData.perArea}</p>
                                    ) : null}
                            </div>
                        </div>
                    </div>
                    <div className='statisics-by-type'>
                       <p style ={{fontWeight:"bold", display: "inline-block", marginBottom : "7px" }}> تعداد بالنوع </p>
                       <IoChatboxEllipses style={{display: "inline-block", position:"relative", left: "32%", top: "3%"}} size = "35px" />
                       { countsLoading? <p>loading</p>: countsError ? <p>error</p>: countsData?(<div className='type-whole'>
                        
                        <div className='type-ind'>
                            <BsLightningChargeFill className='icons' size = "35px" color='rgb(233, 229, 13)'/>
                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Electricity</p>
                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px", marginBottom: "2px",marginTop: "2px" }}>{countsData.electricity}</p>
                            <div className="progress-container">
                                <div className="progress-bar" style={{"--progress": `${countsData.electricity/countsData.theWhole*100}%`, "--color": "rgb(233, 229, 13)"} as React.CSSProperties}></div>
                            </div>
                        </div>
                        <div className='type-ind'>
                            <FaRoad className='icons' size = "35px" color='rgb(33, 168, 6)'/>
                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Road Crack</p>
                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px" ,  marginBottom: "2px",marginTop: "2px"}}>{countsData.roadCrack}</p>
                            <div className="progress-container">
                                <div className="progress-bar" style={{"--progress": `${countsData.roadCrack/countsData.theWhole*100}%`, "--color": "rgb(33, 168, 6)"} as React.CSSProperties}></div>
                            </div>
                        </div>
                        <div className='type-ind'>
                            <IoWater className='icons' size = "35px" color="rgb(25, 21, 219)"/>
                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Water Supply</p>
                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px",  marginBottom: "2px",marginTop: "2px" }}>{countsData.waterSupply}</p>
                            <div className="progress-container">
                                <div className="progress-bar" style={{"--progress": `${countsData.waterSupply/countsData.theWhole*100}%`, "--color": "rgb(25, 21, 219)"} as React.CSSProperties}></div>
                            </div>
                        </div>
                        <div className='type-ind'>
                            <IoTrashBinSharp className='icons' size = "35px" color="rgb(206, 5, 5)"/>
                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Garbage Collection</p>
                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px",  marginBottom: "2px",marginTop: "2px" }}>{countsData.garbageCollection}</p>
                            <div className="progress-container">
                                <div className="progress-bar" style={{"--progress": `${countsData.garbageCollection/countsData.theWhole*100}%`, "--color": "rgb(206, 5, 5)"} as React.CSSProperties}></div>
                            </div>
                        </div>
                        <div className='type-ind'>
                            <HiDotsHorizontal className='icons' size = "35px" color="#1b1b1b"/>
                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Other</p>
                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px",marginBottom: "2px",marginTop: "2px" }}>{countsData.other}</p>
                            <div className="progress-container">
                                <div className="progress-bar" style={{"--progress": `${countsData.other/countsData.theWhole*100}%`, "--color": "#1b1b1b"} as React.CSSProperties}></div>
                            </div>
                        </div>
                       </div>) : null}
                    </div>
                </div>
                <section className="table-header " >
                    <p className='cell'>النوع</p>
                    <p className='cell'>المنطقة</p>
                    <p className='cell'>الوصف</p>
                    <p className='cell'>العنوان</p>
                    <p className='cell'>الصورة</p>
                </section>
                <div className= "whole">
                    {requestsLoading ? (
                        <AiOutlineLoading3Quarters className='frame2' size={"50px"} color='rgb(11, 74, 211)'/>
                    ) : requestsError ? (
                        <p>Error occurred while fetching requests.</p>
                    ) : (
                        
                        filteredRequests.map((request: Request) => (
                            <section className="request-card"  onClick={() =>handleClick(request._id)} key={request._id}>
                                <div className="table-row">
                                    <p className='cell ' style={{fontSize : "25px" , backgroundColor:
                                     request.typeOfRequest === "Road Crack" ? "rgba(52, 250, 13, 0.24)": request.typeOfRequest === "Electricity" ? "rgba(233, 229, 13, 0.29)" :
                                     request.typeOfRequest === "Water Supply" ? "rgba(24, 21, 219, 0.27)" : request.typeOfRequest === "Garbage Collection" ? "rgba(231, 26, 26, 0.27)" : "rgba(14, 10, 10, 0.29)", padding: "5px", borderRadius: "5px",
                                     color: request.typeOfRequest === "Road Crack" ? "rgb(33, 168, 6)": request.typeOfRequest === "Electricity" ? "rgb(233, 229, 13)" :
                                     request.typeOfRequest === "Water Supply" ? "rgb(24, 21, 219)" : request.typeOfRequest === "Garbage Collection" ? "rgb(141, 5, 5)" : "rgb(65, 65, 65)" }}>{request.typeOfRequest}</p>
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
                    <div className="pagination1">
                        <button style = {{display: "inline", paddingInline : "30px"}} onClick={() => {
                                    const curr = currentPage -1 
                                    setPressed([true, false])
                                    setTimeout(() => {
                                        setPressed([false, false])
                                    }, 500)
                                    if(curr<= 0)
                                        return
                                    setCurrentPage(curr)
                                    const pre = curr-1
                                    const after = curr +1
                                    if(pre > 0 && after <= totalPages){
                                        setCurrentStatePage([pre, currentPage, after])

                                    }else if(pre <= 0 && after <= totalPages){
                                        setCurrentStatePage([currentPage, after])
                                    }else if(pre > 0 && after > totalPages){
                                        setCurrentStatePage([pre ,currentPage])
                                    }else{
                                        setCurrentStatePage([currentPage])
                                    }
                                    
                        }} className= {pressed[0]?'pressed': ""}>Back</button>
                        {Array.from({ length: currentStatePage.length }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => {
                                    const curr = i + 1
                                    setCurrentPage(i + 1)
                                    const pre = curr-1
                                    const after = curr +1
                                    if(pre > 0 && after <= totalPages){
                                        setCurrentStatePage([pre, currentPage, after])

                                    }else if(pre <= 0 && after <= totalPages){
                                        setCurrentStatePage([currentPage, after])
                                    }else if(pre > 0 && after > totalPages){
                                        setCurrentStatePage([pre ,currentPage])
                                    }else{
                                        setCurrentStatePage([currentPage])
                                    }
                                }}
                                className={currentPage === i + 1 ? 'active' : 'unactivated'}
                                style = {{display: "inline", paddingInline : "17px"}}
                            >   
                                {i + 1}
                            </button>
                        ))}
                        <button style = {{display: "inline", paddingInline : "30px"}} onClick={() => {
                                    const curr = currentPage + 1 
                                    setPressed([false, true])
                                    setTimeout(() => {
                                        setPressed([false, false])
                                    }, 500)
                                    if(curr> totalPages)
                                        return
                                    setCurrentPage(curr)
                                    const pre = curr-1
                                    const after = curr +1
                                    if(pre > 0 && after <= totalPages){
                                        setCurrentStatePage([pre, currentPage, after])

                                    }else if(pre <= 0 && after <= totalPages){
                                        setCurrentStatePage([currentPage, after])
                                    }else if(pre > 0 && after > totalPages){
                                        setCurrentStatePage([pre ,currentPage])
                                    }else{
                                        setCurrentStatePage([currentPage])
                                    }
                                    
                        }} className= {pressed[1]?'pressed': ""}>next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main
