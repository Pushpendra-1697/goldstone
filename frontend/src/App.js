import './App.css';
import Users from './Components/Users';
import AddUser from './Components/AddUser';
import {Box} from '@chakra-ui/react';

function App() {
  return (
    <Box className="App">
      <Users />
      <AddUser />
    </Box>
  );
}

export default App;
