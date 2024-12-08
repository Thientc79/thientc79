import { Container,Row,Col } from "react-bootstrap"
import MultiSelectComponent from "../Components/MultiSelectComponent"
import DatePickerComponent from "../Components/DatePickerComponent"
import ButtonComponent from "../Components/ButtonComponent"
import { Search } from "react-bootstrap-icons"
import { useContext, useState } from "react"
import { getSlips, getSlipsAll, getSlipsInfo, SlipInfo, Slips, TableColumn } from "../Services/VfcService"
import SpinnerComponent from "../Components/SpinnerComponent"
import TableComponent from "../Components/TableComponent"
import { ModalComponent } from "../Components/ModalComponent"
import { ToastContext } from "../Services/ToastContext"
import { StoreContext } from "../Services/StoreContext"


export const SlipsPage=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const {dataStores,dataStoresAll}=useContext(StoreContext)
    const [selectedStoreOut, setSelectedStoreOut] = useState<string[]>([]);
    const [selectedStoreIn, setSelectedStoreIn] = useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataSlips, setDataSlips] = useState<Slips[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>([]);
    const [dataSlipInfo,setDataSlipInfo]=useState<SlipInfo[]>([]);
    const columnSlips:TableColumn<Slips>[]=[
        { key: "slip_No", label: "Slip",type:'string' },
        { key: "out_Store", label: "Xuất",type:'string' },
        {key:'in_Store',label:'Nhập',type:'string'},
        {key:'createdSlip',label:'Ngày Xuất',type:'Date'},
        {key:"sumQty",label:"QTY",type:'number'},
        { key: "createdvoucher", label: "Ngày Nhập" ,type:'Date'},
        { key: "status", label: "Note",type:'string' },
        
        { key: 'slip_Sid', label: 'Actions', type: 'action', 
            renderAction: (slip_Sid) => (
              <button className="btn btn-primary btn-sm"onClick={() => openModal(slip_Sid)}>
               Chi Tiết
              </button>
            )
          },
      ]
      const columnSlipInfo:TableColumn<SlipInfo>[]=[
        {key:"slip_No",label:"Phiếu Xuất",type:"string"},
        {key:"upc",label:"UPC",type:"string"},
        {key:"description1",label:"MTK",type:"string"},
        {key:"price",label:"Giá",type:"string"},
        {key:"sumQty",label:"QTY",type:"number"},
        {key:"note",label:"Note",type:"string"},
      
    ]
    const handleClick=async()=>{
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
        setIsLoading(true);
        setError('');    // Reset lỗi

        if(selectedStoreIn.toString()==''){
            try {
          
                const res = await getSlipsAll(selectedStoreOut.toString(),formattedDateFrom,formattedDateTo);
              
                setDataSlips(res);  // Cập nhật dữ liệu vào state
             }
             
            catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
        }
        else{
            try {
          
                const res = await getSlips(selectedStoreOut.toString(),selectedStoreIn.toString(),formattedDateFrom,formattedDateTo);
                console.log(res)
                setDataSlips(res);  // Cập nhật dữ liệu vào state
             }
             
            catch (err) {
              setError('Failed to load ');
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
        }
    }
    const openModal=async(item:Slips)=>{
        setIsLoading(true);
    
        try{
         
          setSelectedItem(item);
          const res = await getSlipsInfo(item.slip_Sid.toString());
          setDataSlipInfo(res)
          setShowModal(true);
        }
       catch (error) {
        addToast("Có lỗi khi kết nối","danger")
      } finally {setIsLoading(false);}
    }
    const closeModal=async()=>{setShowModal(false);
        setDataSlipInfo([]);}
    return(
        <Container fluid>
            <Row><h2 style={{ textAlign:'center'}}>Phiếu Xuất</h2></Row>
             <Row className="d-flex justify-content-center align-items-center">
                  <Col sm={3}><MultiSelectComponent placeholder="Cửa Hàng Xuất" selectedValues={selectedStoreOut} onChange={setSelectedStoreOut}dataStores={dataStores}/></Col>
                  <Col sm={3}><MultiSelectComponent placeholder="Cửa Hàng Nhận" selectedValues={selectedStoreIn} onChange={setSelectedStoreIn}dataStores={dataStoresAll}/></Col>
                  <Col sm={2}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
            <     Col sm={2}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
                  <Col sm={2}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                        variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                  {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                  {dataSlips.length>0?(<TableComponent data={dataSlips} columns={columnSlips} onRowPress={openModal}/>
                  ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                  )}
              </Row>
              {selectedItem && (<ModalComponent visible={showModal} onClose={closeModal} itemDetails={dataSlipInfo} columns={columnSlipInfo}/>)}
        </Container>
    )
}