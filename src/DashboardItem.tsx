import  { useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import Header from './elements/shared/Header'
import { useGetRequestByIdMutation, useGetByUserMutation } from './elements/redux/APIs'
import './DashboardItem.css'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdPlace } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { SlCalender } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
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
        createdAt: Date
}

    type RequestsResponse = {
        request?: Request[]
    }

const DashboardItem = () => {
  const {id} = useParams<{id: string}>()
  const [getRequestById,{data  , isLoading, isError}] = useGetRequestByIdMutation()
  const createdAtData = data?.request.createdAt ? new Date(data?.request.createdAt) : undefined
  const [getRequests,{data: requestsData , isLoading:requestsIsLoading, isError: requestsIsError}] = useGetByUserMutation()
  const navigate = useNavigate()
  const smallPhone = useMediaQuery({ query : "(min-width: 320px)"})
  // const smallTablet = useMediaQuery({ query : "(min-width: 480px)"})
  // const Tablets = useMediaQuery({ query : "(min-width: 768px)"})
  // const SmallLaptop = useMediaQuery({ query : "(min-width: 1024px)"})
  const Desktop = useMediaQuery({ query : "(min-width: 1280px)"})

  const handleClickofCard = (_id: string) => {
    navigate(`/Dashboard-item/${_id}`)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
        return
    }
    const fetchData = async () => {
        const fetchId = await getRequestById({id, token}).unwrap()
        await getRequests({token,id:fetchId.user._id, page : 1, limit: 20}).unwrap()
      }
      fetchData()
  }, [getRequestById,getRequests, id])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token || !data){
        return
    }
    const fetchData = async () => {
        await getRequests({token,id: data.user._id,page : 1, limit: 20}).unwrap()
      }
      fetchData()
  }, [getRequests])

  const requests = Array.isArray(requestsData)
        ? requestsData
        : ((requestsData as RequestsResponse | undefined)?.request ?? [])

    const filteredRequests : Request[]= requests.filter((request: Request) => request._id !== id 
    )

  return (
    <div>
      <Header/>
      {isLoading && <AiOutlineLoading3Quarters className='frame3' size={"50px"} color='rgb(11, 74, 211)'/>}
      {isError && <p>Error occurred while fetching request details.</p>}
      {data && (
        <div >
         { data?.request && (
          <div className='The-Order-Items'>
            <div className='wrapper'>
              <div className='order-of-cards'>
                <h1 style={{marginBottom: "10px"}}>طلبات</h1> 
              {
                requestsIsLoading ? <AiOutlineLoading3Quarters className='frame3' size={"50px"} color='rgb(11, 74, 211)'/>
                : requestsIsError ? <p>error fetching content</p> :
                (
                   <div className='framing'>
                   
                  
                      {filteredRequests?.map(({_id,title, imageRef, createdAt, description, typeOfRequest,}) => (
                        <section onClick={() => handleClickofCard(_id)} className='items-of-user' key={title + createdAt}>
                          <img src={imageRef} alt={title} />
                          <p id="title-of-card">{title}</p>
                          <p id="typeOfRequest-of-card" style={{"--bg":  typeOfRequest === "Road Crack" ? "rgba(52, 250, 13, 0.24)": typeOfRequest === "Electricity" ? "rgba(233, 229, 13, 0.34)" :
                          typeOfRequest === "Water Supply" ? "rgba(15, 12, 180, 0.29)" : typeOfRequest === "Garbage Collection" ? "rgba(231, 26, 26, 0.27)" : "rgba(14, 10, 10, 0.29)", "--color1" : 
                          typeOfRequest === "Road Crack" ? "rgb(33, 168, 6)": typeOfRequest === "Electricity" ? "rgb(163, 161, 8)" :
                          typeOfRequest === "Water Supply" ? "rgb(14, 12, 180)" : typeOfRequest === "Garbage Collection" ? "rgb(141, 5, 5)" : "rgb(65, 65, 65)"}as React.CSSProperties}>{typeOfRequest}</p>
                          <div id="createdAt-of-card-container">
                            <SlCalender id="createdAt-of-card-icon" size={"15px"}/>
                            <p id="createdAt-of-card">{new Date(createdAt)?.toLocaleDateString()}</p>
                          </div>
                          <p id="description-of-card">{description.slice(0,30)<description ? ( "..."+description.slice(0,30) ) : description }</p>

                        </section>
                      ))}
                      
                    </div>
                  
                )
              }
              </div>
              </div>
            
            <section className='full-frame' style={{position: "relative"}}>
              <section className="request-details">
                <section className="request-info">
                  <h2 style={{ textAlign: 'right', position: "relative", left: "58%", marginTop:"2px" }}>{data.request.title}</h2>
                  <div id="container-of-calender">
                    <SlCalender id="icon-calender" size={"20px"}/>
                    <p id="calender-text">
                      {createdAtData?.toLocaleDateString()}
                    </p>
                  </div>
                  <img src={data.request.imageRef} alt={data.request.title} />
                </section>
              </section>
              <section id = "here" className="request-details data" style={{position: "relative"}} >
                  <p className="data-p p-"><span  id="type-display1" style={{backgroundColor:
                  data.request.typeOfRequest === "Road Crack" ? "rgba(52, 250, 13, 0.24)": data.request.typeOfRequest === "Electricity" ? "rgba(233, 229, 13, 0.34)" :
                  data.request.typeOfRequest === "Water Supply" ? "rgba(15, 12, 180, 0.42)" : data.request.typeOfRequest === "Garbage Collection" ? "rgba(231, 26, 26, 0.27)" : "rgba(14, 10, 10, 0.29)", padding:"5px", borderRadius: "5px",
                  color: data.request.typeOfRequest === "Road Crack" ? "rgb(33, 168, 6)": data.request.typeOfRequest === "Electricity" ? "rgb(184, 181, 12)" :
                  data.request.typeOfRequest === "Water Supply" ? "rgb(14, 12, 180)" : data.request.typeOfRequest === "Garbage Collection" ? "rgb(141, 5, 5)" : "rgb(65, 65, 65)"}}>{data.request.typeOfRequest}</span>
                  <VscTypeHierarchySub id="hierarchy" size={Desktop? "30px":smallPhone?"25px":"30px"} />
                  <strong style={{fontSize:Desktop? "35px":smallPhone? "22px":"35px"}}> :نوع المشكلة</strong> </p>
                  <div className='data-p' style={{marginTop:"15px", position:"static", left: "0", right:"0"}}>
                    <MdPlace size={Desktop? "30px":smallPhone?"25px":"30px"} className='icon-dataitem-side'/>
                    <span style= {{paddingTop:"0px",display:"inline-block",marginTop: "0px",fontFamily: 'Arabic Typesetting',color:"rgba(0,0,0,0.7)", fontSize:Desktop? "35px":smallPhone? "22px":"35px", fontWeight:"bold"}}>المنطقة</span>
                    <p style={{paddingTop:"0px",position: "static",display:"inline-block",marginTop: "0px",fontFamily: 'Arabic Typesetting',color:"rgba(0,0,0,0.7)", fontSize:Desktop? "30px":smallPhone? "17px":"30px", fontWeight:"lighter"}}>{data.request.region} </p>
                  </div>
                  <div className="data-p" style={{marginTop : "15px"}}>
                    <MdDescription  size={Desktop? "27px":smallPhone?"25px":"27px"} id="description-icon"/>
                    <a id="description-label"> الوصف</a>
                    <p style={{color:"rgba(0,0,0,0.7)",padding: "0", width: "100%", fontSize:Desktop? "30px":smallPhone? "17px":"30px"}}>{data.request.description} </p>
                  </div>
              </section>
              </section>
              <section className='details-of-user'>
                <h2 id="data-of-title">البيانات</h2>
                <div className='frame-of-details' >
                  <div className='order-of-details'  style={{backgroundColor:"#ffffff", width:"75%", padding:"20px", borderRadius:"20px", boxShadow:"0 0 5px rgb(97, 97, 97)"}}>
                    <div className='icons-of-details'>
                      <VscTypeHierarchySub size={Desktop?"35px" :smallPhone?"25px" :"35px"}/>
                      <MdPlace  size={Desktop?"35px" :smallPhone?"25px" :"35px"}/>
                      <SlCalender  size={Desktop?"30px" :smallPhone?"22px" :"30px"} />
                      <FaRegUser size={Desktop?"30px" :smallPhone?"22px" :"30px"} />
                    </div>
                    <div className='title-of-details'>
                      <span>النوع</span>
                      <span>المنطقة</span>
                      <span>تاريخ التبليغ</span>
                      <span>المستخدم</span>
                    </div>
                    <div className='details-of-details'>
                      <span >{ data && data?.request?.typeOfRequest}</span>
                      <span >{ data && data?.request?.region}</span>
                      <span >{ createdAtData && createdAtData?.toLocaleDateString()}</span>
                      <span >{ data && data?.user?.username}</span>
                    </div>
                  </div>
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
