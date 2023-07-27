
import React, { useEffect, useRef, useState } from 'react';
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



export default function GeneratePasswordModal({open, setOpen,setCopyOpen}) {

    const toggleShow = () => setOpen(!open);
    const [password,setPassword]=useState('')
    const [appName,setAppName]=useState('')
    const [refresh,setRefresh] = useState('')
    const [option,setOption]=useState({
        upperCase:true,
        numbers:true,
        symbols:false
    })

    const [length,setLength]=useState(8)

    useEffect(()=>{
        try{
            let newPassword = generatePassword(option,length)
            setPassword(newPassword)

        }
        catch(err){
            console.log(err);
        }
    },[option,open,length,refresh])

    const handleLengthChange=((e)=>{
        setLength(e.target.value)
    })


    return (
    <>

<MDBModal tabIndex='-1' show={open} setShow={setOpen}>
                <MDBModalDialog centered >
                    <MDBModalContent style={{background:'#181639'}}>
                        <MDBModalHeader style={{ borderBottom: 'none' }}>
                            <MDBModalTitle style={{color:'rgb(189, 185, 255)'}}>Generate Password</MDBModalTitle>
                            <MDBBtn className='btn-close' color='rgb(189, 185, 255)' style={{color:'rgb(189, 185, 255)'}} onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>

                        <MDBModalBody>
                            <MDBRow className='ps-2 pe-2 mt-3'>
                                <MDBInput label='Generated password'  labelStyle={{ color:'rgb(189, 185, 255)'}} style={{background:'none' , color:'rgb(189, 185, 255)'}} readOnly value={password} onChange={(e) => setPassword(e.target.value)} id='form1' type='text' size='lg' />
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
                                    <label htmlFor='capCheck'style={{color:'rgb(189, 185, 255)'}}>Incluse Uppercase letters</label>
                                    <MDBSwitch checked={option.upperCase} color='danger' onChange={(e) => setOption({ ...option, upperCase: e.target.checked })} />
                                </div>
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <div className='d-flex justify-content-between flex-row'>
                                    <label htmlFor='sympolCheck' style={{color:'rgb(189, 185, 255)'}}>Include Symbols</label>
                                    <MDBSwitch checked={option.symbols} color='danger' onChange={(e) => setOption({ ...option, symbols: e.target.checked })} />
                                </div>
                            </MDBRow>
                            <MDBRow className='mt-3 ps-2 pe-2'>
                                <MDBBtn  className='w-100' onClick={() => setRefresh(!refresh)} style={{color:'rgb(189, 185, 255)',background:'none',boxShadow:'none' , border:'2px solid rgb(189, 185, 255)'}} >
                                    Generate new
                                </MDBBtn>
                            </MDBRow>


                        </MDBModalBody>
                        <MDBModalFooter style={{ borderTop: 'none' }}>
                            <MDBBtn color='danger' outline onClick={toggleShow} rounded>
                                Close
                            </MDBBtn>
                            <MDBBtn  style={{boxShadow:'none', background:'rgb(189, 185, 255)' , color:'#181639'}} onClick={() => { copyToClipboard(password); setCopyOpen(true) }} rounded>Copy to Clipboard</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
      
    </>
  )
}
