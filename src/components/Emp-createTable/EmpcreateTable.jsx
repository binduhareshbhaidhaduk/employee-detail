import generateUniqueId from 'generate-unique-id';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import { getData, setData } from '../Services/Helper';
function EmpcreateTable() {
    const [inputState, setInputState] = useState({
        id: '',
        empName: '',
        empAge: '',
        empDepartment: '',
        empPosition: '',
        empSalary:'',
        empEmail:''
    });

    const [myemployee, setmyemployee] = useState(getData('employee'));
    
    const [isSubmit, setisSubmit] = useState(false);    
    const navigat = useNavigate();



    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputState({ ...inputState, [name]: value });

    }
    const handleSubmit = (e) => {
       e.preventDefault();

        let obj = {
            ...inputState,
            id: generateUniqueId({ length: 4, useLetters: false })
        }
        setisSubmit(true);
        setmyemployee([...myemployee, obj])
        }
        
        useEffect(() => {
            setData('employee',myemployee);
    
        console.log('hello');

    }, [myemployee])

    useEffect(() => {
        if (isSubmit) {
            console.log(isSubmit ,'hjdegfkj')
            navigat('/')
        }

    }, [isSubmit,navigat])

    return (
        <>
            <Container className='m-auto p-5'>

                <div className="row  ps-5">
                    <div className='d-flex justify-content-center form'>

                        <div className="col6 p-3">
                            <div className=' head '>
                                <h5 className='text-white p-3'>New Employee</h5>
                            </div>
                            <Form onSubmit={handleSubmit} className='p-3 '>
                                <Form.Control type="text" value={inputState.id} name='id' hidden />

                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'>
                                    <Form.Label className='d-flex'>
                                    Employee Name
                                    </Form.Label>
                                    <Form.Control type="text" onChange={handleInput} value={inputState.empName} name='empName' />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'>
                                    <Form.Label className='d-flex'>
                                        Employee Age
                                    </Form.Label>
                                    <Form.Control type="text" onChange={handleInput} value={inputState.empAge} name='empAge' />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'> 
                                    <Form.Label className='d-flex'>
                                        Employee Department
                                    </Form.Label>
                                    <Form.Control type="text" onChange={handleInput} value={inputState.empDepartment} name='empDepartment' />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'>
                                    <Form.Label className='d-flex'>
                                        Employee Position
                                    </Form.Label>
                                    <Form.Control type='text' aria-label="With textarea" onChange={handleInput} value={inputState.empPosition} name='empPosition' />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'> 
                                    <Form.Label className='d-flex'>
                                        Employee salary
                                    </Form.Label>
                                    <Form.Control type="text" onChange={handleInput} value={inputState.empSalary} name='empSalary' />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'> 
                                    <Form.Label className='d-flex'>
                                        Employee Email
                                    </Form.Label>
                                    <Form.Control type="text" onChange={handleInput} value={inputState.empEmail} name='empEmail' />
                                </Form.Group>

                                <Button className='btn btn-success' type="submit" >
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>

                </div>
            </Container>
        </>
    )
}

export default EmpcreateTable





