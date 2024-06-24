import React, { useEffect, useState } from 'react';
import { getList , createList, deleteListById, deleteListByName,getListByLimit} from './Service';
const ListComponent = () => {
    const [limitedLists, setLimitedLists] = useState([]);
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [newListDescription, setNewListDescription] = useState('');
    const [newListLimit, setNewListLimit] = useState(0);
    const [limit, setLimit] = useState(0); 

  
    useEffect(() => {
        fetchLists();
    }, []);
 const fetchLists = async () => {
        try {
            console.log("Fetching lists...");
            const data = await getList();
            console.log("Lists fetched:", data);
            setLists(data);
        } catch (error) {
            console.error('Error fetching lists:', error);
        }
    };

    const handleCreateList = async () => {
        try {
            const newList = {
                name: newListName,
                description: newListDescription,
                limit: newListLimit,
                creationDate: new Date(),
                updatedDate: new Date(),
                list: []
            };
            await createList(newList);
            fetchLists();
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    const handleDeleteListById = async (id) => {
        try {
            const data=await getListByLimit(limit);
         console.log(data);
          setLists(data);
          fetchLists();
        } catch (error) {
            console.error('Error deleting list by id:', error);
        }
    };
const handleGetListByLimit = async () => {
    try {
        console.log('Getting lists by limit:', limit);
        const data = await getListByLimit(limit); // Fetch data by limit
        setLimitedLists(data); // Update state with fetched data
    } catch (error) {
        console.error('Error fetching lists by limit:', error);
    }
};
    const handleDeleteListByName = async (name) => {
        try {
            await deleteListByName(name);
            fetchLists();
        } catch (error) {
            console.error('Error deleting list by name:', error);
        }
    };

    return (
        <div>

            <h1>Lists</h1>
    <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        placeholder="Enter limit"
    />
   
    <button onClick={handleGetListByLimit}>Get Lists by Limit</button>

            <div>
                <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="New list name"
                />
                <input
                    type="text"
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    placeholder="New list description"
                />
                <input
                    type="number"
                    value={newListLimit}
                    onChange={(e) => setNewListLimit(e.target.value)}
                    placeholder="Limit"
                />
                <button onClick={handleCreateList}>Create List</button>
            </div>
            <ul>
                {lists.map((list) => (
                    <li key={list._id}>
                        <h2>{list.name}</h2>
                        <p>Description: {list.description}</p>
                        <p>Limit: {list.limit}</p>
                        <p>Creation Date: {new Date(list.creationDate).toLocaleString()}</p>
                        <p>Updated Date: {new Date(list.updatedDate).toLocaleString()}</p>דדקקקקקק
                        <ul>
                            {list.list.map((item, index) => (
                                <li key={index}>
                                    <p>App Name: {item.appName}</p>
                                    <p>Description: {item.description}</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => handleDeleteListById(list._id)}>Delete by ID</button>
                        <button onClick={() => handleDeleteListByName(list.name)}>Delete by Name</button>
                       
                    </li>
                ))}
            </ul>
            <h2>Limited Lists</h2>
            <ul>
                {limitedLists.map((list) => (
                    <li key={list._id}>
                        <h2>{list.name}</h2>
                        <p>Description: {list.description}</p>
                        <p>Limit: {list.limit}</p>
                        <p>Creation Date: {new Date(list.creationDate).toLocaleString()}</p>
                        <p>Updated Date: {new Date(list.updatedDate).toLocaleString()}</p>
                        <ul>
                            {list.list.map((item, index) => (
                                <li key={index}>
                                    <p>App Name: {item.appName}</p>
                                    <p>Description: {item.description}</p>
                                </li>
                            ))}
                        </ul>
                     </li>
                ))}
            </ul>
        </div>
    );
};

export default ListComponent;
