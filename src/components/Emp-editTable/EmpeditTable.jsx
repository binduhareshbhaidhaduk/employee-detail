import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Button, Col, Form } from 'react-bootstrap';
import { getData, setData } from '../Services/Helper';

function EmpeditTable() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputState, setInputState] = useState({
        id: '',
        empName: '',
        empAge: '',
        empDepartment: '',
        empPosition: '',
        empSalary:'',
        empEmail:''
    });
    const [myemployee, setMyemployee] = useState(getData('employee'));
    const [isSubmit, setIsSubmit] = useState(false);

    
    useEffect(() => {
        const employee = myemployee.find(p => p.id === id);
        if (employee) {
            setInputState(employee);
        }
    }, [id, myemployee]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputState({ ...inputState, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedemployee = myemployee.map(p =>
            p.id === id ? { ...p, ...inputState } : p
            );
        console.log('nslki',updatedemployee);
        setMyemployee(updatedemployee);
        setIsSubmit(true);
        getData('employee', updatedemployee);  
    };
    

    useEffect(() => {
        if (isSubmit) {
            setData('employee', myemployee);
            navigate('/');
        }
    }, [isSubmit, myemployee, navigate]);

    return (
        <Container className='m-auto p-5'>
            <div className="row ps-5">
                <div className='d-flex justify-content-center form'>
                    <div className="col6 p-3">
                        <div className='head'>
                            <h5 className='text-white p-3'>Edit employee details</h5>
                        </div>
                        <Form onSubmit={handleSubmit} className='p-3 '>
                            <Form.Control type="text" value={inputState.id} name='id' hidden />

                            <Form.Group as={Col} controlId="formGridTitle" className='d-flex p-1 fs-6'>
                                <Form.Label className='d-flex'>Employee Name</Form.Label>
                                <Form.Control type="text" onChange={handleInput} value={inputState.empName} name='empName' />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPrice" className='d-flex p-1 fs-6'>
                                <Form.Label className='d-flex'>Employee Age</Form.Label>
                                <Form.Control type="text" onChange={handleInput} value={inputState.empAge} name='empAge' />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCategories" className='d-flex p-1 fs-6'>
                                <Form.Label className='d-flex'>Employee Department</Form.Label>
                                <Form.Control type="text" onChange={handleInput} value={inputState.empDepartment} name='empDepartment' />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDescription" className='d-flex p-1 fs-6'>
                                <Form.Label className='d-flex'>Employee Position</Form.Label>
                                <Form.Control type="text" onChange={handleInput} value={inputState.empPosition} name='empPosition' />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPrice" className='d-flex p-1 fs-6'>
                                <Form.Label className='d-flex'>Employee Salary</Form.Label>
                                <Form.Control type="text" onChange={handleInput} value={inputState.empSalary} name='empSalary' />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTitle" className='d-flex p-1 fs-6'>
                                <Form.Label className='d-flex'>Employee Email</Form.Label>
                                <Form.Control type="text" onChange={handleInput} value={inputState.empEmail} name='empEmail' />
                            </Form.Group>
                            <Button className='btn btn-success' type="submit">Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default EmpeditTable;

