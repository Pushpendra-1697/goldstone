import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '../redux/User/user.action';

const init = {
    name: '',
    email: '',
    gender: "",
    status: ''
};
const UserList = ({ users }) => {
    const [formData, setFormData] = useState(init);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userId, setUserId] = useState('');
    const dispatch = useDispatch();


    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleUpdate = (_id) => {
        setUserId(_id);
        onOpen();
    };
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(userId, formData));
        setFormData({
            name: '',
            email: '',
            gender: "",
            status: ''
        });
    };

    const handleRemove = (_id) => {
        dispatch(deleteUser(_id));
    };

    const { name, email, gender, status } = formData;
    return (
        <>
            <TableContainer mt={["15%", "15%", "0%"]}>
                <Table size='sm' variant={"striped"}>
                    <Thead>
                        <Tr>
                            <Th>User Name</Th>
                            <Th>User Email</Th>
                            <Th>Gender</Th>
                            <Th>Status</Th>
                            <Th>Update</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users && users.map(({ _id, name, email, gender, status }) =>
                            <Tr key={_id}>
                                <Td>{name}</Td>
                                <Td>{email}</Td>
                                <Td>{gender}</Td>
                                <Td>{status}</Td>
                                <Td><Button onClick={() => handleUpdate(_id)}><AiFillEdit /></Button></Td>
                                <Td><Button onClick={() => handleRemove(_id)}><AiFillDelete /></Button></Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>




            <Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>User Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
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

                                    <Input bg="blue" color="white" w="300px" type='submit' value="Update User" />
                                </form>
                            </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

        </>


    )
}

export default UserList;