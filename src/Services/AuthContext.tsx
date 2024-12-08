import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { ToastContext } from './ToastContext';
import { apiBaseUrl } from './config';
import { useNavigate } from 'react-router-dom';


 interface Auth{
  id:string,
  name:string,
  username:string,
  password:string,
  email:string,
  role:string,
  region:string
}
interface AuthConTextType{
    token:string|null,
    users:Auth[],
    isLoggedIn:boolean;
    login:(username:string,password:string)=>Promise<void>;
    logout:()=>Promise<void>;
  }
 
  export const AuthContext = createContext<AuthConTextType>({
    token:null,
    users:[],
    isLoggedIn:false,
    login:async()=>{},
    logout:async()=> {},
}) 
type Props = { children: ReactNode };
export const AuthProvider=({children}:Props)=>{
  const navigate = useNavigate();
    const {addToast}=useContext(ToastContext)
    const [users, setUsers] = useState<Auth[]>(()=>{
      const storedUsers = localStorage.getItem('@users');
      return storedUsers ? JSON.parse(storedUsers) : [];
    });
    const [token, setToken] = useState<string|null>(()=> localStorage.getItem('@token'));
    const [isLoggedIn,setIsLoggedIn]=useState<boolean>(() => !!token)
    useEffect(() => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
  
      }, [token]);
    const login = useCallback(async(username:string,password:string) => {
      const userData = {username: username,password:password};
        if(username==="" || password===""){
          
            addToast("Vui lòng nhập đầy đủ thông tin!","warning")
            return;
          }
         try{
          const res= await axios.post(`${apiBaseUrl}/Authen/Login`, userData)
          if(res.data.statusCode==200){
           
              const { token, login } = res.data.result;
              localStorage.setItem('@users', JSON.stringify([login]));
              localStorage.setItem('@token', token);
              setToken(token);
              setUsers([login]);
              setIsLoggedIn(true);
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              addToast("Đăng nhập thành công","success")
              navigate('/')
            }
         } catch (error) {
          addToast( 'Có lỗi xảy ra. Vui lòng thử lại.','danger');
          console.error('Login error:', error);
        }
       
       
        
      } ,[addToast]) 
    
      // Hàm logout
      const logout = useCallback(async () => {
        localStorage.removeItem('@users');
        localStorage.removeItem('@token');
        setUsers([]);
        setToken(null);
        setIsLoggedIn(false);
        addToast( 'Thoát thành công','success');
        navigate('/login');
      }, [addToast]);
    
    return (
        <AuthContext.Provider value={{ users,token, login, logout, isLoggedIn }}>
          {children}
        </AuthContext.Provider>
      );
}