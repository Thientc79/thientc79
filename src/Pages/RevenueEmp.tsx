import { Col, Container, Row } from "react-bootstrap"
import { getRevenueEmpRegion, getRevenueEmpStore, ReveEmp, TableColumn } from "../Services/VfcService"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Services/AuthContext"
import DatePickerComponent from "../Components/DatePickerComponent"
import ButtonComponent from "../Components/ButtonComponent"
import { Search } from "react-bootstrap-icons"
import SpinnerComponent from "../Components/SpinnerComponent"
import TableComponent from "../Components/TableComponent"
import CheckboxComponent from "../Components/CheckboxComponent"
import SelectComponent from "../Components/SelectComponent"
import { ToastContext } from "../Services/ToastContext"

const columnRevuneEmp:TableColumn<ReveEmp>[]=[
{key:"region_Name",label:"Khu Vực",type:"string"},
  {key:"store_Code",label:"Cửa Hàng",type:"string"},
  {key:"empl_Name",label:"Tên Nhân Viên",type:"string"},
  {key:"sumQty",label:"Số Lượng",type:"number"},
  {key:"discamount",label:"Giảm Giá",type:"number"},
  {key:"totalMoney",label:"Thành Tiền",type:"number"},
]
export const RevenueEmp=()=>{
  const {addToast,removeToast}=useContext(ToastContext)
    const {users}=useContext(AuthContext)
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataRevenueEmp, setDataRevenueEmp] = useState<ReveEmp[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    const [disable,setDisable]=useState(true);
    useEffect(()=>{
        const load=()=>{
            if(users[0].role=='ASM'){setDisable(false)}else{setDisable(true) ;setIsChecked(false)}
        }
        load();
    },[])
    const handleChange=(value: string)=>{
        setSelectedOption(value)
    }
    const handleClick=async()=>{
       const Region=users[0].region
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
        setIsLoading(true);
        setError('');    // Reset lỗi
        if(isChecked==true){
            try {
          
                const res = await getRevenueEmpRegion(Region,formattedDateFrom,formattedDateTo);
              
                setDataRevenueEmp(res);  
             }
             
            catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
        }else{
            try {
          
                const res = await getRevenueEmpStore(selectedOption,formattedDateFrom,formattedDateTo);
              
                setDataRevenueEmp(res);  // Cập nhật dữ liệu vào state
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
              <Row><h2 style={{ textAlign:'center'}}>Doanh Thu Nhân Viên</h2></Row>
             <Row className="d-flex justify-content-center align-items-center">
                <Col sm={3}><SelectComponent placeholder="Chọn Cửa Hàng" selectedValue={selectedOption} onChange={handleChange}/></Col>
                <Col sm={2}><CheckboxComponent id="region-checkbox"label="Khu Vực"checked={isChecked}onChange={setIsChecked} disabled={disable}/></Col>
                <Col sm={2}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
                <Col sm={2}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
                <Col sm={2}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                      variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
              </Row>
              <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                    {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                    {dataRevenueEmp.length>0?(<TableComponent data={dataRevenueEmp} columns={columnRevuneEmp} />
                    ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                    )}
              </Row>
        </Container>
    )
}