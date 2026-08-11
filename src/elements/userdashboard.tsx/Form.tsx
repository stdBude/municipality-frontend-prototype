import React, { useEffect } from 'react'
import './Form1.css'
import { useCreateRequestMutation } from '../redux/APIs'
import { useParams, useNavigate } from 'react-router-dom'

const Form = () => {
    const {id} = useParams()
    const [title, setTitle] = React.useState('')
    const [region, setRegion] = React.useState('')
    const [type, setType] = React.useState('Type')
    const [description, setDescription] = React.useState('')
    const [file, setFile] = React.useState<File | null>(null)
    const navigate = useNavigate()
    const [create, { error, isLoading }] = useCreateRequestMutation()
    const [selectedType, setSelectedType] = React.useState<boolean>(false)
    const comboRef = React.useRef<HTMLDivElement>(null)
    const [typeSlug, setTypeSlug] = React.useState<string>('')

    useEffect(() =>{
      const handleClick = (e: MouseEvent) =>{
        if (comboRef.current && !comboRef.current.contains(e.target as Node)){
          setSelectedType(false)
        }
      }
      document.addEventListener("click", handleClick)
      return ()=>{document.removeEventListener("click", handleClick)}
    },[])
    
    
    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
          const formData = new FormData()
          formData.append('user', id? id : '')
          formData.append('title', title)
          formData.append('region', region)
          formData.append('typeOfRequest', typeSlug)
          formData.append('description', description)
          
          if (file) {
            const rename = new File([file], `image/png`, { type: file.type })
            formData.append('image', rename)
          }
        
          await create({ body: formData, token: localStorage.getItem('token') }).unwrap()

          navigate(`/user-data/${id}`)
        } catch {
          return
        }
        
    }

  return (
    <>
      {isLoading ? (
        <p style={{fontSize: "30px", margin: "0px auto", fontFamily: "Arail", marginBottom: "2px", textAlign: "center", position: "relative",
          top: "350px"
        }}>Loading...</p>
      ) : (
      <div>
      <form className="login-form" onSubmit= {onsubmit}>
        <h1 className="form-title">Creat Request</h1>
        <label className="form-label" htmlFor="Title">Title</label>
        <input className="form-input" style={{border: !title ? "1px solid #d41b1b" :""}} type="text" id="Title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label className="form-label" htmlFor="Region">Region</label>
        <input className="form-input" style={{border: !region ? "1px solid #d41b1b" :""}} type="text" id="Region" placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)} />
        <label className="form-label" htmlFor="Type">Type</label>
        
        <div className="form-type-field" ref={comboRef}>
          <p className="form-type-toggle" style={{border: type === "Type" ? "1px solid #d41b1b" :""}} onClick={() => setSelectedType((prev) => !prev)}>{type || 'Select Type'}</p>
          <section className="form-sec" id="Type" style={{display: selectedType ? 'block' : 'none'}}>
            <p style={{borderRadius: "5px 5px 0px 0px"}} onClick= {() => {setType('Road Crack'); setTypeSlug('Road Crack'); setSelectedType(false)}}> Road Crack</p>
            <p onClick= {() => {setType('Electricity'); setTypeSlug('Electricity'); setSelectedType(false)}}> Electricity</p>
            <p onClick= {() => {setType('Water Supply'); setTypeSlug('Water Supply'); setSelectedType(false)}}> Water Supply</p>
            <p onClick= {() => {setType('Garbage Collection'); setTypeSlug('Garbage Collection'); setSelectedType(false)}}> Garbage Collection</p>
            <p style={{borderRadius: "0px 0px 5px 5px"}} onClick= {() => {setType('Other'); setTypeSlug('other'); setSelectedType(false)}}> Other</p>
          </section>
        </div>
        
        <label className="form-label" htmlFor="Description">Description</label>
        <textarea rows={5} wrap = "soft" style={{border: !description ? "1px solid #d41b1b" :""}} className="form-input" id="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label className="form-label" htmlFor="File">File</label>
        <input className="form-input form-file-input" style={{border: !file ? "1px solid #d41b1b" :""}} type="file" id="File" placeholder="File" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button className="form-button" type="submit">Create Request</button>
        {error ? (
          <p style={{fontSize: "20px", color: "red", fontFamily: "Arail", marginBottom: "2px"}}>Error creating the request, please fill out all the fields</p>
        ) : null}
      </form>
    </div>
      )}
    </>
  )
}


export default Form