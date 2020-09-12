import React from 'react';
import axios from 'axios';
import UserTable from './UserTable';

const requester = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

const App = () => {
  const [users, setUsers] = React.useState([]);
  
  // fetch & set users
  React.useEffect(() => {
    (async function() {
      const { data } = await requester.get('/users');
      setUsers(data.users);
    }());
  }, []);

  const handleDelete = React.useCallback(id => {
    (async function() {
      try {
        await requester.delete(`/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        alert(err);
      }
    }());
  }, [users])

  return (
    <UserTable
      users={users}
      onDelete={handleDelete}
    />
  );
}

export default App;
