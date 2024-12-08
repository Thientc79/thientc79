import { Col, Container, Row } from "react-bootstrap"
import { getVouchers, getVouchersAll, getVouchersInfo, TableColumn, VoucherInfo, Vouchers } from "../Services/VfcService";
import { useContext, useState } from "react";
import MultiSelectComponent from "../Components/MultiSelectComponent";
import DatePickerComponent from "../Components/DatePickerComponent";
import ButtonComponent from "../Components/ButtonComponent";
import { Search } from "react-bootstrap-icons";
import SpinnerComponent from "../Components/SpinnerComponent";
import TableComponent from "../Components/TableComponent";
import { ModalComponent } from "../Components/ModalComponent";
import { ToastContext } from "../Services/ToastContext";
import { StoreContext } from "../Services/StoreContext";


export const VouchersPage=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const {dataStores,dataStoresAll}=useContext(StoreContext)
    const [selectedStoreOut, setSelectedStoreOut] = useState<string[]>([]);
    const [selectedStoreIn, setSelectedStoreIn] = useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataVouchers, setDataVouchers] = useState<Vouchers[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>([]);
    const [dataVoucherInfo,setDataVoucherInfo]=useState<VoucherInfo[]>([]);
    const handleClick=async()=>{
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
        setIsLoading(true);
        setError('');    // Reset lỗi
        if(selectedStoreOut.toString()==''){
            try {
          
                const res = await getVouchersAll(selectedStoreIn.toString(),formattedDateFrom,formattedDateTo);
               
                setDataVouchers(res);  // Cập nhật dữ liệu vào state
             }
             
            catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
        }
        else{
            try {
          
                const res = await getVouchers(selectedStoreIn.toString(),selectedStoreOut.toString(),formattedDateFrom,formattedDateTo);
                console.log(res)
                setDataVouchers(res);  // Cập nhật dữ liệu vào state
             }
             
            catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
              setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
        }
    }
    const columnVouchers:TableColumn<Vouchers>[]=[
        { key: "inStore", label: "Cửa Hàng Nhâp",type:'string' },
        { key: "outStore", label: "Cửa Hàng Xuất",type:'string' },
        {key:'voucherNo',label:'Phiếu Nhập',type:'string'},
        {key:'created',label:'Ngày Nhập',type:'Date'},
        {key:"sumQty",label:"QTY",type:'number'},
        { key: 'voucherSid', label: 'Actions', type: 'action', 
            renderAction: (voucherSid) => (
              <button className="btn btn-primary btn-sm"onClick={() => openModal(voucherSid)}>
               Chi Tiết
              </button>
            )
          },
      ]
      const columnVoucherInfo:TableColumn<VoucherInfo>[]=[
        {key:"voucher_No",label:"Phiếu Nhập",type:"string"},
        {key:"upc",label:"UPC",type:"string"},
        {key:"description1",label:"MTK",type:"string"},
        {key:"price",label:"Giá",type:"string"},
        {key:"sumQty",label:"QTY",type:"number"},
        {key:"totalMoney",label:"Note",type:"number"},
      
    ]
    const openModal=async(item:Vouchers)=>{
        setIsLoading(true);
    
        try{
         
          setSelectedItem(item);
          const res = await getVouchersInfo(item.voucherSid.toString());
         
          setDataVoucherInfo(res)
          setShowModal(true);
        }
       catch (error) {
        addToast("Có lỗi khi kết nối","danger")
      } finally {setIsLoading(false);}
    }
    const closeModal=async()=>{
        setShowModal(false);
        setDataVoucherInfo([]);}
    return (
        <Container fluid>
            <Row><h2 style={{ textAlign:'center'}}>Phiếu Nhập </h2></Row>
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
                    {dataVouchers.length>0?(<TableComponent data={dataVouchers} columns={columnVouchers} />
                    ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                    )}
            </Row>
                {selectedItem && (<ModalComponent visible={showModal} onClose={closeModal} itemDetails={dataVoucherInfo} columns={columnVoucherInfo}/>)}
        </Container>
    )
}