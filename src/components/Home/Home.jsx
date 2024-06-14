import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getData } from '../Services/Helper';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';


function Home() {

    const navigat = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [viewemployee, setViewemployee] = useState(getData('employee'));
    const [search, setSearch] = useState('');

    // eslint-disable-next-line no-unused-vars
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    const [selectedDepartment, setSelectedDepartment] = useState('');


    const handleEdit = (id) => {
        console.log('====================================');
        navigat(`/edit/${id}`);
    };

    console.log(viewemployee, "gdffdfdg");


    const handleDelete = (id) => {
        const deleteData = viewemployee.filter(item => item.id !== id);
        setViewemployee(deleteData);
        localStorage.setItem('employee', JSON.stringify(deleteData));
    }


    // search
    const handleSearch = (e) => {
        setSearch(e.target.value);
        const data = getData('employee');
        const searchData = data.filter(item =>
            item.empName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setViewemployee(searchData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = getData('employee');
        const searchData = data.filter(item =>
            item.empName.toLowerCase().includes(search.toLowerCase())
        );
        setViewemployee(searchData);
    }
    //filtering

    const handleDepartmentChange = (e) => {
        const department = e.target.value;
        setSelectedDepartment(department);  

        // Get all employees and filter based on selected department
        const employees = getData('employee');
        const filteredEmployees = department ? employees.filter(emp => emp.empDepartment === department) : [...employees];

        console.log('Filtered Employees:', filteredEmployees);
        setViewemployee(filteredEmployees);
    };

    const departments = [...new Set(getData('employee').map(emp => emp.empDepartment))];
    return (
        <>
            <Container className='p-3'>
                <div className='p-2 d-flex head  text-light justify-content-between '>
                    <h4 className='p-1 m-0'>Employee Table</h4>
                    <select onChange={handleDepartmentChange} value={selectedDepartment}>
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                    <div className='d-flex'>
                        <Form.Control
                            type="text"
                            name='price'
                            placeholder='Search'
                            value={search}
                            onChange={handleSearch}
                        />
                        <button
                            type='submit'
                            className='btn btn-light'
                            onClick={handleSubmit}
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>

                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Employee Id </th>
                            <th>Employee Name </th>
                            <th>Employee Age </th>
                            <th>Employee Department </th>
                            <th>Employee Position </th>
                            <th>Employee Salary </th>
                            <th>Employee Email </th>
                            <th>Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {

                            viewemployee.map(data => (
                                <>

                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.empName}</td>
                                        <td>{data.empAge}</td>
                                        <td>{data.empDepartment}</td>
                                        <td>{data.empPosition}</td>
                                        <td>{data.empSalary}</td>
                                        <td>{data.empEmail}</td>

                                        <td className='d-flex justify-content-around'>
                                            <button type='submit' className='btn text-warning' onClick={() => handleEdit(data.id)}><i className="bi bi-pencil-square fs-4"></i></button>
                                            <button type='submit' className='btn text-danger' onClick={() => handleDelete(data.id)}><i className="bi bi-trash3 fs-4"></i></button>
                                        </td>

                                    </tr>

                                </>
                            ))
                        }





                    </tbody>

                </Table >

            </Container >
        </>
    )
}

export default Home