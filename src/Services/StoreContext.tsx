import { apiBaseUrl } from './config';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { ToastContext } from './ToastContext';
export interface Store{
    storE_NO: string;
    storE_CODE: string;
    regioN_NAME:string;
}
interface StoreConTextType{
    storeNo:string|null
     dataStores:Store[],
     dataStoresAll:Store[],
  }
  type Props = { children: React.ReactNode };
  
  export const StoreContext = createContext<StoreConTextType>({
     storeNo:null,
      dataStores:[],
      dataStoresAll:[],
  } )  
  export const StoreProvider=({children}:Props)=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const {users}=useContext(AuthContext)
  const [dataStores,setDataStore]=useState<Store[]>([])
  const [dataStoresAll,setDataStoreAll]=useState<Store[]>([])
  const [storeNo,setStoreNo]=useState(null)
  const getStoreAll=async() =>{
    try {
        const response = await axios.get(`${apiBaseUrl}/Store/GetStore`)
        return response.data.result
       
      } catch (error) {
        
        throw error;
      }
}
const getStoreByRegion=async(region:string)=>{
    try {
        const response = await axios.get(`${apiBaseUrl}/Store/GetStoreByRegion?region=` + region)
        return response.data.result
       
      } catch (error) {
        
        throw error;
      }
}

const getStoreByCode=async(storeCode:string)=>{
    try {
        const response = await axios.get(`${apiBaseUrl}/Store/GetNoByCode?code=` + storeCode)
        return response.data.result
       
      } catch (error) {
        
        throw error;
      }
}
useEffect(()=>{
    const loadStore=async()=>{
        const storeCode=users[0]?.username.slice(0,3).toUpperCase()
        const userRegion = users[0]?.region;
        const userRole = users[0]?.role;
         
          try {
              let stores: Store[] = [];
             
              if (!userRegion) {
                  const stores = await getStoreAll();
                  setDataStore(stores)  
                  
                } else if (userRole === 'ASM' && userRegion) {
                  const stores = await getStoreByRegion(users[0]?.region);
                  setDataStore(stores)  
                } else if (storeCode) {
                  const store = await getStoreByCode(storeCode);
                  if (store) {
                    setStoreNo(store.storE_NO); // Lưu lại mã cửa hàng
                    stores = [store]; // Đưa cửa hàng vào danh sách
                  }
                  setDataStore(stores)  
                 
                } else {
                  console.log("Không có dữ liệu cửa hàng","danger")
                }
               
         }
          catch (error) {
            console.log("Có lỗi khi kết nối",error)
            } 
          }
    const loadStoreAll=async()=>{
      
      try {
        
        const storesAll = await getStoreAll();
        setDataStoreAll(storesAll) 
      } catch (error) {
        console.log("Có lỗi khi kết nối",error)
        } 
    }
      loadStore();
      loadStoreAll();
},[])
return(
    <StoreContext.Provider value={{dataStores,storeNo,dataStoresAll }}>
        {children}
    </StoreContext.Provider>
)
  }