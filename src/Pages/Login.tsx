import React, { useContext, useState } from 'react';
import ButtonComponent from '../Components/ButtonComponent';
import { AuthContext } from '../Services/AuthContext';
import {  ToastContext } from '../Services/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Person, Key,DoorOpen} from 'react-bootstrap-icons'; // Example icons
import InputComponent from '../Components/InputComponent';
import {Form, Col, Container, Row } from 'react-bootstrap';


const Login=()=>{
  const {login}=useContext(AuthContext)
  const {addToast, removeToast}=useContext(ToastContext)
  
  const style={
    container:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    },
    content:{
     // textAlign: 'center',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    };
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleClick = async() => {
      
      try {
    
        await login(username, password);

        
      } catch (error) {
        addToast('Tên đăng nhập và mật khẩu không đúng','danger');
      }
  
      };
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh',
      }}>
      <Row className="w-100 justify-content-center align-items-center">
        <Col md={6} lg={4} sm={12}  >
          <h2 className="text-center mb-4" style={{color:'red'}}>Login</h2>
         
          
            <InputComponent type="text" value={username} placeholder="Tên đăng nhập" onChange={setUsername}
          icon={<Person />}iconPosition="left"/>
          <br/>
           <InputComponent type="password"value={password}placeholder="Mật Khẩu"onChange={setPassword}
            icon={<Key />}iconPosition="left"/>
             <br/>
             <div className="d-flex justify-content-center">
           <ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                  variant="primary" icon={<DoorOpen/>}>Đăng nhập</ButtonComponent>
          </div>
        </Col>
      </Row>
    </Container>
    );
   
}

export default Login