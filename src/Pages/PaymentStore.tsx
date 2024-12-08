import { Container,Row,Col } from "react-bootstrap"
import { getPayment, Payment, TableColumn } from "../Services/VfcService"
import { useContext, useState } from "react";
import TableComponent from "../Components/TableComponent";
import SpinnerComponent from "../Components/SpinnerComponent";
import ButtonComponent from "../Components/ButtonComponent";
import SelectComponent from "../Components/SelectComponent";
import { Search } from "react-bootstrap-icons";
import DatePickerComponent from "../Components/DatePickerComponent";
import { ToastContext } from "../Services/ToastContext";

const columnPayment:TableColumn<Payment>[]=[
    {key:"invc_No",label:"Hoá Đơn",type:"string"},
  {key:"created_DateTime",label:"Ngày",type:"Date"},
  {key:"amount",label:"Amount",type:"number"},
  {key:"taken",label:"Taken",type:"number"},
  {key:"tender_Name",label:"Tender",type:"string"},
  {key:"card_Type_Name",label:"Type",type:"string"}
]
export const PaymentStore=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataPayment, setDataPayment] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleChange=(value: string)=>{
        setSelectedOption(value)
    }
    const handleClick=async()=>{
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
        setIsLoading(true);
        setError('');    // Reset lỗi
        try {
          
            const res = await getPayment(selectedOption,formattedDateFrom,formattedDateTo);
           
            setDataPayment(res);  
         }
         
        catch (err) {
          setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
        } finally {
          setIsLoading(false);  
        }
    }
    return(
        <Container fluid>
            <Row><h2 style={{ textAlign:'center'}}>Hình Thức Thanh Toán</h2></Row>
            <Row className="d-flex justify-content-center align-items-center">
                <Col sm={3}><SelectComponent placeholder="Chọn Cửa Hàng" selectedValue={selectedOption} onChange={handleChange}/></Col>
                <Col sm={3}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
                <Col sm={3}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
                <Col sm={3}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                        variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                {dataPayment.length>0?(<TableComponent data={dataPayment} columns={columnPayment} />
                ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                )}
            </Row>
        </Container>
    )
}