import { Col, Container, Row } from "react-bootstrap"
import { getSlip, getSlipAll, Slip, TableColumn } from "../Services/VfcService"
import { useContext, useState } from "react";
import DatePickerComponent from "../Components/DatePickerComponent";
import ButtonComponent from "../Components/ButtonComponent";
import { Search } from "react-bootstrap-icons";
import SpinnerComponent from "../Components/SpinnerComponent";
import TableComponent from "../Components/TableComponent";
import MultiSelectComponent from "../Components/MultiSelectComponent";
import { ToastContext } from "../Services/ToastContext";
import { StoreContext } from "../Services/StoreContext";

const columnSlip:TableColumn<Slip>[]=[
    {key:"storeOut",label:"Cửa Hàng Xuất",type:"string"},
    {key:"storeIn",label:"Cửa Hàng Nhập",type:"string"},
    {key:"udF10",label:" Mã UDF",type:"string"},
    {key:"price",label:"Giá",type:"string"},
    {key:"sumQty",label:"Số Lượng",type:"number"}
]
export const SlipPage=()=>{
  const {addToast,removeToast}=useContext(ToastContext)
  const {dataStores,dataStoresAll}=useContext(StoreContext)
    const [selectedStoreOut, setSelectedStoreOut] = useState<string[]>([]);
    const [selectedStoreIn, setSelectedStoreIn] = useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataSlip, setDataSlip] = useState<Slip[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleClick=async()=>{
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
        setIsLoading(true);
        setError('');    // Reset lỗi

        if(selectedStoreIn.toString()==''){
            try {
          
                const res = await getSlipAll(selectedStoreOut.toString(),formattedDateFrom,formattedDateTo);
                console.log(res)
                setDataSlip(res);  // Cập nhật dữ liệu vào state
             }
             
            catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
        }
        else{
            try {
          
                const res = await getSlip(selectedStoreOut.toString(),selectedStoreIn.toString(),formattedDateFrom,formattedDateTo);
                console.log(res)
                setDataSlip(res);  // Cập nhật dữ liệu vào state
             }
             
            catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
        }
    }
    return(
        <Container fluid>
            <Row><h2 style={{ textAlign:'center'}}>Tra cứu Xuất Hàng</h2></Row>
            <Row className="d-flex justify-content-center align-items-center">
                  <Col sm={3}><MultiSelectComponent placeholder="Cửa Hàng Xuất" selectedValues={selectedStoreOut} onChange={setSelectedStoreOut} dataStores={dataStores}/></Col>
                  <Col sm={3}><MultiSelectComponent placeholder="Cửa Hàng Nhận" selectedValues={selectedStoreIn} onChange={setSelectedStoreIn}dataStores={dataStoresAll}/></Col>
                  <Col sm={2}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
                  <Col sm={2}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
                  <Col sm={2}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                        variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                  {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                  {dataSlip.length>0?(<TableComponent data={dataSlip} columns={columnSlip} />
                  ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                  )}
            </Row>
        </Container>
    )
}