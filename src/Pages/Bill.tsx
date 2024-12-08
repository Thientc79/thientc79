import { useState } from "react";
import { Bi, BillInfo, getBill, getBillInfo, TableColumn } from "../Services/VfcService";
import { Col, Container, Row } from "react-bootstrap";
import MultiSelectComponent from "../Components/MultiSelectComponentold";
import DatePickerComponent from "../Components/DatePickerComponent";
import ButtonComponent from "../Components/ButtonComponent";
import { Search } from "react-bootstrap-icons";
import SpinnerComponent from "../Components/SpinnerComponent";
import TableComponent from "../Components/TableComponent";
import { ModalComponent } from "../Components/ModalComponent";

export const Bill=()=>{
    const [selectedMulti,setSelectedMulti]=useState<string[]>([])
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dataBill, setDataBill] = useState<Bi[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>([]);
    const [dataBillInfo,setDataBillInfo]=useState<BillInfo[]>([]);


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
      { key: 'invc_Sid', label: 'Actions', type: 'action', 
          renderAction: (invc_Sid) => (
            <button className="btn btn-primary btn-sm"onClick={() => openModal(invc_Sid)}>
             Chi Tiết
            </button>
          )
        },
    ]
  const columnBillInfo:TableColumn<BillInfo>[]=[
      //{key:"invc_No",label:"Hoá Đơn",type:"string"},
      {key:"upc",label:"UPC",type:"string"},
      {key:"description1",label:"MTK",type:"string"},
      {key:"price",label:"Giá",type:"string"},
      {key:"sumQty",label:"QTY",type:"number"},
      {key:"discamount",label:"Discount",type:"number"},
      {key:"totalMoney",label:"Total",type:"number"},
      {key:"coupon_No",label:"Code",type:"string"},
      {key:"discounT_PERCENT",label:"%",type:"string"},
  ]
    const handleClick=async()=>{
        const formattedDateTo:string= dateTo?.toLocaleDateString('en-GB')?? '';
        const formattedDateFrom:string= dateFrom?.toLocaleDateString('en-GB')?? '';
      
        setIsLoading(true);
        
        setError('');    // Reset lỗi
        try {
          
            const res = await getBill(selectedMulti.toString(),formattedDateFrom,formattedDateTo);
            console.log(res)
            setDataBill(res);  // Cập nhật dữ liệu vào state
         }
         
        catch (err) {
          setError('Failed to load ');
        } finally {
          setIsLoading(false);  // Hoàn tất việc tải dữ liệu
        }
    }
    const openModal=async(item:Bi)=>{
      setIsLoading(true);
    
      try{
       
        setSelectedItem(item);
        const res = await getBillInfo(item.invc_Sid.toString());
        setDataBillInfo(res)
        setShowModal(true);
      }
     catch (error) {
      console.error('Error fetching bill details:', error);
    } finally {setIsLoading(false);}
    }
    const closeModal=async()=>{setShowModal(false);
      setDataBillInfo([]);}
    return(
        <Container fluid>
            <Row><h2 style={{ textAlign:'center'}}>Tra Cứu Bill</h2></Row>
            <Row className="d-flex justify-content-center align-items-center">
                  <Col sm={3}><MultiSelectComponent placeholder="Chọn Cửa Hàng" selectedValues={selectedMulti} onChange={setSelectedMulti}/></Col>
                  <Col sm={3}><DatePickerComponent placeholder="Từ Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateFrom}onChange={setDateFrom}/></Col>
                  <Col sm={3}><DatePickerComponent placeholder="Đến Ngày"  dateFormat="dd/MM/yyyy" selectedDate={dateTo}onChange={setDateTo}/></Col>
                  <Col sm={3}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                        variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
              </Row>
              <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                  {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                  {dataBill.length>0?(<TableComponent data={dataBill} columns={columnBill} onRowPress={openModal}/>
                  ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}>Chưa có dữ liệu</h3>
                    )}
              </Row>
              {selectedItem && (<ModalComponent visible={showModal} onClose={closeModal} itemDetails={dataBillInfo} columns={columnBillInfo}/>)}
        </Container>
    )
}