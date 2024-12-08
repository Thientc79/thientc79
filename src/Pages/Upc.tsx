import { Col, Container, Row } from "react-bootstrap"
import InputComponent from "../Components/InputComponent"
import { useContext, useState } from "react"
import { UpcScan,Search } from "react-bootstrap-icons"
import CheckboxComponent from "../Components/CheckboxComponent"
import RadioGroupComponent from "../Components/RadioGroupComponent"
import ButtonComponent from "../Components/ButtonComponent"
import { getUpc, TableColumn, UPC } from "../Services/VfcService"
import TableComponent from "../Components/TableComponent"
import { StoreContext } from "../Services/StoreContext"
import SpinnerComponent from "../Components/SpinnerComponent"
import { ToastContext } from "../Services/ToastContext"


 const columnUpc:TableColumn<UPC>[]=[
    { key: "store_Code", label: "Cửa Hàng",type:'string' },
    { key: "upc", label: "UPC",type:'string' },
    {key:'description1',label:'MTK',type:'string'},
    {key:"description2",label:"Des",type:'string'},
    { key: "siz", label: "Size" ,type:'string'},
    { key: "attr", label: "attr",type:'string' },
    { key: "price", label: "Giá" ,type:'string'},
    { key: "qty", label: "QTY",type:'number' },
    { key: "region_Name", label: "Khu Vực",type:'string' },
  ]
export const Upc=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const {storeNo}=useContext(StoreContext)
    const [upc,setUpc]=useState('')
    const [isChecked, setIsChecked] = useState(true);
    const [selectedRadio, setSelectedRadio] = useState<string>('3');
    const [dataUPC, setDataUPC] = useState<UPC[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleCheckboxChange = (checked: boolean) => {setIsChecked(checked);};
    const handleRadioChange = (value: string) => {setSelectedRadio(value);};
    const handleClick=async()=>{
        setIsLoading(true);
        switch(selectedRadio){ 
            case '1':{
              try {
                if(storeNo!=null){
                  const res = await getUpc(upc,storeNo,'STORE',isChecked);
                
                  setDataUPC(res);  // Cập nhật dữ liệu vào state
                }else{addToast("Không có dữ liệu cửa hàng","danger")}
               
              } catch (err) {
                setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
              } finally {
                setIsLoading(false);  // Hoàn tất việc tải dữ liệu
              }
              break;
          }
          case '2':{
            try {
              if(storeNo!=null){
                const res = await getUpc(upc,storeNo,'REGION',isChecked);
                setDataUPC(res);  // Cập nhật dữ liệu vào state
              }else{addToast("Không có dữ liệu cửa hàng","danger")}
             
            } catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
                setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
            break;
        
          }
          case '3':{
            try {
              const res = await getUpc(upc,'','',isChecked);
              setDataUPC(res);  // Cập nhật dữ liệu vào state
            } catch (err) {
              setError('Failed to load ');addToast("Có lỗi khi kết nối","danger")
            } finally {
                setIsLoading(false);  // Hoàn tất việc tải dữ liệu
            }
            break;
          }
         
          }
    }
    return(
        <Container fluid >
          <Row><h2 style={{ textAlign:'center'}}>Tra Cứu UPC</h2></Row>
          <Row className="d-flex justify-content-center align-items-center">
              <Col sm={3}><InputComponent type="text" value={upc} placeholder="Mã UPC" onChange={setUpc}icon={<UpcScan />}iconPosition="left"/></Col>
              <Col sm={2}><CheckboxComponent id="upc-checkbox"label="Chính Xác"checked={isChecked}onChange={handleCheckboxChange}/></Col>
              <Col sm={4}><RadioGroupComponent selectedValue={selectedRadio}onChange={handleRadioChange}inline/></Col>
              <Col sm={2}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                  variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
            </Row>
          <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
              {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
              {dataUPC.length>0?(<TableComponent data={dataUPC} columns={columnUpc} />
                ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                )}
          </Row>
        </Container>
    )
}