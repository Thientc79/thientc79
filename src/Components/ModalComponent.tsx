import { Button, Container, Modal } from "react-bootstrap";
import { TableColumn } from "../Services/VfcService";
import TableComponent from "./TableComponent";


interface ModalProps<T>{ 
    visible:boolean,
    onClose:()=>void,
    itemDetails:T[],
    columns: TableColumn<T>[];
  }

  export const ModalComponent=<T,>({visible,onClose,itemDetails,columns}:ModalProps<T>)=>{
    return (
        <Modal show={visible} onHide={onClose}  size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>Hoá Đơn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TableComponent data={itemDetails} columns={columns} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
  }