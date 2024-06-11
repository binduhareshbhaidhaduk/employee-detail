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

    // sorting

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...viewemployee].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setViewemployee(sortedData);

    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return <i className="bi bi-arrow-down-up sort-icon"></i>;
        }
        if (sortConfig.direction === 'ascending') {
            return <i className="bi bi-arrow-up sort-icon"></i>;
        }
        return <i className="bi bi-arrow-down sort-icon"></i>;
    };

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
        const data = getData('product');
        const searchData = data.filter(item =>
            item.empName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setViewemployee(searchData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = getData('product');
        const searchData = data.filter(item =>
            item.empName.toLowerCase().includes(search.toLowerCase())
        );
        setViewemployee(searchData);
    }

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
        const filteredEmployees = selectedDepartment 
            ? getData('employee').filter(emp => emp.empDepartment === e.target.value)
            : getData('employee');
        setViewemployee(filteredEmployees);
    };

    const departments = Array.from(new Set(viewemployee.map(emp => emp.empDepartment)));
    return (
        <>
            <Container className='p-3'>
                <div className='p-2 d-flex head  text-light justify-content-between '>
                    <h4 className='p-1 m-0'>Employee Table</h4>
                    <select
                        className='form-select '
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                    >
                        <option value="">All Departments</option>
                        {departments.map(department => (
                            <option key={department} value={department}>{department}</option>
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
                            {/* <th>Employee Id </th>
                            <th>Employee Name </th>
                            <th>Employee Age </th>
                            <th>Employee Department </th>
                            <th>Employee Position </th>
                            <th>Employee Salary </th>
                            <th>Employee Email </th>
                            <th>Action</th> */}

                            <th onClick={() => handleSort('id')}>Employee Id {getSortIcon('id')}</th>
                            <th onClick={() => handleSort('empName')}>Employee Name {getSortIcon('empName')}</th>
                            <th onClick={() => handleSort('empAge')}>Employee Age {getSortIcon('empAge')}</th>
                            <th onClick={() => handleSort('empDepartmen')}>Employee Department {getSortIcon('empDepartmen')}</th>
                            <th onClick={() => handleSort('empPosition')}>Employee Position {getSortIcon('empPosition')}</th>
                            <th onClick={() => handleSort('empSalary')}>Employee Salary {getSortIcon('empSalary')}</th>
                            <th onClick={() => handleSort('empEmail')}>Employee Email {getSortIcon('empEmail')}</th>
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