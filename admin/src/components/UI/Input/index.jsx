import {Form} from "react-bootstrap";
import './styles.css'
export function Input(props) {
    return (
        <Form.Group className='input-component'>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <Form.Text className="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    );
};