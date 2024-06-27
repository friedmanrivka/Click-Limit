 import React, { useEffect, useState } from 'react';
import  { getList , createList, deleteListById, convertListToString, isStringInList,deleteAppFromList,addApp,getListByLimit,getListByName,updateLimit,updateDescription,updateAppDescription} from './Service';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

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
    const [newListApplist, setNewListApplist] = useState([]);
    const [newLimit, setNewLimit] = useState({});
    const [newDescription, setNewDescription] = useState({});
    const [newAppDescriptions, setNewAppDescriptions] = useState({});
    const [error, setError] = useState('');
    const [showApps, setShowApps] = useState({});
    const [listId, setlistId] = useState('');
    const [idAppFromList, setidAppFromList] = useState('');
    const [idList, setIdList] = useState('');
    const [idListDelete, setIdListDelete] = useState('');

   // const [newAppId, setNewAppId] = useState('');
   // const [newAppdes, setNewAppdes] = useState('');

    // const [apps, setApps] = useState([]);
    // const [message, setMessage] = useState('');
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
       const handleCreateList = async () => {
        try {
            const newList = {
                id: newListName,
                description: newListDescription,
                limit: newListLimit,
                creationDate: new Date(),
                updatedDate: new Date(),
                //list:[{newAppId},{newAppdes}]  
                // list: newListApplist.map(app => ({ id: app.id, description: app.description }))
            };
            await createList(newList);
            handleAddApp(newListName)
            fetchLists(); // פונקציה לשליפת הרשימות לאחר ההוספה
        } catch (error) {
            console.error('Error creating list:', error);
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
    //change
     const handleConvertListToString = async () => {
        try {
            const result = await convertListToString();
            setConvertedList(result);
            // return result
        } catch (error) {
            console.error('Error converting list to string:', error);
        }
    };
    //change

      const handleCheckStringInList = async () => {
        try {
            console.log(stringToCheck)
            const result = await isStringInList(stringToCheck);
            setIsInList(result);
            // return result;
        } catch (error) {
            console.error('Error checking if string is in list:', error);
        }

    }
         const handleUpdateLimit = async (id, newLimit, setError, fetchLists) => {
            try {
                const limit = parseInt(newLimit[id], 10);
                if (isNaN(limit)) {
                    setError('Limit must be a number');
                    return;
                }
                setError('');
                await updateLimit(id, limit);
                fetchLists();
            } catch (error) {
                console.error('Error updating limit:', error);
            }
        };
        
           const handleUpdateDescription = async (id, newDescription, fetchLists) => {
            try {
                const description = newDescription[id];
                await updateDescription(id, description);
                fetchLists();
            } catch (error) {
                console.error('Error updating description:', error);
            }
        };
        
             const handleUpdateAppDescription = async (listId, appId, newAppDescriptions, fetchLists) => {
            try {
                const description = newAppDescriptions[listId]?.[appId];
                await updateAppDescription(listId, appId, description);
                fetchLists();
            } catch (error) {
                console.error('Error updating app description:', error);
            }
        };
        
           const handleLimitChange = (id, value, setNewLimit) => {
            setNewLimit(prevState => ({ ...prevState, [id]: value }));
        };
        
            const handleDescriptionChange = (id, value, setNewDescription) => {
            setNewDescription(prevState => ({ ...prevState, [id]: value }));
        };
        
              const handleAppDescriptionChange = (listId, appId, value, setNewAppDescriptions) => {
            setNewAppDescriptions(prevState => ({
                ...prevState,
                [listId]: {
                    ...prevState[listId],
                    [appId]: value
                }
            }));
        };


        const handleToggleShowApps = (listId) => {
            setShowApps(prevState => ({
                ...prevState,
                [listId]: !prevState[listId]
            }));
        };
    return (
        <div>   
            <div>
    <input
     type="text"
     // value={appId}
     onChange={(e) => setIdListDelete(e.target.value)}
     placeholder="List Id for delete"
     />
    <Button onClick={() => handleDeleteListById(idListDelete)} variant="contained" color="secondary" style={{ marginRight: '10px' }}>Delete by ID</Button>                                        
     </div>
<div>
    <input
     type="text"
     // value={appId}
     onChange={(e) => setIdList(e.target.value)}
     placeholder="List Id"
     />
    <input
    type="text"
    onChange={(e) => setidAppFromList(e.target.value)}
    placeholder="App List Id"
    />
    <button onClick={() => handleDeleteAppFromListByName(idList,idAppFromList)}>Delete appList by ID</button>            
       
     </div>
            <br></br>
              <input
        type="text"
        // value={appId}
        onChange={(e) => setlistId(e.target.value)}
        placeholder="which applist you whant to add"
    />
        <input
        type="text"
        // value={appId}
        onChange={(e) => setAppId(e.target.value)}
        placeholder="New applist name"
    />
    <input
        type="text"
        onChange={(e) => setAppDescription(e.target.value)}
        placeholder="New applist description"
    />

    <button onClick={() => handleAddApp(listId)}>insert ListApp</button>
            <br></br>
              <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="New list ID"
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
                                />           <button onClick={handleCreateList}>Create</button>

             <h1>Lists</h1>
            <div>
                <TextField
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="New list name"
                />
                <TextField
                    type="text"
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    placeholder="New list description"
                />
                <TextField
                    type="number"
                    value={newListLimit}
                    onChange={(e) => setNewListLimit(e.target.value)}
                    placeholder="Limit"
                />
                <Button onClick={() => handleCreateList(newListName, newListDescription, newListLimit, () => fetchLists(setLists))} variant="contained" color="primary">Create List</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <List sx={{ width: '100%', maxWidth: 1300, bgcolor: 'background.paper' }}>
                {lists.map((list) => (
                    <React.Fragment key={list.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={list.id}
                               
                            />
                            <Button onClick={() => handleToggleShowApps(list.id)} variant="contained" color="primary">
                                {showApps[list.id] ? 'Hide' : 'Show'}
                            </Button>
                        </ListItem>
                        <Divider variant="inset" component="li" />

                        {showApps[list.id] && (
                            <>
                                <ListItem>
                                
                                    <>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Description: {list.description}
                                        </Typography>
                                        <br />
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Limit: {list.limit}
                                        </Typography>
                                        <br />
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Creation Date: {new Date(list.creationDate).toLocaleString()}
                                        </Typography>
                                        <br />
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Updated Date: {new Date(list.updatedDate).toLocaleString()}
                                        </Typography>
                                    </>
                                    
                               
                                <br></br>
                                    <TextField
                                        type="number"
                                        value={newLimit[list.id] || ''}
                                        onChange={(e) => handleLimitChange(list.id, e.target.value, setNewLimit)}
                                        placeholder="New Limit"
                                        style={{ marginRight: '10px' }}
                                    />
                                    <TextField
                                        type="text"
                                        value={newDescription[list.id] || ''}
                                        onChange={(e) => handleDescriptionChange(list.id, e.target.value, setNewDescription)}
                                        placeholder="New Description"
                                        style={{ marginRight: '10px' }}
                                    />
                                    <Button onClick={() => handleUpdateLimit(list.id, newLimit, setError, () => fetchLists(setLists))} variant="contained" color="primary" style={{ marginRight: '10px' }}>Update Limit</Button>
                                    <Button onClick={() => handleUpdateDescription(list.id, newDescription, () => fetchLists(setLists))} variant="contained" color="primary">Update Description</Button>
                                </ListItem>
                                <Divider variant="inset" component="li" />

                                <List>
                                    {list.list.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={item.appName}
                                                    secondary={
                                                        <><div>
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
                                                        <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Id: {item.id}
                                                            </Typography><br></br>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Description: {item.description}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />

                                            <ListItem>
                                                <TextField
                                                    type="text"
                                                    value={newAppDescriptions[list.id]?.[item.id] || ''}
                                                    onChange={(e) => handleAppDescriptionChange(list.id, item.id, e.target.value, setNewAppDescriptions)}
                                                    placeholder="New App Description"
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <Button onClick={() => handleUpdateAppDescription(list.id, item.id, newAppDescriptions, () => fetchLists(setLists))} variant="contained" color="primary">Update App Description</Button>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </React.Fragment>
                                    ))}
                                </List>
                                <button onClick={() => handleDeleteListById(list.id)}>Delete LIst by ID</button>

                                <ListItem>
                                    <Button onClick={() => handleDeleteListById(list.id)} variant="contained" color="secondary" style={{ marginRight: '10px' }}>Delete by ID</Button>                                  
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )}
                    </React.Fragment>
                ))}
            </List>
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
                    <li key={list.id}>
                        <p>{list.id}</p>
                        <p>Description: {list.description}</p>
                        <p>Limit: {list.limit}</p>
                        <p>Creation Date: {new Date(list.creationDate).toLocaleString()}</p>
                        <p>Updated Date: {new Date(list.updatedDate).toLocaleString()}</p>
                        <ul>
                            {list.list.map((item, index) => (
                                <li key={index}>
                                    <p>App Name: {item.id}</p>
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

export default ListComponent;
    