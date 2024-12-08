import { useContext, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { ToastContext } from "../Services/ToastContext"
import { People, Search, Telephone } from "react-bootstrap-icons"
import InputComponent from "../Components/InputComponent"
import ButtonComponent from "../Components/ButtonComponent"
import SpinnerComponent from "../Components/SpinnerComponent"
import TableComponent from "../Components/TableComponent"
import { Cust, getCustomer, TableColumn,Bi, getBillCus } from "../Services/VfcService"
import { ModalComponent } from "../Components/ModalComponent"


export const Customers=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const [phone,setPhone]=useState('')
    const [dataCus,setDataCus]=useState<Cust[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>([]);
    const [dataBill,setDataBill]=useState<Bi[]>([]);
    const columnCus:TableColumn<Cust>[]=[     
            {key:"title",label:"Title",type:"string"},
            {key:"fullName",label:"Họ và Tên",type:"string"},
            {key:"phone",label:"Điện Thoại",type:"string"},
            {key:"dOB",label:"Ngày Sinh",type:"Date"},
            {key:"address",label:"Địa Chỉ",type:"string"},
            {key:"action",label:"Action",type:"action",
                renderAction: (phone) => (
                    <button className="btn btn-primary btn-sm"onClick={() => openModal(phone)}>
                     Chi Tiết
                    </button>
                  )
            }
    ]
    const columnBill:TableColumn<Bi>[]=[
        { key: "store", label: "Store",type:'string' },
        { key: "invoice_No", label: "Bill",type:'string' },
        {key:'created_Date',label:'Ngày',type:'Date'},
        {key:'emp_Name',label:'KH',type:'string'},
        {key:"emp_Phone",label:"Phone",type:'string'},
        { key: "sumQty", label: "Qty" ,type:'number'},
        { key: "totalMoney", label: "Total",type:'number' },
        { key: "discamount", label: "Giảm" ,type:'number'},
        { key: "note", label: "NOTE",type:'string' },
       
      ]

    const handleClick=async()=>{
        setIsLoading(true);
        try{
            const res = await getCustomer(phone.toString());
            setDataCus(res)
           
          }
         catch (error) {
            addToast('Error fetching bill details:','danger')
         
        } finally {setIsLoading(false);}
    }
    const openModal=async(item:Cust)=>{
        setIsLoading(true);
      
        try{
         
          setSelectedItem(item);
          const res = await getBillCus(item.phone);
          setDataBill(res)
          setShowModal(true);
        }
       catch (error) {
        console.error('Error fetching bill details:', error);
      } finally {setIsLoading(false);}
      }
      const closeModal=async()=>{
        setShowModal(false);
        setDataBill([]);
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
                {dataCus.length>0?(<TableComponent data={dataCus} columns={columnCus} />
                ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                )}
            </Row>
            {selectedItem && (<ModalComponent visible={showModal} onClose={closeModal} itemDetails={dataBill} columns={columnBill}/>)}
        </Container>
    )
}