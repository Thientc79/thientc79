import { Col, Container, Row } from "react-bootstrap"
import MultiSelectComponent from "../Components/MultiSelectComponentold"
import DatePickerComponent from "../Components/DatePickerComponent"
import ButtonComponent from "../Components/ButtonComponent"
import { Search } from "react-bootstrap-icons"
import SpinnerComponent from "../Components/SpinnerComponent"
import TableComponent from "../Components/TableComponent"
import { useContext, useState } from "react"
import { dtStore,getRevenueStore,TableColumn } from "../Services/VfcService"
import { ToastContext } from "../Services/ToastContext"
const columnRevenueStore:TableColumn<dtStore>[]=[
    { key: "region_Name", label: "Region",type:'string' },
    { key: "store_Code", label: "Store",type:'string' },
    {key:'created_Date',label:'Ngày',type:'Date'},
    {key:"sumQty",label:"QTY",type:'number'},
    { key: "discamount", label: "Giảm Giá" ,type:'number'},
    { key: "totalMoney", label: "Thành Tiền",type:'number' },
    { key: "count_Bill", label: "Bill",type:'number' },
  ]

export const RevenueStore=()=>{
  const {addToast,removeToast}=useContext(ToastContext)
    const [selectedMulti,setSelectedMulti]=useState<string[]>([])
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataRevenueStore, setDataRevenueStore] = useState<dtStore[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleClick=async()=>{
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
      
        setIsLoading(true);
        
        setError('');    // Reset lỗi
        try {
          
            const res = await getRevenueStore(selectedMulti.toString(),formattedDateFrom,formattedDateTo);
           
            setDataRevenueStore(res);  // Cập nhật dữ liệu vào state
         }
         
        catch (err) {
          setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
        } finally {
          setIsLoading(false);  // Hoàn tất việc tải dữ liệu
        }
    }
    return (
        <Container fluid>
          <Row><h2 style={{ textAlign:'center'}}>Doanh Thu Cửa Hàng</h2></Row>
          <Row className="d-flex justify-content-center align-items-center">
                  <Col sm={3}><MultiSelectComponent placeholder="Chọn Cửa Hàng" selectedValues={selectedMulti} onChange={setSelectedMulti}/></Col>
                  <Col sm={3}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
                  <Col sm={3}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
                  <Col sm={3}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                  variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                {dataRevenueStore.length>0?(<TableComponent data={dataRevenueStore} columns={columnRevenueStore} />
                ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                )}
          </Row>
        </Container>
    )
}