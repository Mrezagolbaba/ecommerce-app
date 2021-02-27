import {Form} from "react-bootstrap";

export function Input(props) {
    return (
        <Form.Group controlId="formBasicEmail">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                readOnly={props.onChange}
            />
            <Form.Text className="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    );
};