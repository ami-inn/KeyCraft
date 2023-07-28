import React from 'react';
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBNavbar,
    MDBNavbarBrand,
    MDBRow,
} from 'mdb-react-ui-kit';
import banner from '../../images/banner.png';

import axios from 'axios';

export default function Header({ setRefresh }) {
    const handleLogout = async () => {
        const { data } = await axios.get("/logout")
        setRefresh(refresh => !refresh)
    }
    return (
        <>

            <MDBNavbar  className='position-sticky sticky-top' style={{background:'none'}}>
                <MDBContainer>
                    <MDBContainer fluid className='p-0'>
                        <MDBRow>
                            <MDBCol>
                                <MDBNavbarBrand href='#'>
                                    <img
                                        // src={icon}
                                        src=''
                                        height='30'
                                        alt=''
                                        loading='lazy'
                                    />
                                    <b style={{ fontSize: "1rem", marginLeft: "5px" ,color:'#BDB9FF'}}>Keycraft</b>
                                </MDBNavbarBrand>
                            </MDBCol>
                            <MDBCol className='d-flex justify-content-end'>
                                <MDBDropdown>
                                    <MDBDropdownToggle  className='shadow-none' style={{background:'none'}}>
                                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                            width={30} height={30}
                                            alt="" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link onClick={handleLogout}>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBCol>
                        </MDBRow>

                    </MDBContainer>
                </MDBContainer>
            </MDBNavbar>
            <header>
                {/* <MDBContainer>
                    <MDBRow className='mt-3'>
                        <h5>Home</h5>
                    </MDBRow>
                </MDBContainer> */}
                <div
                    className='p-5 text-center container bg-image'
                    style={{ backgroundSize: "contain", backgroundImage: `url(${banner})`, height: '350px' }}
                >
                </div>
            </header>
        </>
    );
}