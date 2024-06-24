import React, { useEffect, useState } from 'react';
import { getList , createList, deleteListByName,getListByLimit,getListByName} from './Service';
const ListComponent = () => {
    const [limitedLists, setLimitedLists] = useState([]);
    const [namesLists,setNamesLists]=useState([]);
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

const handleGetListByLimit = async () => {
    try {
        console.log('Getting lists by limit:', limit);
        const data = await getListByLimit(limit); 
        setLimitedLists(data); 
    } catch (error) {
        console.error('Error fetching lists by limit:', error);
    }
};
// const handleGetListByName = async () => {
//     try {
//         console.log('Getting lists by name:', name);
//         const data = await getListByName(name);
//         setNamesLists(data);
//     } catch (error) {
//         console.error('Error fetching lists by name:', error);
//     }
// };
//    const handleDeleteListByName = async (name) => {
//         try {
//             await deleteListByName(name);
//             fetchLists();
//         } catch (error) {
//             console.error('Error deleting list by name:', error);
//         }
//     };

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
            <input
            type='text'
            value={namesLists}
            onChange={(e)=>setNamesLists(e.target.value)}
            placeholder='name'
            ></input>
            
            
            {/* <button onClick={handleGetListByName}>Get list by name</button> */}
            
            
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
            {/* <h1>name list</h1>
            <ul>
                {lists.map((list) => ( 
                     

                    <li key={list._id}>
                        <h2>{list.name}</h2>
                        <p>Description: {list.description}</p>
                        <p>Limit: {list.limit    }</p>

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
            </ul> */}
        </div>
    );
};



export default ListComponent;


{/* <ul>
                {lists.map((list) => (
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
            </ul> */}
            
    // const handleDeleteListById = async (id) => {
    //     try {
    //         const data=await getListByLimit(limit);
    //      console.log(data);
    //       setLists(data);
    //       fetchLists();
    //     } catch (error) {
    //         console.error('Error deleting list by id:', error);
    //     }
    // };