import { useContext, useState } from "react";
import { getInvoice, Invo, TableColumn } from "../Services/VfcService";
import { Col, Container, Row } from "react-bootstrap";
import TableComponent from "../Components/TableComponent";
import SpinnerComponent from "../Components/SpinnerComponent";
import { Search } from "react-bootstrap-icons";
import ButtonComponent from "../Components/ButtonComponent";
import DatePickerComponent from "../Components/DatePickerComponent";
import MultiSelectComponent from "../Components/MultiSelectComponentold";
import { ToastContext } from "../Services/ToastContext";
const columnInvoice:TableColumn<Invo>[]=[
    { key: "store", label: "Store",type:'string' },
    { key: "udF10", label: "UDF",type:'string' },
    {key:'price',label:'Giá',type:'string'},
    {key:"sumQty",label:"Số Lượng",type:'number'},
    { key: "priceDiscount", label: "Giảm Giá" ,type:'number'},
    { key: "totalMoney", label: "Thành Tiền",type:'number' },
   
  ]
export const Invoice=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const [selectedMulti,setSelectedMulti]=useState<string[]>([])
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataInvoice, setDataInvoice] = useState<Invo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleClick=async()=>{
       
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
      
        setIsLoading(true);
        
        setError('');    // Reset lỗi
        try {
          
            const res = await getInvoice(selectedMulti.toString(),formattedDateFrom,formattedDateTo);
           
            setDataInvoice(res);  
         }
         
        catch (err) {
          setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")

        } finally {
          setIsLoading(false); 
        }
    
    }
    return(
    <Container fluid>
        <Row><h2 style={{ textAlign:'center'}}>Tra Cứu Doanh Thu</h2></Row>
        <Row className="d-flex justify-content-center align-items-center">
            <Col sm={3}><MultiSelectComponent placeholder="Chọn Cửa Hàng" selectedValues={selectedMulti} onChange={setSelectedMulti}/></Col>
            <Col sm={3}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
            <Col sm={3}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
            <Col sm={3}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
            {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
            {dataInvoice.length>0?(<TableComponent data={dataInvoice} columns={columnInvoice} />
            ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
            )}
       </Row>
   </Container>
    )
}