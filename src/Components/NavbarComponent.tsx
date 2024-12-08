import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar,NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../Services/AuthContext';


const NavbarComponent: React.FC = ( ) => {
 const {logout,users}=useContext(AuthContext)
  return (
    <Navbar bg="light" variant="light" expand="lg" >
    
    <Container fluid>
      <Navbar.Brand href="#/" style={{color:'red'}}>VFC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav.Link href="#/">Home</Nav.Link>
        <Nav  className="me-auto my-2 my-lg-0">
            <NavDropdown title="Doanh Thu" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/invoice">Doanh Thu</NavDropdown.Item>
                <NavDropdown.Item href="#/bill">Bill</NavDropdown.Item>
                <NavDropdown.Item href="#/revenueStore">Doanh Thu Cửa Hàng</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/revenueEmp">Doanh Thu Nhân Viên</NavDropdown.Item>
                <NavDropdown.Item href="#/payment">Hình Thức Thanh Toán</NavDropdown.Item>
                <NavDropdown.Item href="#/revenueAll">Doanh Thu Tổng</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Xuất" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/slip">Xuất hàng</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/slips">Phiếu Xuất Hàng</NavDropdown.Item>
                
                
            </NavDropdown>
            <NavDropdown title="Nhập" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/voucher">Nhập Hàng</NavDropdown.Item>
                <NavDropdown.Item href="#/vouchers">Phiếu Nhập Hàng</NavDropdown.Item>
              
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/asn">ASN</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tồn Kho" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/nxt">N-X-T</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/upc">Tra Cứu UPC</NavDropdown.Item>
                <NavDropdown.Item href="#/des">Tra Cứu MTK</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Khách Hàng" id="basic-nav-dropdown">
               
                <NavDropdown.Item href="#/cus">Tra Cứu Khách Hàng</NavDropdown.Item>
                <NavDropdown.Item href="#/revenueCus">Doanh Thu Khách Hàng</NavDropdown.Item>
            </NavDropdown>
           
        </Nav>
        <Nav className='justify-content-end'>
          <NavDropdown title={users[0].name.toUpperCase()} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="#/users">Người dùng</NavDropdown.Item>
              <NavDropdown.Item href="#/change">Đổi Mật Khẩu</NavDropdown.Item>
              <NavDropdown.Item href="#/store">Cửa Hàng</NavDropdown.Item>
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
