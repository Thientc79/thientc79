import { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { Asn, getAsn, getSlipsInfo, SlipInfo, TableColumn } from "../Services/VfcService";
import { ModalComponent } from "../Components/ModalComponent";
import TableComponent from "../Components/TableComponent";
import { Search } from "react-bootstrap-icons";
import SpinnerComponent from "../Components/SpinnerComponent";
import ButtonComponent from "../Components/ButtonComponent";
import DatePickerComponent from "../Components/DatePickerComponent";
import MultiSelectComponent from "../Components/MultiSelectComponentold";
import { ToastContext } from "../Services/ToastContext";


export const AsnPage=()=>{
     const {addToast,removeToast}=useContext(ToastContext)
    const [selectedStore,setSelectStore]=useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataAsn, setDataAsn] = useState<Asn[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>([]);
    const [dataSlipInfo,setDataSlipInfo]=useState<SlipInfo[]>([]);
    const columnAsn:TableColumn<Asn>[]=[
    {key:"asnNo",label:"ASN",type:"string"},
    {key:"slipNo",label:"Xuất",type:"string"},
    {key:"storeIn",label:"Cửa Hàng Nhận",type:"string"},
    {key:"storeOut",label:"Cửa Hàng Xuất",type:"string"},
    {key:"createdSlip",label:"Ngày Xuất",type:"Date"},
    {key:"sumQty",label:"QTY",type:"number"},
    {key:"totalMoney",label:"Total",type:"number"},
    {key:"slip_Sid",label:"Actions",type:"action",
        renderAction: (slip_Sid) => (
            <button className="btn btn-primary btn-sm"onClick={() => openModal(slip_Sid)}>
             Chi Tiết
            </button>
          )
    }
    ]
    const columnSlipInfo:TableColumn<SlipInfo>[]=[
        {key:"slip_No",label:"Phiếu Xuất",type:"string"},
        {key:"upc",label:"UPC",type:"string"},
        {key:"description1",label:"MTK",type:"string"},
        {key:"price",label:"Giá",type:"string"},
        {key:"sumQty",label:"QTY",type:"number"},
        {key:"note",label:"Note",type:"string"},
      
    ]
    const openModal=async(item:Asn)=>{
        setIsLoading(true);
    
        try{
         
          setSelectedItem(item);
          const res = await getSlipsInfo(item.slip_Sid.toString());
          setDataSlipInfo(res)
          setShowModal(true);
        }
       catch (error) {
        addToast('Có lỗi khi tải ','danger')
      } finally {setIsLoading(false);}
    }
    const closeModal=async()=>{
        setShowModal(false);
        setDataSlipInfo([]);
    }
    const handleClick=async()=>{
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
        setIsLoading(true);
        setError('');    
            try {
              const res = await getAsn(selectedStore.toString(),formattedDateFrom,formattedDateTo);
              setDataAsn(res);  
             }
             
            catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
       
    }
    return (
        <Container fluid>
          <Row><h2 style={{ textAlign:'center'}}>Tra Cứu ASN</h2></Row>
          <Row className="d-flex justify-content-center align-items-center">
              <Col sm={3}><MultiSelectComponent placeholder="Cửa Hàng" selectedValues={selectedStore} onChange={setSelectStore}/></Col>
              <Col sm={3}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
              <Col sm={3}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
              <Col sm={3}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                    variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
            {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
            {dataAsn.length>0?(<TableComponent data={dataAsn} columns={columnAsn} onRowPress={openModal}/>
            ):(
           <h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}>Chưa có dữ liệu</h3>
            )}
          </Row>
            {selectedItem && (<ModalComponent visible={showModal} onClose={closeModal} itemDetails={dataSlipInfo} columns={columnSlipInfo}/>)}
        </Container>
    )
}