import { useContext, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import MultiSelectComponent from "../Components/MultiSelectComponentold"
import DatePickerComponent from "../Components/DatePickerComponent"
import ButtonComponent from "../Components/ButtonComponent"
import { Search } from "react-bootstrap-icons"
import { NXT, TableColumn,getNxtAll } from "../Services/VfcService"
import SpinnerComponent from "../Components/SpinnerComponent"
import TableComponent from "../Components/TableComponent"
import { ToastContext } from "../Services/ToastContext"
const columnNxt:TableColumn<NXT>[]=[
    { key: "storeCode", label: "Store",type:'string' },
    { key: "upc", label: "UPC",type:'string' },
    {key:'description1',label:'MTK',type:'string'},
    {key:"structureCode",label:"MKC",type:'string'},
    { key: "structureClass", label: "KC" ,type:'string'},
    { key: "price", label: "Giá",type:'string' },
    { key: "begin", label: "Đầu Kỳ" ,type:'number'},
    { key: "qtyVoucher", label: "Nhập",type:'number' },
    { key: "qtySlip", label: "Xuất",type:'number' },
    { key: "qtyInvoice", label: "Bán",type:'number' },
    { key: "adjust", label: "ĐC",type:'number' },
    { key: "inventory", label: "Tồn Kho",type:'number' },
  ]
export const Nxt=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const [selectedMulti,setSelectedMulti]=useState<string[]>([])
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataNXT, setDataNXT] = useState<NXT[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleClick=async()=>{
       
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
        setIsLoading(true);
        setError('');    // Reset lỗi
        try {
          const res = await getNxtAll(selectedMulti.toString(),formattedDateFrom,formattedDateTo);
          setDataNXT(res);  // Cập nhật dữ liệu vào state
         }
         
        catch (err) {
          setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
        } finally {
          setIsLoading(false);  // Hoàn tất việc tải dữ liệu
        }
    
    }
    return(
        <Container fluid>
              <Row><h2 style={{ textAlign:'center'}}>Tra Cứu NXT</h2></Row>
              <Row className="d-flex justify-content-center align-items-center">
                  <Col sm={3}><MultiSelectComponent placeholder="Chọn Cửa Hàng" selectedValues={selectedMulti} onChange={setSelectedMulti}/></Col>
                  <Col sm={3}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
                  <Col sm={3}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
                  <Col sm={3}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                      variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
              </Row>
              <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                  {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                  {dataNXT.length>0?(<TableComponent data={dataNXT} columns={columnNxt} />
                  ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}>Chưa có dữ liệu</h3>
                  )}
              </Row>
        </Container>
    )
}