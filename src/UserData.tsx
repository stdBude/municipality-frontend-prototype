import { useEffect, useState } from 'react'
import './alittleMain.css'
import { useGetByUserMutation, useGetCountsMutation } from './elements/redux/APIs'
import { useNavigate , useParams} from 'react-router-dom'
import Header from './elements/shared/Header'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { BsLightningChargeFill } from "react-icons/bs";
import { FaRoad } from "react-icons/fa6";
import { IoTrashBinSharp } from "react-icons/io5";
import { IoWater } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoChatboxEllipses } from "react-icons/io5";
import { useMediaQuery } from 'react-responsive'
import { CgSmartphone } from 'react-icons/cg'

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
    const [getCounts, { data: countsData, isLoading: countsLoading, isError: countsError }] = useGetCountsMutation()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const navigate = useNavigate()
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentStatePage, setCurrentStatePage] = useState<number[]>([])
    const [pressed, setPressed] = useState<boolean[]>([false,false])
    const smallPhone = useMediaQuery({ query : "(min-width: 320px)"})
      const smallTablet = useMediaQuery({ query : "(min-width: 480px)"})
    const Tablets = useMediaQuery({ query : "(min-width: 768px)"})
    const SmallLaptop = useMediaQuery({ query : "(min-width: 1024px)"})
    const Desktop = useMediaQuery({ query : "(min-width: 1280px)"})
    
    
   useEffect(() =>{
     const token = localStorage.getItem('token')
     
     if(!token || !id){
         return
     }
     const fetchData = async () => {
         await getRequests({token: token, id: id , page :currentPage}).unwrap()
        
     }
    
     fetchData()
    
    
     
     }, [getRequests, currentPage])

     useEffect(() =>{
     const token = localStorage.getItem('token')
     if(!token){
         return
     }
     const fetchData = async () => {
         
         const counts = await getCounts(token).unwrap()  // ✅ use the resolved data

            const pages = Math.ceil(counts.theWhole / 5)
            setTotalPages(pages)

            const pageArray = Array.from({ length: pages }, (_, i) => i + 1)
            setCurrentStatePage(pageArray)
     }
    
     fetchData()
    
    
     
     }, [getCounts])
 
     const handleClick = (_id: string) => {
         navigate(`/Dashboard-item/${_id}`)
     }
 
   return (
    <div>
        <Header/>
         <div className="sidebar-header-user">
                <div className="table">
                                <div className='statistics1'  >
                                    
                                    <div className='statisics-by-type1' >
                                       <p style ={{fontWeight:"bold", display: "inline-block", marginBottom : "7px" }}> تعداد بالنوع </p>
                                       <IoChatboxEllipses style={{display: "inline-block", position:"absolute", left:Desktop?"77vw" :Tablets?"83vw": smallPhone? "77vw": "77vw", top: "2vh"}} size = {Tablets?"35px" : smallPhone? "25px" :"35px"} />
                                       { countsLoading? <p>loading</p>: countsError ? <p>error</p>: countsData?(<div className='type-whole1' >
                                        
                                        <div className='type-ind1'>
                                            <BsLightningChargeFill className='icons1' size = "35px" color='rgb(233, 229, 13)'/>
                                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Electricity</p>
                                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px", marginBottom: "2px",marginTop: "2px" }}>{countsData.electricity}</p>
                                            <div className="progress-container">
                                                <div className="progress-bar" style={{"--progress": `${countsData.electricity/countsData.theWhole*100}%`, "--color": "rgb(233, 229, 13)"} as React.CSSProperties}></div>
                                            </div>
                                        </div>
                                        <div className='type-ind1'>
                                            <FaRoad className='icons1' size = "35px" color='rgb(33, 168, 6)'/>
                                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Road Crack</p>
                                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px" ,  marginBottom: "2px",marginTop: "2px"}}>{countsData.roadCrack}</p>
                                            <div className="progress-container1">
                                                <div className="progress-bar1" style={{"--progress": `${countsData.roadCrack/countsData.theWhole*100}%`, "--color": "rgb(33, 168, 6)"} as React.CSSProperties}></div>
                                            </div>
                                        </div>
                                        <div className='type-ind1'>
                                            <IoWater className='icons1' size = "35px" color="rgb(25, 21, 219)"/>
                                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Water Supply</p>
                                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px",  marginBottom: "2px",marginTop: "2px" }}>{countsData.waterSupply}</p>
                                            <div className="progress-container1">
                                                <div className="progress-bar1" style={{"--progress": `${countsData.waterSupply/countsData.theWhole*100}%`, "--color": "rgb(25, 21, 219)"} as React.CSSProperties}></div>
                                            </div>
                                        </div>
                                        <div className='type-ind1'>
                                            <IoTrashBinSharp className='icons1' size = "35px" color="rgb(206, 5, 5)"/>
                                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Garbage Collection</p>
                                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px",  marginBottom: "2px",marginTop: "2px" }}>{countsData.garbageCollection}</p>
                                            <div className="progress-container1">
                                                <div className="progress-bar1" style={{"--progress": `${countsData.garbageCollection/countsData.theWhole*100}%`, "--color": "rgb(206, 5, 5)"} as React.CSSProperties}></div>
                                            </div>
                                        </div>
                                        <div className='type-ind1'>
                                            <HiDotsHorizontal className='icons1' size = "35px" color="#1b1b1b"/>
                                            <p style = {{fontWeight:"bold" , color: "rgb(179 178 178)", display: 'inline', position:"relative", top:"10px"}}>Other</p>
                                            <p style = {{fontWeight:"bold", fontSize: "40px", position:"relative", top:"10px",marginBottom: "2px",marginTop: "2px" }}>{countsData.other}</p>
                                            <div className="progress-container1">
                                                <div className="progress-bar1" style={{"--progress": `${countsData.other/countsData.theWhole*100}%`, "--color": "#1b1b1b"} as React.CSSProperties}></div>
                                            </div>
                                        </div>
                                       </div>) : null}
                                    </div>
                                </div>
             <div className="table-order-user">
                 <section className="table-header-user " >
                     <p className='cell-user'>النوع</p>
                     {Desktop || Tablets?
                     (<div className= "cont"><p className='cell-user'>المنطقة</p>
                        <p className='cell-user'>الوصف</p>
                     </div>)
                     :smallPhone? null : 
                     (<div className= "cont"><p className='cell-user'>المنطقة</p>
                        <p className='cell-user'>الوصف</p>
                     </div>)
                     }
                     <p className='cell-user'>العنوان</p>
                     <p className='cell-user'>الصورة</p>
                 </section>
                 
                     {isLoading ? (
                          <AiOutlineLoading3Quarters className='frame2' size={"50px"} color='rgb(11, 74, 211)'/>
                     ) : isError ? (
                         <p>Error occurred while fetching requests.</p>
                     ) : (
                         data?.request?.map((request:  Request) => (
                             <section className="request-card-user" onClick={() =>handleClick(request._id)} key={request._id}>
                                 <div className="table-row-user">
                                     <p className='cell-user ' style={{fontSize : Desktop?"25px": Tablets? "15px": smallPhone? "12px":"25px", backgroundColor:
                                     request.typeOfRequest === "Road Crack" ? "rgba(52, 250, 13, 0.24)": request.typeOfRequest === "Electricity" ? "rgba(233, 229, 13, 0.29)" :
                                     request.typeOfRequest === "Water Supply" ? "rgba(24, 21, 219, 0.27)" : request.typeOfRequest === "Garbage Collection" ? "rgba(231, 26, 26, 0.27)" : "rgba(14, 10, 10, 0.29)", padding: "5px", borderRadius: "5px",
                                     color: request.typeOfRequest === "Road Crack" ? "rgb(33, 168, 6)": request.typeOfRequest === "Electricity" ? "rgb(187, 184, 12)" :
                                     request.typeOfRequest === "Water Supply" ? "rgba(24, 21, 219, 1)" : request.typeOfRequest === "Garbage Collection" ? "rgb(141, 5, 5)" : "rgb(65, 65, 65)"}}>{request.typeOfRequest}</p>
                                     {
                                        Desktop || Tablets?
                                    <div className='cont'>
                                        <p className='cell-user' style={{fontSize :Desktop?"30px": Tablets? "25px": "25px"}}>{request.region}</p>
                                        {request.description.slice(0, 20) < request.description ?
                                        (<p className='cell' style={{fontSize : Desktop?"20px": Tablets? "15px": "20px", color: "rgb(34, 34, 34)"}}>...{request.description.slice(0, 20)}</p>):
                                        (<p className='cell' style={{fontSize : Desktop?"20px": Tablets? "15px": "20px", color: "rgb(32, 32, 32)"}}>{request.description.slice(0, 20)}</p>)}
                                    </div>: smallPhone? null:
                                    <div className='cont'>
                                        <p className='cell-user' style={{fontSize : Desktop?"30px": Tablets? "25px": "25px"}}>{request.region}</p>
                                        {request.description.slice(0, 20) < request.description ?
                                        (<p className='cell' style={{fontSize : Desktop?"20px": Tablets? "15px": "20px", color: "rgb(34, 34, 34)"}}>...{request.description.slice(0, 20)}</p>):
                                        (<p className='cell' style={{fontSize : Desktop?"20px": Tablets? "15px": "20px", color: "rgb(32, 32, 32)"}}>{request.description.slice(0, 20)}</p>)}
                                    </div>
                                    }
                                    {request.title.slice(0, 8)< request.title ? 
                                    (<p className='cell-user cell-head-user' style={{ fontSize : Desktop?"30px": Tablets? "25px": "20px",padding: "15px", fontWeight: "bolder"  }} >
                                            ...{request.title.slice(0, 8)}
                                    </p>) : (<p className='cell-user cell-head-user' style={{ padding: "15px", fontWeight: "bolder"  }} >
                                            {request.title.slice(0, 8)}
                                    </p>)}
                                     <img className='cell-user' src={request.imageRef} alt={request.title} />
                                     
                                 </div>
                             </section>
                         ))
                     )}
                      {isLoading ? (
                          null
                     ) : isError ? (
                         null
                     ) : (
                     <div className="pagination2">
                        <button style = {{display: "inline", paddingInline : "40px"}} onClick={() => {
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
                                }}
                                className={currentPage === i + 1 ? 'active1' : 'unactivated1'}
                                style = {{display: "inline", paddingInline : "25px"}}
                            >   
                                {i + 1}
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
                                    
                        }} className= {pressed[1]?'pressed1': ""}>next</button>
                    </div>)}
             </div>
         </div>
     </div>
</div>
   )
 }

export default UserData
