import { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { getVoucher, getVoucherAll, TableColumn, Voucher } from "../Services/VfcService";
import { Search } from "react-bootstrap-icons";
import MultiSelectComponent from "../Components/MultiSelectComponent";
import DatePickerComponent from "../Components/DatePickerComponent";
import ButtonComponent from "../Components/ButtonComponent";
import SpinnerComponent from "../Components/SpinnerComponent";
import TableComponent from "../Components/TableComponent";
import { ToastContext } from "../Services/ToastContext";
import { StoreContext } from "../Services/StoreContext";

const columnVoucher:TableColumn<Voucher>[]=[
    {key:"storeIn",label:"Cửa Hàng Nhập",type:"string"},
    {key:"storeOut",label:"Cửa Hàng Xuất",type:"string"},
    {key:"udF10",label:" Mã UDF",type:"string"},
    {key:"price",label:"Giá",type:"string"},
    {key:"sumQty",label:"Số Lượng",type:"number"}
]
export const VoucherPage=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const {dataStores,dataStoresAll}=useContext(StoreContext)
    const [selectedStoreOut, setSelectedStoreOut] = useState<string[]>([]);
    const [selectedStoreIn, setSelectedStoreIn] = useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataVoucher, setDataVoucher] = useState<Voucher[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleClick=async()=>{
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
        setIsLoading(true);
        setError('');    // Reset lỗi
        if(selectedStoreOut.toString()==''){
            try {
          
                const res = await getVoucherAll(selectedStoreIn.toString(),formattedDateFrom,formattedDateTo);
               
                setDataVoucher(res);  // Cập nhật dữ liệu vào state
             }
             
            catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
        }
        else{
            try {
          
                const res = await getVoucher(selectedStoreIn.toString(),selectedStoreOut.toString(),formattedDateFrom,formattedDateTo);
             
                setDataVoucher(res);  // Cập nhật dữ liệu vào state
             }
             
            catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
        }
    }
    return (
        <Container fluid>
                  <Row><h2 style={{ textAlign:'center'}}>Tra Cứu Nhập Hàng</h2></Row>
                  <Row className="d-flex justify-content-center align-items-center">
                        <Col sm={3}><MultiSelectComponent placeholder="Cửa Hàng Nhận" selectedValues={selectedStoreIn} onChange={setSelectedStoreIn} dataStores={dataStores}/></Col>
                        <Col sm={3}><MultiSelectComponent placeholder="Cửa Hàng Xuất" selectedValues={selectedStoreOut} onChange={setSelectedStoreOut} dataStores={dataStoresAll}/></Col>
                        <Col sm={2}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
                        <Col sm={2}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
                        <Col sm={2}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                                variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
                  </Row>
                  <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                      {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                      {dataVoucher.length>0?(<TableComponent data={dataVoucher} columns={columnVoucher} />
                      ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}>Chưa có dữ liệu</h3>
                      )}
                  </Row>
        </Container>
    )
}