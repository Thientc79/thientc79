import { useContext, useState } from "react"
import { getMTK, MTK, TableColumn } from "../Services/VfcService"
import { StoreContext } from "../Services/StoreContext"
import { Col, Container, Row } from "react-bootstrap"
import TableComponent from "../Components/TableComponent"
import SpinnerComponent from "../Components/SpinnerComponent"
import ButtonComponent from "../Components/ButtonComponent"
import InputComponent from "../Components/InputComponent"
import RadioGroupComponent from "../Components/RadioGroupComponent"
import { QrCodeScan, Search } from "react-bootstrap-icons"
import { ToastContext } from "../Services/ToastContext"
const columnMtk:TableColumn<MTK>[]=[
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

export const Des=()=>{
    const {addToast,removeToast}=useContext(ToastContext)
    const {storeNo}=useContext(StoreContext)
    const [mtk,setMtk]=useState('')
    const [selectedRadio, setSelectedRadio] = useState<string>('3');
    const [dataMTK, setDataMTK] = useState<MTK[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleRadioChange = (value: string) => {setSelectedRadio(value);};
    const handleClick=async()=>{
        setIsLoading(true);
        switch(selectedRadio){ 
            case '1':{
              try {
                if(storeNo!=null){
                  const res = await getMTK(mtk,storeNo,'STORE');
                
                  setDataMTK(res);  // Cập nhật dữ liệu vào state
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
                const res = await getMTK(mtk,storeNo,'REGION');
                setDataMTK(res);  // Cập nhật dữ liệu vào state
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
              const res = await getMTK(mtk,'','');
              setDataMTK(res);  // Cập nhật dữ liệu vào state
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
            <Row><h2 style={{ textAlign:'center'}}>Tra Cứu MTK</h2></Row>
            <Row className="d-flex justify-content-center align-items-center">
                <Col sm={3}><InputComponent type="text" value={mtk} placeholder="Mã UPC" onChange={setMtk}icon={<QrCodeScan />}iconPosition="left"/></Col>
                <Col sm={4}><RadioGroupComponent selectedValue={selectedRadio}onChange={handleRadioChange}inline/></Col>
                <Col sm={3}><ButtonComponent onClick={handleClick} color="white" size="lg" backgroundColor='none'
                    variant="primary" icon={<Search/>}>Tra Cứu</ButtonComponent></Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center" style={{marginTop:20}}>
                {isLoading && <SpinnerComponent size="sm" variant="info" animation='border'/>}
                {dataMTK.length>0?(<TableComponent data={dataMTK} columns={columnMtk} />
                ):(<h3 style={{color:'red',alignItems:'center',justifyContent:'center',textAlign:'center'}}> Chưa có dữ liệu</h3>
                )}
            </Row>
            
        </Container>
    )
}
