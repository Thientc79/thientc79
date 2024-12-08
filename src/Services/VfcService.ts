import {apiBaseUrl} from '../Services/config'
import axios from "axios"


export interface TableColumn<T> {
    key: keyof T |string; // Key của cột
    label: string; // Tên hiển thị
    type?: "number" | "string" | "Date" | 'action'; // Loại dữ liệu
    renderAction?: (row: T) => React.ReactNode; // For custom actions
  }
  //Upc
 
  export interface UPC{
    store_Code: string;
    upc: string;
    description1:string,
    description2:string,
    qty:number;
    siz:string;
    attr:string;
    region_Name:string,
    price:number
  }
  export const getUpc=async(upc:string,store:string,region:string,Exactly:boolean)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/NXT/LookupUPC?upc=` + upc + '&store=' + store + '&region=' + region + '&Exactly=' + Exactly)
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  } 
  //MTK
  export interface MTK{
    store_Code: string;
    upc: string;
    description1:string,
    description2:string,
    qty:number;
    siz:string;
    attr:string;
    region_Name:string,
    price:string
  }
  export const getMTK=async(upc:string,store:string,region:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/NXT/LookupMTK?upc=` + upc + '&store=' + store + '&region=' + region )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //NXT
  export interface NXT{
    storeCode: string,
  upc: string,
  description1: string,
  structureCode: string,
  structureClass: string,
  price: string,
  begin: number,
  qtyVoucher: number,
  qtySlip: number,
  qtyInvoice: number,
  adjust: number,
  inventory: number
  }
  export const getNxtAll=async(store:string,dateFrom:string,dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Nxt/GetNXTRegion?store=` + store + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //Bill
  export interface Bi{
    invc_Sid:string,
    store:string,
    invoice_No:string,
    emp_Name:string,
    emp_Phone:string,
    sumQty:number,
    totalMoney:number,
    discamount:number,
    created_Date:Date,
    note:string
  }
  export const getBill=async(store:string,dateFrom:string,dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Invoice/GetBill?store=` + store + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //nill info
  export interface BillInfo{
    invc_No:string,
    upc:string,
    description1:string,
    sumQty:number,
    price:string,
    totalMoney:number,
    coupon_No:string,
    discamount:number,
    discounT_PERCENT:string
  }
  export const getBillInfo=async(invc_sid:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Invoice/GetBillInfo?invc_sid=` + invc_sid  )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //doanh thu Tổng
  
  export interface dtAll{
    region_Name:string,
    store_Code:string,
    totalMoney:number,
    sumQty:number,
    discamount:number,
    count_Bill:number,
  }
  export const getDTAll=async(dateFrom:string,dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Invoice/GetRevenueAllStore?dateFrom=` + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  
  export const getDTByRegion=async(region:string,dateFrom:string,dateTo:string)=>{
  try {
    const response = await axios.get(`${apiBaseUrl}/Invoice/GetRevenueAllStoreByRegion?region=`+ region + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
    return response.data.result
   
  } catch (error) {
    
    throw error;
  }
  }
  export const getDTByStore=async(store:string,dateFrom:string,dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Invoice/GetRevenueAllStoreByStore?store=`+ store + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
}
//Invoice
export interface Invo{
  store:string,
  udF10:string,
  price:string,
  sumQty:number,
  priceDiscount:number,
  totalMoney:number
}
export const getInvoice=async(store:string,dateFrom:string,dateTo:string)=>{
  try {
    const response = await axios.get(`${apiBaseUrl}/Invoice/GetInvoice?store=`+ store + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
    return response.data.result
   
  } catch (error) {
    
    throw error;
  }
}

//Daonh Thu Cửa Hàng
export interface dtStore{
  region_Name:string,
  store_Code:string,
  created_Date:Date,
  sumQty:number,
  discamount :number,
  totalMoney:number,
  count_Bill:number
}
export const getRevenueStore=async(store:string,dateFrom:string,dateTo:string)=>{
  try {
    const response = await axios.get(`${apiBaseUrl}/Invoice/GetRevenueStore?store=`+ store + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
    return response.data.result
   
  } catch (error) {
    
    throw error;
  }
}

//Doanh Thu Nhân Viên
export interface ReveEmp{
  region_Name:string,
  store_Code:string,
  empl_Name:string,
  sumQty:number,
  discamount :number,
  totalMoney:number
}
export const getRevenueEmpStore=async(store:string,dateFrom:string,dateTo:string)=>{
  try {
    const response = await axios.get(`${apiBaseUrl}/Invoice/GetRevenueEmpStore?store=`+ store + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
    return response.data.result
   
  } catch (error) {
    
    throw error;
  }
}
export const getRevenueEmpRegion=async(region:string,dateFrom:string,dateTo:string)=>{
  try {
    const response = await axios.get(`${apiBaseUrl}/Invoice/GetRevenueEmpRegion?region=`+ region + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
    return response.data.result
   
  } catch (error) {
    
    throw error;
  }
}
//Payment
export interface Payment{
  invc_No:string,
  created_DateTime:Date,
  amount:number,
  taken:number,
  tender_Name:string,
  card_Type_Name:string
}
export const getPayment=async( store:string, dateFrom:string, dateTo:string)=>
  {
    try {
      const response = await axios.get(`${apiBaseUrl}/Invoice/GetInvoicePayment?store=`+ store + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //Slip
  export interface Slip{
    storeOut:string,
    storeIn:string,
    udF10:string,
    price:string,
    sumQty:number

  }
  export const getSlipAll=async(storeOut:string,dateFrom:string, dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Slip/GetSlipAll?storeOut=`+ storeOut + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  export const getSlip=async(storeOut:string,storeIn:string,dateFrom:string, dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Slip/GetSlip?storeOut=`+ storeOut + '&storeIn=' +storeIn+ '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //Phiếu Xuất
  export interface Slips{
    slip_Sid:string,
    slip_No:string,
    out_Store:string,
    in_Store:string,
    createdSlip:Date,
    sumQty:number,
    createdvoucher:Date,
    status:string
  }
  export const getSlipsAll=async(storeOut:string,dateFrom:string, dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Slip/GetSlipStoresAll?storeOut=`+ storeOut + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  export const getSlips=async(storeOut:string,storeIn:string,dateFrom:string, dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Slip/GetSlipStores?storeOut=`+ storeOut +'&storeIn=' +storeIn+ '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //Slip Info
  export interface SlipInfo{
    slip_No:string,
    upc:string,
    description1 :string,
    price:string,
    sumQty:number,
    note:string
  }
  export const getSlipsInfo=async(slip_sid:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Slip/GetSlipInfo?slip_sid=`+ slip_sid  )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //Nhập
  export interface Voucher{
    storeIn:string,
    storeOut:string,
   udF10:string,
    price:string,
    sumQty:number
  }
  export const getVoucherAll=async(storeIn:string,dateFrom:string, dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Voucher/GetVoucherAll?storeIn=`+ storeIn + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  export const getVoucher=async(storeIn:string,storeOut:string,dateFrom:string, dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Voucher/GetVoucher?storeIn=`+ storeIn + '&storeOut=' +storeOut+ '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //Phiếu nhập
  export interface Vouchers{
    voucherSid:string,
    voucherNo:string,
    inStore:string,
    outStore:string,
    created:Date,
    sumQty:number,
    
  }
  export const getVouchersAll=async(storeIn:string,dateFrom:string, dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Voucher/GetVoucherFileAll?storeIn=`+ storeIn + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  export const getVouchers=async(storeIn:string,storeOut:string,dateFrom:string, dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Voucher/GetVoucherFile?storeIn=`+ storeIn + '&storeOut=' +storeOut+ '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //VoucherInfo
  export interface VoucherInfo{
    voucher_No:string,
    upc:string,
    description1 :string,
    price:string,
    sumQty:number,
    totalMoney:number
  }
  export const getVouchersInfo=async(vou_sid:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Voucher/GetVoucherDetaill?vou_sid=`+ vou_sid  )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }

  //ASN
  export interface Asn{
    asnNo:string,
    slipNo:string,
    storeIn:string,
    storeOut:string,
    createdSlip:Date,
    sumQty:number,
    totalMoney:number,
    slip_Sid:string
  }
  export const getAsn=async(storeIn:string,dateFrom:string, dateTo:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Voucher/GetASN?storeIn=`+ storeIn + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo   )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }

  //Customer
  export interface Cust{
    cust_Id:string,
    title:string,
    fullName:string,
    phone:string,
    dOB:Date,
    address:string
  }
  export const getCustomer=async(phone:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Customer/GetCusByPhone?phone=`+ phone  )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //billCUs
  export const getBillCus=async(phone:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Invoice/GetBillByPhone?phone=`+ phone  )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
  //dtCUs
  export const getRevenueCus=async(phone:string)=>{
    try {
      const response = await axios.get(`${apiBaseUrl}/Invoice/GetInvoiceByPhone?phone=`+ phone  )
      return response.data.result
     
    } catch (error) {
      
      throw error;
    }
  }
