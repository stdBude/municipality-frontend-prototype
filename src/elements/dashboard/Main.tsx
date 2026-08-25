import {  useEffect, useState } from 'react'
import './Main.css'
import { useGetRequestsMutation, useGetCountsMutation, useGetCountsWholeMutation } from '../redux/APIs'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaRoad } from "react-icons/fa6";
import { IoTrashBinSharp } from "react-icons/io5";
import { IoWater } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiUserCommunityFill } from "react-icons/ri";
import { IoChatboxEllipses } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

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

   



const getVisiblePages = (page: number, total: number): number[] => {
    if (total <= 0) return []

    const pre = page - 1
    const after = page + 1

    if (pre > 0 && after <= total) return [pre, page, after]
    if (pre <= 0 && after <= total) return [page, after]
    if (pre > 0 && after > total) return [pre, page]
    return [page]
}

const Main = () => {
    const [getRequests, { data: allRequest,isLoading: requestsLoading, isError: requestsError }] = useGetRequestsMutation()
    const [getCounts, { data: countsData, isLoading: countsLoading, isError: countsError }] = useGetCountsMutation()
    const [getCountsWhole, {  isLoading: countsWholeLoading, isError: countsWholeError }] = useGetCountsWholeMutation()
    const navigate = useNavigate()
    const [filterRegion, setFilterRegion] = useState('');
    const [filterType, setFilterType] = useState('');
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentStatePage, setCurrentStatePage] = useState<number[]>([])
    const [pressed, setPressed] = useState<boolean[]>([false,false])
    const [pressEnter, setPressEnter] = useState<boolean>(false)
    const [appliedType, setAppliedType] = useState<string>("")
    const [appliedRegion, setAppliedRegion] = useState<string>("")
    const smallPhone = useMediaQuery({ query : "(min-width: 320px)"})
    const smallTablet = useMediaQuery({ query : "(min-width: 480px)"})
    const Tablets = useMediaQuery({ query : "(min-width: 768px)"})
    const SmallLaptop = useMediaQuery({ query : "(min-width: 1024px)"})
    const Desktop = useMediaQuery({ query : "(min-width: 1280px)"})


  useEffect(() =>{
    const token = localStorage.getItem('token')
    if(!token){
        return
    }
    const fetchData = async () => {
        await getRequests({ token, page: currentPage, type : filterType, region: filterRegion }).unwrap()
        const countsWhole = await getCountsWhole({token, type : filterType, region : filterRegion}).unwrap()  // ✅ use the resolved data
    
                const pages = Math.ceil(countsWhole.theWhole / 5)
                setTotalPages(pages)
    
                const pageArray = Array.from({ length: pages }, (_, i) => i + 1)
                setCurrentStatePage(pageArray)
                setCurrentPage(Math.min(currentPage, pages))
    }
    
    fetchData()
   
   
    
    }, [getRequests,getCountsWhole, currentPage, appliedType, appliedRegion])

    useEffect(() =>{
         const token = localStorage.getItem('token')
         if(!token){
             return
         }
         const fetchData = async () => {
             
             await getCounts(token).unwrap()
             
         }
        
         fetchData()
        
        
         
         }, [getCounts])

    const handleClick = (_id: string) => {
        navigate(`/Dashboard-item/${_id}`)
    }
    const handleEnter = () =>{
        setPressEnter(true)
        const token = localStorage.getItem("token")

        if(!token)
            return

        getRequests({token: token, page: currentPage, type : filterType, region: filterRegion})
        setAppliedType(filterType)
        setAppliedRegion(filterRegion)
        setTimeout(() => {
            setPressEnter(false)
        }, 500)
    }

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
                    <div>
                        <button className={pressEnter?"button-of-enter activeEnter" :"button-of-enter"}  onClick={handleEnter}>ادخال</button>
                    </div>
                </div>
            </section>
            <div className="table">
                <div className='statistics'>
                    <div className='statisics-total'>
                        
                       <p style = {{fontWeight:"bold", display: "inline-block" }}> العدد الكلي </p>
                       <RiUserCommunityFill style={{display: "inline-block", position:"relative", left:Desktop?"35%":smallPhone? "32%": "35%",  top: "3%"}} size = {SmallLaptop? "35px":smallPhone? "25px":"35px"} />
                       <div className='totals'>
                            <div className='total-results'>
                                <p style = {{fontSize: Desktop? "" :Tablets? "12px": smallPhone? "15px" : "",fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline',position:"relative", top:"10px"}}> العدد اكلي للنتائج </p>
                                {countsLoading ? (
                                <p>loading</p>
                                ) : countsError ? (
                                <p>error</p>
                                ) : countsData ? (
                                <p style = {{fontWeight:"bold",fontSize:Desktop? "40px" :Tablets? "30px": smallPhone? "40px" : "", position:"relative", top:"10px"}}>{countsData.theWhole}</p>
                                    ) : null}
                            </div>
                            <div className='total-results'>
                                <p style = {{fontSize:Desktop? "" :Tablets? "12px": smallPhone? "15px" : "",fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}> العدد الكلي للمناطق</p>
                                {countsLoading ? (
                                <p>loading</p>
                                ) : countsError ? (
                                <p>error</p>
                                ) : countsData ? (
                                <p style = {{fontWeight:"bold", fontSize:Desktop? "40px" :Tablets? "30px": smallPhone? "40px" : "", position:"relative", top:"10px" }}>{countsData.perArea}</p>
                                    ) : null}
                            </div>
                        </div>
                    </div>
                    <div className='statisics-by-type' >
                       <p style ={{fontWeight:"bold", display: "inline-block", marginBottom : "7px", marginLeft:smallPhone?  "20px" : "" }}>تعداد بالنوع</p>
                       <IoChatboxEllipses style={{display: "inline-block", position:"relative", left:Desktop? "32%":Tablets? "13%":smallPhone?"22%" : "32%", top: "3%" }} size ={Desktop? "35px":Tablets? "22px" :smallPhone? "25px": "35px"} />
                       { countsLoading? <p>loading</p>: countsError ? <p>error</p>: countsData?(<div className='type-whole'>
                        
                        <div className='type-ind'>
                            <BsLightningChargeFill className='icons' size = {Desktop?"35px":Tablets ? "15px":smallPhone? "20px": "35px"} color='rgb(233, 229, 13)'/>
                            <p style = {{fontWeight:"bold" ,padding:"0", color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Electricity</p>
                            <p style = {{fontWeight:"bold", fontSize:Desktop?"40px": Tablets?"20px" :smallPhone? "30px": "40px", position:"relative", top:"10px", marginBottom: "2px",marginTop: "2px" }}>{countsData.electricity}</p>
                            <div className="progress-container">
                                {Desktop? <div className="progress-bar" style={{"--progress": `${countsData.electricity/countsData.theWhole*100}%`, "--color": "rgb(233, 229, 13)"} as React.CSSProperties}></div>:Tablets? null:<div className="progress-bar" style={{"--progress": `${countsData.electricity/countsData.theWhole*100}%`, "--color": "rgb(233, 229, 13)"} as React.CSSProperties}></div>}
                            </div>
                        </div>
                        <div className='type-ind'>
                            <FaRoad className='icons' size = {Desktop?"35px":Tablets ? "15px":smallPhone? "20px": "35px"} color='rgb(33, 168, 6)'/>
                            <p style = {{fontWeight:"bold" ,padding:"0", color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Road Crack</p>
                            <p style = {{fontWeight:"bold", fontSize:Desktop?"40px": Tablets?"20px" :smallPhone? "30px": "40px", position:"relative", top:"10px" ,  marginBottom: "2px",marginTop: "2px"}}>{countsData.roadCrack}</p>
                            <div className="progress-container">
                                {Desktop? <div className="progress-bar" style={{"--progress": `${countsData.roadCrack/countsData.theWhole*100}%`, "--color": "rgb(33, 168, 6)"} as React.CSSProperties}></div>:Tablets? null:<div className="progress-bar" style={{"--progress": `${countsData.roadCrack/countsData.theWhole*100}%`, "--color": "rgb(33, 168, 6)"} as React.CSSProperties}></div>}
                            </div>
                        </div>
                        <div className='type-ind'>
                            <IoWater className='icons' size = {Desktop?"35px":Tablets ? "15px":smallPhone? "20px": "35px"} color="rgb(25, 21, 219)"/>
                            <p style = {{fontWeight:"bold" ,padding:"0", color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Water Supply</p>
                            <p style = {{fontWeight:"bold", fontSize: Desktop?"40px": Tablets?"20px" :smallPhone? "30px": "40px", position:"relative", top:"10px",  marginBottom: "2px",marginTop: "2px" }}>{countsData.waterSupply}</p>
                            <div className="progress-container">
                                {Desktop? <div className="progress-bar" style={{"--progress": `${countsData.waterSupply/countsData.theWhole*100}%`, "--color": "rgb(25, 21, 219)"} as React.CSSProperties}></div>:Tablets? null:<div className="progress-bar" style={{"--progress": `${countsData.waterSupply/countsData.theWhole*100}%`, "--color": "rgb(25, 21, 219)"} as React.CSSProperties}></div>}
                            </div>
                        </div>
                        <div className='type-ind'>
                            <IoTrashBinSharp className='icons' size = {Desktop?"35px":Tablets ? "15px":smallPhone? "20px": "35px"} color="rgb(206, 5, 5)"/>
                            <p style = {{fontWeight:"bold" ,padding:"0",color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Garbage Collection</p>
                            <p style = {{fontWeight:"bold", fontSize: Desktop?"40px": Tablets?"20px" :smallPhone? "30px": "40px", position:"relative", top:"10px",  marginBottom: "2px",marginTop: "2px" }}>{countsData.garbageCollection}</p>
                            <div className="progress-container">
                                {Desktop?<div className="progress-bar" style={{"--progress": `${countsData.garbageCollection/countsData.theWhole*100}%`, "--color": "rgb(206, 5, 5)"} as React.CSSProperties}></div> :Tablets? null:<div className="progress-bar" style={{"--progress": `${countsData.garbageCollection/countsData.theWhole*100}%`, "--color": "rgb(206, 5, 5)"} as React.CSSProperties}></div>}
                            </div>
                        </div>
                        <div className='type-ind'>
                            <HiDotsHorizontal className='icons' size = {Desktop?"35px":Tablets ? "15px":smallPhone? "20px": "35px"} color="#1b1b1b"/>
                            <p style = {{fontWeight:"bold" ,padding:"0", color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Other</p>
                            <p style = {{fontWeight:"bold", fontSize:Desktop?"40px": Tablets?"20px" :smallPhone? "30px": "40px", position:"relative", top:"10px",marginBottom: "2px",marginTop: "2px" }}>{countsData.other}</p>
                            <div className="progress-container">
                                {Desktop? <div className="progress-bar" style={{"--progress": `${countsData.other/countsData.theWhole*100}%`, "--color": "#1b1b1b"} as React.CSSProperties}></div>:Tablets? null:<div className="progress-bar" style={{"--progress": `${countsData.other/countsData.theWhole*100}%`, "--color": "#1b1b1b"} as React.CSSProperties}></div>}
                            </div>
                        </div>
                       </div>) : null}
                    </div>
                </div>
                <section className="table-header " >
                    <p className='cell'>النوع</p>
                    {Tablets ? <p className='cell'>المنطقة</p> :smallPhone? null:
                    <p className='cell'>المنطقة</p>}
                    
                    <p className='cell'>العنوان</p>
                    {Tablets ?<p className='cell'>الوصف</p> :smallPhone? null:
                    <p className='cell'>الوصف</p>}
                    <p className='cell'>الصورة</p>
                </section>
                <div className= "whole">
                    {requestsLoading ? (
                        <AiOutlineLoading3Quarters className='frame2' size={"50px"} color='rgb(11, 74, 211)'/>
                    ) : requestsError ? (
                        <p>Error occurred while fetching requests.</p>
                    ) : (
                        
                        allRequest?.requests.map((request: Request) => (
                            <section className="request-card"  onClick={() =>handleClick(request._id)} key={request._id}>
                                <div className="table-row">
                                    <p className='cell ' style={{fontSize :Desktop?"25px" :smallPhone? "13px": "25px" , backgroundColor:
                                     request.typeOfRequest === "Road Crack" ? "rgba(52, 250, 13, 0.24)": request.typeOfRequest === "Electricity" ? "rgba(233, 229, 13, 0.29)" :
                                     request.typeOfRequest === "Water Supply" ? "rgba(24, 21, 219, 0.27)" : request.typeOfRequest === "Garbage Collection" ? "rgba(231, 26, 26, 0.27)" : "rgba(14, 10, 10, 0.29)", padding: "5px", borderRadius: "5px",
                                     color: request.typeOfRequest === "Road Crack" ? "rgb(33, 168, 6)": request.typeOfRequest === "Electricity" ? "rgb(173, 171, 7)" :
                                     request.typeOfRequest === "Water Supply" ? "rgb(24, 21, 219)" : request.typeOfRequest === "Garbage Collection" ? "rgb(141, 5, 5)" : "rgb(65, 65, 65)" }}>{request.typeOfRequest}</p>
                                    {Tablets ?<p className='cell' style={{fontSize : "25px"}}>{request.region}</p> :smallPhone? null :<p className='cell' style={{fontSize : "25px"}}>{request.region}</p>}
                                    {Tablets?(request.description.slice(0, 20) < request.description ?
                                    (<p className='cell' style={{fontSize : "15px", color: "rgb(34, 34, 34)"}}>...{request.description.slice(0, 20)}</p>):
                                    (<p className='cell' style={{fontSize : smallPhone ? "10px": "15px", color: "rgb(32, 32, 32)"}}>{request.description.slice(0, 20)}</p>)) :smallPhone? null:(request.description.slice(0, 20) < request.description ?
                                    (<p className='cell' style={{fontSize : "15px", color: "rgb(34, 34, 34)"}}>...{request.description.slice(0, 20)}</p>):
                                    (<p className='cell' style={{fontSize : smallPhone ? "10px": "15px", color: "rgb(32, 32, 32)"}}>{request.description.slice(0, 20)}</p>))
                                    }
                                    {request.title.slice(0, 8)< request.title ? 
                                    (<p className='cell cell-head' style={{ fontSize:Desktop?"25px" : smallPhone ? "20px": "25px",padding: "15px", fontWeight: "bolder"  }} >
                                            ...{request.title.slice(0, 8)}
                                    </p>) : (<p className='cell cell-head' style={{ padding: "15px", fontWeight: "bolder"  }} >
                                            {request.title.slice(0, 8)}
                                    </p>)}
                                    <img className='cell' src={request.imageRef} alt={request.title} />
                                </div>
                            </section>
                        ))
                    )}
                    {countsWholeLoading ? (
                        null
                    ) : countsWholeError ? (
                        null
                    ) : (
                    <div className="pagination1">
                        <button style = {{display: "inline", paddingInline : "40px"}} onClick={() => {
                                    const curr = currentPage -1 
                                    setPressed([true, false])
                                    setTimeout(() => {
                                        setPressed([false, false])
                                    }, 500)
                                    if(curr<= 0)
                                        return
                                    setCurrentPage(curr)
                                    setCurrentStatePage(getVisiblePages(curr, totalPages))
                                    
                        }} className= {pressed[0]?'pressed': ""}>Back</button>
                        {currentStatePage.map((page) => (
                            <button
                                key={page}
                                onClick={() => {
                                    setCurrentPage(page)
                                    setCurrentStatePage(getVisiblePages(page, totalPages))
                                }}
                                className={currentPage === page ? 'active' : 'unactivated'}
                                style = {{display: "inline", paddingInline : "20px"}}
                            >   
                                {page}
                            </button>
                        ))}
                        <button style = {{display: "inline", paddingInline : "40px"}} onClick={() => {
                                    const curr = currentPage + 1 
                                    setPressed([false, true])
                                    setTimeout(() => {
                                        setPressed([false, false])
                                    }, 500)
                                    if(curr> totalPages)
                                        return
                                    setCurrentPage(curr)
                                    setCurrentStatePage(getVisiblePages(curr, totalPages))
                                    
                        }} className= {pressed[1]?'pressed': ""}>next</button>
                    </div>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main
