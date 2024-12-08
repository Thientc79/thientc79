import { useContext, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { ToastContext } from "../Services/ToastContext"
import { getRevenueCus, Invo, TableColumn } from "../Services/VfcService"
import InputComponent from "../Components/InputComponent"
import ButtonComponent from "../Components/ButtonComponent"
import { Search, Telephone } from "react-bootstrap-icons"
import SpinnerComponent from "../Components/SpinnerComponent"
import TableComponent from "../Components/TableComponent"

const columnInvoice:TableColumn<Invo>[]=[
    { key: "store", label: "Store",type:'string' },
    { key: "udF10", label: "UDF",type:'string' },
    {key:'price',label:'Giá',type:'string'},
    {key:"sumQty",label:"Số Lượng",type:'number'},
    { key: "priceDiscount", label: "Giảm Giá" ,type:'number'},
    { key: "totalMoney", label: "Thành Tiền",type:'number' },
   
  ]
export const RevenueCus=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const [phone,setPhone]=useState('')
    const [dataRevenueCus,setDataRevenueCus]=useState<Invo[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleClick=async()=>{
        setIsLoading(true);
        try{
            const res = await getRevenueCus(phone.toString());
            setDataRevenueCus(res)
           
          }
         catch (error) {
            addToast('Error fetching bill details:','danger')
         
        } finally {setIsLoading(false);}
    }
    return(
        <Container fluid>
                <Row><h2 style={{ textAlign:'center'}}>Khách Hàng</h2></Row>
                <Row className="d-flex justify-content-center align-items-center">
                <Col sm={3}><InputComponent type="text" value={phone} placeholder="Số điện thoại" onChange={setPhone}icon={<Telephone />}iconPosition="left"/></Col>
                <Col sm={3}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                    variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                {dataRevenueCus.length>0?(<TableComponent data={dataRevenueCus} columns={columnInvoice} />
                ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                )}
            </Row>
        </Container>
    )
}