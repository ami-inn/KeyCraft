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
    const [showAddModal,setShowAddModal]=useState(false)
    const [list,setList]=useState([])
    const [open,setOpen]=useState(false)
    const [showGenerateModal,setShowGenerateModal]=useState(false)

    useEffect(()=>{
        getData()
    },[refresh])

    async function getData(){

        const {data}= await axios.get('/passwords')

        console.log('dataaa',data);
        if(!data.err){
            setList(data.passwords)
        }

    }

    console.log(list);

    async function deletePassword(id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DC4C64',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result)=>{
            if(result.isConfirmed){
                const {data}=await axios.patch('/password/',{id})
                if (!data.err) {
                    Swal.fire(
                        {
                            title: 'Success',
                            text: "Password deleted successfull.",
                            icon: 'success',
                            confirmButtonColor: '#DC4C64'
                        }
                    )
                } else {
                    Swal.fire(
                        {
                            title: 'Failed!',
                            text: "Password deletion failed",
                            icon: 'error',
                            confirmButtonColor: '#DC4C64'
                        }
                    )
                }

                setRefresh(!refresh)
          
            }
        })
    }
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
                                <MDBBtn className='w-100 mt-2'  style={{ boxShadow:'none', height: "50px" , color:'#261E8E' , background:'#BDB9FF'}} onClick={() => setShowAddModal(true)} >
                                    Add password
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBRow>
                <MDBRow className='mt-5'>
                    <h5 style={{color:'#BDB9FF'}} >Saved Passwords</h5>
                </MDBRow>
                <MDBRow className='mt-3'>
                    {
                        list[0] &&
                        list.map((item, index) => {
                            return (
                                <MDBCol xl={6} key={index} className='mb-4'>
                                    <MDBCard style={{background:'#0f0c2e'}}>
                                        <MDBCardBody>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='d-flex align-items-center'>
                                                    <img src="https://lh4.googleusercontent.com/zxHGfDuP9OcnUCHnOaV77PUez3jUnliiGJr4GmdExFZxMe5X3nqG9R8qTcBFcknkQ_lxT-rtQS42jXWqWr9E-xMNv50ri-pFg-HdQi_MQ-j75jkYuf5KILd8RdG8SC4zp8FMqJME9_atihTsBujbVdQAj_jwd6I0Tc3XP0stjsW_AHxAuX-OED49xizrBA" style={{ height: 65 }} className="rounded-circle" />
                                                    <div className='ms-3'>
                                                        <p className='fw-bold mb-1' style={{color:'#bdb9ff'}}>{item.appName}</p>
                                                        <p className='text-muted mb-0' style={{color:'#bdb9ff'}}>{item.userName}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </MDBCardBody>
                                        <MDBCardFooter style={{background:'#0f0c2e'}} border='0' className='p-2 d-flex justify-content-around g-3'>
                                            <MDBBtn   rippleColor='primary' className=' w-100' style={{" --mdb-btn-hover-color": "#0f0c2e", background:'#0f0c2e',boxShadow:'none',color:'#e24e4e' }} onClick={() => deletePassword(item._id)} >
                                                delete
                                                <MDBIcon style={{color:'#e24e4e'}} icon='trash' className='ms-3' />
                                            </MDBBtn>
                                            <MDBBtn className=' m-0 w-100'  style={{" --mdb-btn-hover-color": "#0f0c2e", background:'#0f0c2e',boxShadow:'none',color:'#bdb9ff'}} rippleColor='primary' onClick={() => {copyToClipboard(item.password); setOpen(true)}} >
                                                Copy password <MDBIcon style={{color:'#bdb9ff'}} fas icon='clipboard' className='ms-3' />
                                            </MDBBtn>
                                        </MDBCardFooter>
                                    </MDBCard>
                                </MDBCol>

                            )
                        })
                    }
                </MDBRow>
            </MDBContainer>
            <Snackbar open={open} anchorOrigin={{ vertical:"bottom", horizontal:"center" }} autoHideDuration={2000} onClose={()=>{setOpen(false)}}>
                <Alert onClose={()=>{setOpen(false)}}  sx={{ width: '100%' }}>
                    Text copied successfully
                </Alert>
            </Snackbar>

            <AddPasswordModal setRefresh={setRefresh} setCopyOpen={setOpen} open={showAddModal} setOpen={setShowAddModal} />
            <GeneratePasswordModal setCopyOpen={setOpen} open={showGenerateModal} setOpen={setShowGenerateModal} />

      
    </>
  )
}  

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

