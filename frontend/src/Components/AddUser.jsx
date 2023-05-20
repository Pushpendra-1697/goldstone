import React, { useEffect, useState } from 'react';
import { Box, Input, Alert, AlertIcon, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUsers } from '../redux/User/user.action';
import { BiLoaderCircle } from "react-icons/bi";
import UserList from './UserList';


const init = {
    name: '',
    email: '',
    gender: "",
    status: ''
};
var totalPages = 10;
const AddUser = () => {
    const [formData, setFormData] = useState(init);
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((store) => store.userManager);
    const [page, setPage] = useState(1);
    const [userGender, setUserGender] = useState('');

    useEffect(() => {
        dispatch(getUsers(page, userGender));
    }, [page, userGender]);



    const handlePage = (val) => {
        let value = val + page;
        setPage(value);
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData));
        setFormData({
            name: '',
            email: '',
            gender: "",
            status: ''
        });
    };


    const { name, email, gender, status } = formData;
    return (
        <Box mt='2%'>

            <Box>
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: "column" }}>
                    <Input placeholder="Enter Name" w="300px" onChange={handleChange} value={name} name="name" type="text" />
                    <Input placeholder="Enter Email" w="300px" onChange={handleChange} value={email} name="email" type="text" />
                    <select style={{ width: "300px" }} onChange={handleChange} name='gender' value={gender}>
                        <option value={""}>Select Gender</option>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                    </select>

                    <select style={{ width: "300px" }} onChange={handleChange} name='status' value={status}>
                        <option value={""}>Select Status</option>
                        <option value={"active"}>Active</option>
                        <option value={"inactive"}>Inactive</option>
                    </select>

                    <Input bg="blue" color="white" w="300px" type='submit' value="Add User" />
                </form>
            </Box>


            {/* Filter By Event Name */}
            <Box display={"flex"} justifyContent={"space-evenly"} m={{ base: "10% 0", sm: "10% 0", md: "3% 0", xl: "3% 0", "2xl": "3% 0" }}>
                <select onChange={(e) => setUserGender(e.target.value)}>
                    <option value={''}>Select Gender</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                </select>
            </Box>


            {loading && (
                <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                    {" "}
                    <BiLoaderCircle fontSize={"34px"} />{" "}
                </Box>
            )}
            {error && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                <Alert status='error' w="300px" >
                    <AlertIcon />
                    {`Something went Wrong 😒`}
                </Alert>
            </Box>}


            <UserList users={users} />

            {/* Pagination */}
            <Box display={"flex"} alignItems="center" justifyContent={"center"} m={["6% 0", "6% 0", "3% 0"]} gap={"5px"}>
                <Button variant={"outline"} color="green" onClick={() => setPage(1)}>First</Button>
                <Button variant={"outline"} color="green" isDisabled={page <= 1} onClick={() => handlePage(-1)}>◀️PRE</Button>
                <Button variant={"outline"} color="red" isDisabled={true}>{page}</Button>
                <Button variant={"outline"} color="green" isDisabled={page >= totalPages} onClick={() => handlePage(1)}>NEXT▶️</Button>
                <Button variant={"outline"} color="green" onClick={() => setPage(totalPages)}>Last</Button>
            </Box>
        </Box>
    )
}

export default AddUser