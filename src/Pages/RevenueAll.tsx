import { useContext, useState } from "react";
import { dtAll, getDTAll, getDTByRegion, getDTByStore, TableColumn } from "../Services/VfcService";
import { StoreContext } from "../Services/StoreContext";
import { AuthContext } from "../Services/AuthContext";
import { Col, Container, Row } from "react-bootstrap";
import DatePickerComponent from "../Components/DatePickerComponent";
import ButtonComponent from "../Components/ButtonComponent";
import { Search } from "react-bootstrap-icons";
import SpinnerComponent from "../Components/SpinnerComponent";
import TableComponent from "../Components/TableComponent";
import { ToastContext } from "../Services/ToastContext";

const columnsDT: TableColumn<dtAll>[] = [
    { key: "region_Name", label: "KV", type: "string" },
    { key: "store_Code", label: "Store", type: "string" },
    { key: "sumQty", label: "Qty", type: "number" },
    { key: "totalMoney", label: "Total", type: "number" },
    { key: "discamount", label: "Giảm", type: "number" },
    { key: "count_Bill", label: "Bill", type: "number" },
  ];
export const RevenueAll=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const {users}=useContext(AuthContext)
    const {storeNo,dataStores}=useContext(StoreContext)
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataDT,setDataDT] = useState<dtAll[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleClick=async()=>{
       const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
        setIsLoading(true);
        setError('');    
        const Region = users[0]?.region;
        const Role = users[0]?.role;
        try{
            let dt:dtAll [] = [];
            if(!Region){
                const dt = await getDTAll(formattedDateFrom,formattedDateTo);
                setDataDT(dt);
            }else if(Role==='ASM' && Region){
                const dt = await getDTByRegion(Region,formattedDateFrom,formattedDateTo);
                setDataDT(dt);
                } else if(storeNo){
                        const dtstore:any=await getDTByStore(storeNo,formattedDateFrom,formattedDateTo);
                        if(dtstore){
                        setDataDT(dtstore)} 
               
              }
                    else{addToast("Không có dữ liệu cửa hàng","danger")   ;}
            }
            catch (err) {
                        setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
                        setIsLoading(false);  // Hoàn tất việc tải dữ liệu
                      }
    
    }
    return(

        <Container fluid>
            <Row><h2 style={{ textAlign:'center'}}>Doanh Thu Tổng</h2></Row>
            <Row className="d-flex justify-content-center align-items-center">
             
                <Col sm={3}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
                <Col sm={3}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
                <Col sm={3}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                        variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
             </Row>
             <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                    {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                    {dataDT.length>0?(<TableComponent data={dataDT} columns={columnsDT} />
                    ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}>Chưa có dữ liệu</h3>
                    )}
            </Row>
        </Container>
    )
}