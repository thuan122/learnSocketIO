import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import Input from './components/Input/Input'
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [data, setData] = useState({
    name: "",
    age: "",
    balance: ""
  });
  const [dataList, setDataList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000/")
    setSocket(newSocket)

    newSocket.on("connect", () => {
      console.log("Connected to server with ID:", newSocket.id)
    })

    newSocket.on("listData", (listData) => {
      setDataList(listData)
    })

    // Clean up on unmount
    return () => {
      newSocket.disconnect()
    }
  }, [])

  const resetForm = () => {
    setData({
      name: "",
      age: "",
      balance: ""
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!data.name || !data.age || !data.balance) {
      alert("Please fill in all fields");
      return;
    }

    if (isEditing && editId !== null) {
      socket.emit("updateData", { id: editId, ...data });
    } else {
      socket.emit("data", data);
    }

    resetForm();
  };

  const handleEdit = (editData) => {
    setData(editData);
    setIsEditing(true);
    setEditId(editData.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      socket.emit("deleteData", id);
    }
  };

  return (
    <>
      <h1>CRUD Operations</h1>

      {dataList.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{parseFloat(item.balance).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No data submitted yet.</p>
      )}

      <Input
        name="name"
        handleInput={handleInput}
        placeholder="Enter your name"
        className="input-field"
        value={data.name}
      />
      <Input
        name="age"
        type="number"
        handleInput={handleInput}
        placeholder="Enter your age"
        className="input-field"
        value={data.age}
      />
      <Input
        name="balance"
        type="number"
        handleInput={handleInput}
        placeholder="Enter your balance"
        className="input-field"
        value={data.balance}
      />


      <div>
        <button
          onClick={handleSubmit}
        >
          {isEditing ? 'Update' : 'Submit'}
        </button>
        {isEditing && (
          <button
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </div>
    </>
  )
}

export default App
