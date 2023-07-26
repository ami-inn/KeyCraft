import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import {
    MDBBadge,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow
} from 'mdb-react-ui-kit';

import AddPasswordModal from '../../modal/AddPasswordModal'
import GeneratePasswordModal from '../../modal/GeneratePasswordModal';
import axios from 'axios';
import copyToClipboard from '../../helper/copyToClipboard';
import Swal from 'sweetalert2';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function Home({user,setRefresh,refresh}) {
    const [showAddModal,setShowModal]=useState(false)
    const [list,setList]=useState([])
    const [open,setOpen]=useState(false)
    const [showGenerateModal,setShowGenerateModal]=useState(false)

    // useEffect(()=>{
    //     getData()
    // },[refresh])

    // async function getData(){

    // }

  return (
    <>
    
    <Header setRefresh={setRefresh}/>

    <MDBContainer className=''>
                <MDBRow className=''>
                
                    <MDBContainer fluid>
                        <MDBRow>
                            <MDBCol md={6}>
                                <MDBBtn className='w-100 mt-2' outline style={{ height: "50px" ,color:'#BDB9FF',border:'2px solid #BDB9FF' }} onClick={() => setShowGenerateModal(true)} >
                                    Generate Password
                                </MDBBtn>
                            </MDBCol>
                            <MDBCol md={6}>
                                <MDBBtn className='w-100 mt-2'  style={{ height: "50px" , color:'#261E8E' , background:'#BDB9FF'}} onClick={() => setShowAddModal(true)} >
                                    Add password
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBRow>
                <MDBRow className='mt-5'>
                    <h5 style={{color:'#BDB9FF'}} >Saved Passwords</h5>
                </MDBRow>
                {/* <MDBRow className='mt-3'>
                    {
                        list[0] &&
                        list.map((item, index) => {
                            return (
                                <MDBCol xl={6} key={index} className='mb-4'>
                                    <MDBCard>
                                        <MDBCardBody>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='d-flex align-items-center'>
                                                    <img src="https://lh4.googleusercontent.com/zxHGfDuP9OcnUCHnOaV77PUez3jUnliiGJr4GmdExFZxMe5X3nqG9R8qTcBFcknkQ_lxT-rtQS42jXWqWr9E-xMNv50ri-pFg-HdQi_MQ-j75jkYuf5KILd8RdG8SC4zp8FMqJME9_atihTsBujbVdQAj_jwd6I0Tc3XP0stjsW_AHxAuX-OED49xizrBA" style={{ height: 65 }} className="rounded-circle" />
                                                    <div className='ms-3'>
                                                        <p className='fw-bold mb-1'>{item.appName}</p>
                                                        <p className='text-muted mb-0'>{item.userName}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </MDBCardBody>
                                        <MDBCardFooter background='light' border='0' className='p-2 d-flex justify-content-around'>
                                            <MDBBtn color='link' rippleColor='primary' className='text-reset w-100' onClick={() => deletePassword(item._id)} >
                                                delete
                                                <MDBIcon fas icon='trash' className='ms-3' />
                                            </MDBBtn>
                                            <MDBBtn color='link' rippleColor='primary' onClick={() => {copyToClipboard(item.password); setOpen(true)}} className='text-reset m-0 w-100 text-danger'>
                                                Copy password <MDBIcon fas icon='clipboard' className='ms-3' />
                                            </MDBBtn>
                                        </MDBCardFooter>
                                    </MDBCard>
                                </MDBCol>

                            )
                        })
                    }
                </MDBRow> */}
            </MDBContainer>
            <Snackbar open={open} anchorOrigin={{ vertical:"bottom", horizontal:"center" }} autoHideDuration={2000} onClose={()=>{setOpen(false)}}>
                <Alert onClose={()=>{setOpen(false)}}  sx={{ width: '100%' }}>
                    Text copied successfully
                </Alert>
            </Snackbar>
{/* 
            <AddPasswordModal setRefresh={setRefresh} setCopyOpen={setOpen} open={showAddModal} setOpen={setShowAddModal} />
            <GeneratePasswordModal setCopyOpen={setOpen} open={showGenerateModal} setOpen={setShowGenerateModal} /> */}

      
    </>
  )
}  

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

