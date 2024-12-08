import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar,NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../Services/AuthContext';


const NavbarComponent: React.FC = ( ) => {
 const {logout,users}=useContext(AuthContext)
  return (
    <Navbar bg="light" variant="light" expand="lg" >
    
    <Container fluid>
      <Navbar.Brand href="#/thientc79" style={{color:'red'}}>VFC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav.Link href="#/thientc79">Home</Nav.Link>
        <Nav  className="me-auto my-2 my-lg-0">
            <NavDropdown title="Doanh Thu" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/thientc79/invoice">Doanh Thu</NavDropdown.Item>
                <NavDropdown.Item href="#/thientc79/bill">Bill</NavDropdown.Item>
                <NavDropdown.Item href="#/thientc79/revenueStore">Doanh Thu Cửa Hàng</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/thientc79/revenueEmp">Doanh Thu Nhân Viên</NavDropdown.Item>
                <NavDropdown.Item href="#/thientc79/payment">Hình Thức Thanh Toán</NavDropdown.Item>
                <NavDropdown.Item href="/thientc79/revenueAll">Doanh Thu Tổng</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Xuất" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/thientc79/slip">Xuất hàng</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/thientc79/slips">Phiếu Xuất Hàng</NavDropdown.Item>
                
                
            </NavDropdown>
            <NavDropdown title="Nhập" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/thientc79/voucher">Nhập Hàng</NavDropdown.Item>
                <NavDropdown.Item href="#/thientc79/vouchers">Phiếu Nhập Hàng</NavDropdown.Item>
              
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/thientc79/asn">ASN</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tồn Kho" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/thientc79/nxt">N-X-T</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/thientc79/upc">Tra Cứu UPC</NavDropdown.Item>
                <NavDropdown.Item href="#/thientc79/des">Tra Cứu MTK</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Khách Hàng" id="basic-nav-dropdown">
               
                <NavDropdown.Item href="#/thientc79/cus">Tra Cứu Khách Hàng</NavDropdown.Item>
                <NavDropdown.Item href="#/thientc79/revenueCus">Doanh Thu Khách Hàng</NavDropdown.Item>
            </NavDropdown>
           
        </Nav>
        <Nav className='justify-content-end'>
          <NavDropdown title={users[0].name.toUpperCase()} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="#/thientc79/users">Người dùng</NavDropdown.Item>
              <NavDropdown.Item href="#/thientc79/change">Đổi Mật Khẩu</NavDropdown.Item>
              <NavDropdown.Item href="#/thientc79/store">Cửa Hàng</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      
   
    </Container>
   
   
    
  </Navbar>
  );
};


export default NavbarComponent;