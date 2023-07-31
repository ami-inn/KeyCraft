
import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRow,
    MDBInput,
    MDBRange,
    MDBSwitch,
} from 'mdb-react-ui-kit';
import generatePassword from '../helper/generatePassword';
import copyToClipboard from '../helper/copyToClipboard';
import axios from 'axios';
import Swal from 'sweetalert2'




export default function AddPasswordModal({open, setOpen, setRefresh, setCopyOpen}) {

    const toggleShow=()=>setOpen(!open)
    const [password,setPassword]=useState('')
    const [appName,setAppName]=useState('')
    const [userName,setUserName]=useState('')
    const [pageRelod,setPageRelod]=useState(true)
    const [err,setErr]=useState('')
    const [option,setOption]=useState({
        upperCase: true,
        numbers: true,
        symbols: false
    })
    const [length,setLength]=useState(32)
    useEffect(()=>{
        try{
            let newPassword = generatePassword(option,length)
            setPassword(newPassword)

        }
        catch(err){
            setErr(data.message)
        }
    },[option,open,length,pageRelod])

    const handleLengthChange = ((e)=>{setLength(e.target.value)})


    const addPassword = async () =>{

        const {data} = await axios.post('/password/add',{ appName, userName, password })
        console.log(data);

        if(!data.err){
            Swal.fire(
                {
                    title: 'Success',
                    text: "Password added successfully.",
                    icon: 'success',
                    confirmButtonColor: '#DC4C64'
                }
            )
            setRefresh(refresh => !refresh)
            setOpen(false)
        }else{
            setErr(data.message)
        }
    }

  return (
    <>

<MDBModal tabIndex='-1' show={open} setShow={setOpen}>
                <MDBModalDialog centered>
                    <MDBModalContent style={{background:'#181639'}}>
                        <MDBModalHeader  style={{ borderBottom: 'none' }}>
                            <MDBModalTitle style={{color:'rgb(189, 185, 255)'}}>Add Password</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' style={{color:'rgb(189, 185, 255)'}} onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            
                            <MDBRow className='ps-2 pe-2 mt-3 d-flex'>
                                <MDBInput label='Generated password'  labelStyle={{ color:'rgb(189, 185, 255)'}} value={password} style={{background:'none' , color:'rgb(189, 185, 255)'}}  onChange={(e) => setPassword(e.target.value)} id='form1' type='text' size='lg' />
                                    <MDBBtn  onClick={() => { copyToClipboard(password); setCopyOpen(true) }} className='w-100' style={{color:'#181639', background:'rgb(189, 185, 255)' ,boxShadow:'none'}}>Copy Password</MDBBtn>
                            </MDBRow>
                            <MDBRow className='mt-3 ps-2 pe-2'>
                            </MDBRow>
                            <MDBRow className='ps-2 pe-2 mt-3'>
                                <MDBInput label='App name'  labelStyle={{ color:'rgb(189, 185, 255)'}} style={{background:'none' , color:'rgb(189, 185, 255)'}} value={appName} onChange={(e) => setAppName(e.target.value)} id='form1' type='text' size='lg' />
                            </MDBRow>
                            <MDBRow className='ps-2 pe-2 mt-3'>
                                <MDBInput label='User Name'  labelStyle={{ color:'rgb(189, 185, 255)'}} style={{background:'none' , color:'rgb(189, 185, 255)'}} value={userName} onChange={(e) => setUserName(e.target.value)} id='form1' type='text' size='lg' />
                            </MDBRow>
                            <MDBRow className='mt-4'>
                                <div className='d-flex justify-content-between flex-row align-items-center'>
                                    <span style={{color:'rgb(189, 185, 255)'}}>Length</span>
                                    <div className="badge badge-primary p-3 rounded-5">{length}</div>
                                </div>
                                <MDBRange
                                    defaultValue={length}
                                    min='5'
                                    max='64'
                                    step='1'
                                    onChange={handleLengthChange}
                                    value={length}
                                    id='customRange3'
                                    className='mt-2'
                                    label=''
                                />
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <div className='d-flex justify-content-between flex-row'>
                                    <label htmlFor='numberCheck' style={{color:'rgb(189, 185, 255)'}}>Include Numbers</label>
                                    <MDBSwitch checked={option.numbers} color='danger' onChange={(e) => setOption({ ...option, numbers: e.target.checked })} />
                                </div>
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <div className='d-flex justify-content-between flex-row'>
                                    <label htmlFor='capCheck' style={{color:'rgb(189, 185, 255)'}}>Incluse Uppercase letters</label>
                                    <MDBSwitch checked={option.upperCase} color='danger' onChange={(e) => setOption({ ...option, upperCase: e.target.checked })} />
                                </div>
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <div className='d-flex justify-content-between flex-row'>
                                    <label htmlFor='sympolCheck' style={{color:'rgb(189, 185, 255)'}}>Include Symbols</label>
                                    <MDBSwitch checked={option.symbols} color='danger' onChange={(e) => setOption({ ...option, symbols: e.target.checked })} />
                                </div>
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <div className='d-flex' style={{gap:"10px"}}>

                                    <MDBBtn className='w-100' style={{background:'none' ,color:'rgb(189, 185, 255)' , border:'solid 2px rgb(189, 185, 255)' ,boxShadow:'none'}} onClick={() => setPageRelod(!pageRelod)}>
                                    Generate new
                                    </MDBBtn>
                                </div>
                            </MDBRow>
                            
                            <MDBRow className='mt-3'>
                                {
                                    err &&
                                    <div className="text-left">
                                        <p className='text-danger'>{err}</p>
                                    </div>
                                }
                            </MDBRow>

                        </MDBModalBody>
                        <MDBModalFooter style={{borderTop:'none'}}>
                            <MDBBtn color='danger' outline onClick={toggleShow} rounded>
                                Close
                            </MDBBtn>
                            <MDBBtn  onClick={addPassword} style={{background:'rgb(189, 185, 255)' , color:'#181639'}} rounded disabled={appName == "" || userName == "" || password == ""}>Save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
      
    </>
  )
}
