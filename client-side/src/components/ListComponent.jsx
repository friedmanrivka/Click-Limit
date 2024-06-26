import React, { useEffect, useState } from 'react';
import { getList , createList, deleteListById, convertListToString, isStringInList, deleteListByName,deleteAppFromList,addApp,getListByLimit,getListByName} from './Service';

const ListComponent = () => {
    const [limitedLists, setLimitedLists] = useState([]);
    const [appId, setAppId] = useState('');
    const [appDescription, setAppDescription] = useState('');
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState('');
     const [newListDescription, setNewListDescription] = useState('');
    const [stringToCheck, setStringToCheck] = useState('');
    const [isInList, setIsInList] = useState(null);
    const [convertedList, setConvertedList] = useState('');
    const [newListLimit, setNewListLimit] = useState(0);
    const [limit, setLimit] = useState(0);
    const [listByName, setListByName] = useState(null);
    const [searchName, setSearchName] = useState(''); // State for the search input
    useEffect(() => {
        fetchLists();
    }, []);

    const handleAddApp = async (idList) => {
        try {
            const app = {
                id: appId,
                description: appDescription
          
            }
             await addApp(idList,app);
            fetchLists(); 
        
            }catch (error) {
                console.error('Error creating list:', error);
                 }
            };
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
    const handleGetListByLimit = async (listId) => {
        try {
            console.log('Getting lists by limit:', limit);
            const data = await getListByLimit(limit);
            setLimitedLists(data);
        } catch (error) {
            console.error('Error fetching lists by limit:', error);
        }
    };
    const handleGetListByName = async () => {
        try {
            const data = await getListByName(searchName);
            setListByName(data);
        }
        catch (error) {
            console.error('Error fetching list by name:', error);
        }
    };
    const handleDeleteListById = async (id) => {      
        try {
            await deleteListById(id);
            fetchLists();
        } catch (error) {
            console.error('Error deleting list by id:', error);
        }
    };

    const handleDeleteAppFromListByName = async (idList,idApp) => {
        try {
            await deleteAppFromList(idList,idApp);
            fetchLists();
        } catch (error) {
            console.error('Error deleting list by idList,idApp:', error);
        }
    };
    const handleConvertListToString = async () => {
        try {
            const result = await convertListToString();
            setConvertedList(result);
        } catch (error) {
            console.error('Error converting list to string:', error);
        }
    };

    const handleCheckStringInList = async () => {
        try {
            const result = await isStringInList(stringToCheck);
            setIsInList(result);
        } catch (error) {
            console.error('Error checking if string is in list:', error);
        }
    };
    return (
        <div>

            <h1>Lists</h1>
 
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
                        <h2>{list.id}</h2>
                        <p>Description: {list.description}</p>
                        <p>Limit: {list.limit}</p>
                        <p>Creation Date: {new Date(list.creationDate).toLocaleString()}</p>
                        <p>Updated Date: {new Date(list.updatedDate).toLocaleString()}</p>
                        <ul>
                            {list.list.map((item, index) => (
                                <li key={index}>           
                                <div>
                                <input
                                    type="text"
                                    // value={appId}
                                    onChange={(e) => setAppId(e.target.value)}
                                    placeholder="New list name"
                                />
                                <input
                                    type="text"
                                    onChange={(e) => setAppDescription(e.target.value)}
                                    placeholder="New list description"
                                />
                 
                                <button onClick={() => handleAddApp(list.id)}>insert ListApp</button>
                            </div>
                                 <button onClick={() => handleDeleteAppFromListByName(list.id,item.id)}>Delete by ID</button>
                                    <p>App Id: {item.id}</p>
                                    <p>Description: {item.description}</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => handleDeleteListById(list.id)}>Delete by ID</button>
                     </li>
                ))}
            </ul>
            <h2>Convert List to String</h2>
            <button onClick={handleConvertListToString}>Convert List to String</button>
            <p>{convertedList}</p>

            <h2>Check if String is in List</h2>
            <input
                type="text"
                value={stringToCheck}
                onChange={(e) => setStringToCheck(e.target.value)}
                placeholder="Enter string to check"
            />
            <button onClick={handleCheckStringInList}>Check String in List</button>
            <p>{isInList !== null ? (isInList ? 'String is in list' : 'String is not in list') : ''}</p>
       <div>
    
<div>
</div>
            
      <h2>Limited Lists</h2>
      <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                placeholder="Enter limit"
            />
            <button onClick={handleGetListByLimit}>Get Lists by Limit</button>
            <ul>
            {limitedLists.map((list) => (
                    <li key={list._id}>
                        <p>{list.id}</p>
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
       <div>
       <h2>get list by names</h2>
       <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Enter list name"
                />
                <button onClick={handleGetListByName}>Get list by name</button>
{listByName && (
                    <div>
                        <p>{listByName.id}</p>
                        <p>Description: {listByName.description}</p>
                        <p>Limit: {listByName.limit}</p>
                        <p>Creation Date: {new Date(listByName.creationDate).toLocaleString()}</p>
                        <p>Updated Date: {new Date(listByName.updatedDate).toLocaleString()}</p>
                        <ul>
                            {listByName.list.map((item, index) => (
                                <li key={index}>
                                    <p>App Name: {item.appName}</p>
                                    <p>Description: {item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
       </div>
       
        </div>

    
    );
};


