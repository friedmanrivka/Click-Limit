

// import React, { useEffect, useState } from 'react';
// import { getList, createList, deleteListById, convertListToString, isStringInList, deleteAppFromList, addApp, getListByLimit, getListByName, updateLimit, updateDescription, updateAppDescription } from './Service';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';


// const ListComponent = () => {

//     const [limitedLists, setLimitedLists] = useState([]);
//     const [appId, setAppId] = useState('');
//     const [appDescription, setAppDescription] = useState('');
//     const [lists, setLists] = useState([]);
//     const [newListName, setNewListName] = useState('');
//     const [newListDescription, setNewListDescription] = useState('');
//     const [stringToCheck, setStringToCheck] = useState('');
//     const [isInList, setIsInList] = useState(null);
//     const [convertedList, setConvertedList] = useState('');
//     const [newListLimit, setNewListLimit] = useState(0);
//     const [limit, setLimit] = useState(0);
//     const [listByName, setListByName] = useState(null);
//     const [listByName2, setListByName2] = useState(null);
//     const [searchName, setSearchName] = useState(''); // State for the search input
//     const [newListApplist, setNewListApplist] = useState([]);
//     const [newLimit, setNewLimit] = useState({});
//     const [newDescription, setNewDescription] = useState({});
//     const [newAppDescriptions, setNewAppDescriptions] = useState({});
//     const [error, setError] = useState('');
//     const [showApps, setShowApps] = useState({});
//     const [listId, setlistId] = useState('');
//     const [idAppFromList, setidAppFromList] = useState('');
//     const [idList, setIdList] = useState('');
//     const [idListDelete, setIdListDelete] = useState('');
//     const [statusString, setStatusString] = useState(false);

//     // const [newAppId, setNewAppId] = useState('');
//     // const [newAppdes, setNewAppdes] = useState('');

//     // const [apps, setApps] = useState([]);
//     const [messageErorr, setMessageErorr] = useState('');
//     const [limitMessageErorr, setLimitMessageErorr] = useState('');
//     const [srtingMessageErorr, setStringMessageErorr] = useState('');
//     const [deleteMessageErorr, setDeleteMessageErorr] = useState('');
//     const [createListError, setCreateListError] = useState('');
//     const [deleteAppMessageErorr, setDeleteAppMessageErorr] = useState('');
//     const [deleteListMessageErorr, setDeleteListMessageErorr] = useState('');
//     const [addAppError, setAddAppError] = useState('');
//     const [addUpdateDescriptionError, setAddUpdateDescriptionError] = useState('');

//     useEffect(() => {
//         fetchLists();
//     }, []);
//     const handleInputChange = (e) => {
//         setSearchName(e.target.value);
//         setMessageErorr('');
//         setListByName(null);
//     }
//     // const handleLimitInputChange = (e) => {
//     //     const value = Number(e.target.value);
//     //     if (value >= 1) {
//     //         setLimit(value);
//     //         setLimitMessageErorr(''); // Clear error message on input change
//     //     } else {
//     //         setLimit(1); // Ensure the value doesn't go below 1
//     //         setLimitMessageErorr('there is not like this limit'); // Clear error message on input change
//     //     }
//     // };
//     const handleLimitInputChange = (id, value, setState, setError) => {
//         const limit = Number(value);
//         if (limit >= 1) {
//             setState(prevState => ({ ...prevState, [id]: limit }));
//             setError(''); // Clear error message on input change
//         } else {
//             setState(prevState => ({ ...prevState, [id]: 1 })); // Ensure the value doesn't go below 1
//             setError('there is not like this limit'); // Set error message
//         }
//     };

//     const handleAddApp = async (idList) => {


//         let errorMessages = [];

//         if (!idList.trim()) {
//             errorMessages.push('Please enter the name of the list.');
//         } else if (/^\d+$/.test(idList)) {
//             errorMessages.push('The list name must be text, not a number.');
//         }

//         if (!appId.trim()) {
//             errorMessages.push('Please enter the name of the app.');
//         } else if (/^\d+$/.test(appId)) {
//             errorMessages.push('The app name must be text, not a number.');
//         }

//         if (!appDescription.trim()) {
//             errorMessages.push('Please enter the description of the app.');
//         }
//         if (/^\d+$/.test(appDescription)) {
//             errorMessages.push('The app decription must be text, not a number.');
//         }
//         if (errorMessages.length > 0) {
//             setAddAppError(errorMessages.join(' '));
//             return;
//         }

//         try {
//             const app = {
//                 id: appId,
//                 description: appDescription

//             }
//             await addApp(idList, app);
//             fetchLists();
//             setAddAppError('the app added successfully');
//             setTimeout(() => {
//                 setAddAppError('');
//             }, 3000);

//         } catch (error) {
//             console.error('Error creating list:', error);
//         }
//     };
//     const fetchLists = async () => {
//         try {
//             console.log("Fetching lists...");
//             const data = await getList();
//             console.log("Lists fetched:", data);
//             setLists(data);
//         } catch (error) {
//             console.error('Error fetching lists:', error);
//         }
//     };
//     const handleCreateList = async () => {
//         if (!newListName.trim()) {
//             setCreateListError('List name is required.');
//             return;
//         }

//         if (!newListDescription.trim()) {
//             setCreateListError('List description is required.');
//             return;
//         }

//         if (isNaN(newListLimit) || newListLimit <= 0) {
//             setCreateListError('Limit must be a positive number.');
//             return;
//         }
//         try {
//             const newList = {
//                 id: newListName,
//                 description: newListDescription,
//                 limit: newListLimit,
//                 creationDate: new Date(),
//                 updatedDate: new Date(),
//                 //list:[{newAppId},{newAppdes}]  
//                 // list: newListApplist.map(app => ({ id: app.id, description: app.description }))
//             };
//             await createList(newList);
//             handleAddApp(newListName)
//             fetchLists(); // פונקציה לשליפת הרשימות לאחר ההוספה
//         } catch (error) {
//             console.error('Error creating list:', error);
//         }
//     };


//     const handleGetListByName = async () => {

//         if (!searchName.trim()) {
//             setMessageErorr('Please enter the name of the list you want to search.');
//             return;
//         }

//         if (/^\d+$/.test(searchName)) {
//             setMessageErorr('The name must be text, not a number.');
//             return;
//         }

//         try {
//             const data = await getListByName(searchName);
//             console.log(data);
//             setListByName(data);
//             setMessageErorr('');
//         }
//         catch (error) {
//             if (error.response && error.response.status === 404) {
//                 setMessageErorr('List not found.');
//             }

//             console.error('Error fetching list by name:', error);
//         }
//     };
//     const handleDeleteListById = async (id) => {
//         if (!idListDelete.trim()) {
//             setDeleteMessageErorr('Please enter a string to delete.');
//             return;
//         }

//         if (/^\d+$/.test(idListDelete)) {
//             setDeleteMessageErorr('The input must be text, not a number.');
//             return;
//         }
//         try {
//             await deleteListById(id);
//             fetchLists();
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//                 setDeleteMessageErorr('List not found.');
//             }
//             // else{
//             //     setDeleteMessageError('An error occurred while deleting the list.');
//             // }
//             console.error('Error deleting list by id:', error);
//         }
//     };

//     const handleDeleteAppFromListByName = async (idList, idApp) => {
//         let hasError = false;
//         if (!idList.trim()) {
//             setDeleteListMessageErorr('Please enter the name of the list.');

//         }

//         if (/^\d+$/.test(idList)) {
//             setDeleteListMessageErorr('The list name must be text, not a number.');

//         }

//         if (!idApp.trim()) {
//             setDeleteAppMessageErorr('Please enter the name of the app.');

//         }

//         if (/^\d+$/.test(idApp)) {
//             setDeleteAppMessageErorr('The app name must be text, not a number.');

//         }
//         try {
//             await deleteAppFromList(idList, idApp);
//             fetchLists();
//             setDeleteAppMessageErorr('');
//             setDeleteListMessageErorr('');
//         } catch (error) {
//             console.error('Error deleting list by idList,idApp:', error);

//         }
//     };
//     //change
//     const handleConvertListToString = async () => {
//         setStatusString(!statusString)
//         try {
//             const result = await convertListToString();
//             setConvertedList(result);
//             // return result
//         } catch (error) {
//             console.error('Error converting list to string:', error);
//         }
//     };
//     //change

//     const handleCheckStringInList = async () => {
//         if (!stringToCheck.trim()) {
//             setStringMessageErorr('Please enter a string to check.');
//             return;
//         }

//         if (/^\d+$/.test(stringToCheck)) {
//             setStringMessageErorr('The input must be text, not a number.');
//             return;
//         }
//         try {
//             console.log(stringToCheck)
//             const result = await isStringInList(stringToCheck);
//             setIsInList(result);
//             // return result;
//         } catch (error) {
//             console.error('Error checking if string is in list:', error);
//             setStringMessageErorr('An error occurred while checking the string.');
//         }

//     }
//     const handleUpdateLimit = async (id, newLimit, setError, fetchLists) => {
//         try {
//             const limit = parseInt(newLimit[id], 10);
//             if (isNaN(limit)) {
//                 setError('Limit must be a number');
//                 return;
//             }
//             setError('');
//             await updateLimit(id, limit);
//             fetchLists();
//         } catch (error) {
//             console.error('Error updating limit:', error);
//         }
//     };

//     const handleUpdateDescription = async (id, newDescription, fetchLists) => {
//         if (!newDescription[id]?.trim()) {
//             setAddUpdateDescriptionError('Please enter a description.');
//             return;
//         }

//         if (/^\d+$/.test(newDescription[id])) {
//             setAddUpdateDescriptionError('The description must be text, not a number.');
//             return;
//         }

//         try {
//             const description = newDescription[id];
//             await updateDescription(id, description);
//             fetchLists();
//         } catch (error) {
//             console.error('Error updating description:', error);
//         }
//     };

//     const handleUpdateAppDescription = async (listId, appId, newAppDescriptions, fetchLists) => {
//         try {
//             const description = newAppDescriptions[listId]?.[appId];
//             await updateAppDescription(listId, appId, description);
//             fetchLists();
//         } catch (error) {
//             console.error('Error updating app description:', error);
//         }
//     };

//     const handleLimitChange = (id, value, setNewLimit) => {
//         setNewLimit(prevState => ({ ...prevState, [id]: value }));
//     };

//     const handleDescriptionChange = (id, value, setNewDescription) => {
//         setNewDescription(prevState => ({ ...prevState, [id]: value }));
//     };

//     const handleAppDescriptionChange = (listId, appId, value, setNewAppDescriptions) => {
//         setNewAppDescriptions(prevState => ({
//             ...prevState,
//             [listId]: {
//                 ...prevState[listId],
//                 [appId]: value
//             }
//         }));
//     };

//     const handleToggleShowApps = (listId) => {
//         setShowApps(prevState => ({
//             ...prevState,
//             [listId]: !prevState[listId]
//         }));
//     };
//     return (
//         <div>
//             <div>
//                 <TextField
//                     type="text"
//                     size="small"
//                     style={{ width: '100px' }}
//                     // value={appId}
//                     //  onChange={(e) => setIdListDelete(e.target.value)}
//                     onChange={(e) => {
//                         setIdListDelete(e.target.value);
//                         setDeleteMessageErorr(''); // Clear error message on input change
//                     }}
//                     placeholder="delete list by name"
//                 />
//                 <Button onClick={() => handleDeleteListById(idListDelete)} variant="contained" color="primary" style={{ fontSize: '0.4em' }}><span >Delete list by name</span></Button>
//                 {deleteMessageErorr && <p style={{ color: 'red' }}>{deleteMessageErorr}</p>}
//             </div>
//             <div>
//                 <TextField
//                     type="text"
//                     size="small"
//                     style={{ width: '100px' }}
//                     //   size="small"
//                     // value={appId}
//                     onChange={(e) => {
//                         setIdList(e.target.value);
//                         setDeleteListMessageErorr(''); // Clear error message on input change
//                     }}
//                     placeholder="List name"
//                 />
//                 <TextField
//                     size="small"
//                     style={{ width: '100px' }}
//                     type="text"
//                     onChange={(e) => {
//                         setidAppFromList(e.target.value);
//                         setDeleteAppMessageErorr(''); // Clear error message on input change
//                     }}
//                     placeholder="App name"
//                 />
//                 <Button onClick={() => handleDeleteAppFromListByName(idList, idAppFromList)} variant="contained" color="primary" ><span>Delete app by name</span></Button>
//                 {deleteAppMessageErorr && <p style={{ color: 'red' }}>{deleteAppMessageErorr}</p>}
//                 {deleteListMessageErorr && <p style={{ color: 'red' }}>{deleteListMessageErorr}</p>}
//             </div>
//             <br></br>
//             <TextField
//                 size="small"
//                 style={{ width: '100px' }}
//                 type="text"
//                 onChange={(e) => {
//                     setlistId(e.target.value);
//                     setAddAppError(''); // Clear error message on input change
//                 }}


//                 placeholder="which applist you whant to add"
//             />
//             <TextField
//                 size="small"
//                 style={{ width: '100px' }}
//                 type="text"
//                 onChange={(e) => {
//                     setAppId(e.target.value);
//                     setAddAppError(''); // Clear error message on input change
//                 }}
//                 placeholder="New applist name"
//             />
//             <TextField
//                 size="small"
//                 style={{ width: '100px' }}
//                 type="text"
//                 onChange={(e) => {
//                     setAppDescription(e.target.value);
//                     setAddAppError(''); // Clear error message on input change
//                 }}

//                 placeholder="New applist description"
//             />

//             <Button onClick={() => handleAddApp(listId)} variant="contained" color="primary"><span>insert ListApp</span></Button>
//             {addAppError && <p style={{ color: 'red' }}>{addAppError}</p>}
//             <br></br>
//             <TextField
//                 size="small"
//                 style={{ width: '100px' }}
//                 type="text"
//                 value={newListName}
//                 onChange={(e) => setNewListName(e.target.value)}
//                 placeholder="New list name"
//             />
//             <TextField
//                 size="small"
//                 style={{ width: '100px' }}
//                 type="text"
//                 value={newListDescription}
//                 onChange={(e) => setNewListDescription(e.target.value)}
//                 placeholder="New list description"
//             />
//             <TextField
//                 size="small"
//                 style={{ width: '100px' }}
//                 type="number"
//                 value={newListLimit}
//                 onChange={(e) => setNewListLimit(e.target.value)}
//                 placeholder="Limit"
//             />
//             <TextField
//                 size="small"
//                 style={{ width: '100px' }}
//                 type="text"
//                 // value={appId}
//                 onChange={(e) => setAppId(e.target.value)}
//                 placeholder="New list name"
//             />
//             <TextField
//                 size="small"
//                 style={{ width: '100px' }}
//                 type="text"
//                 onChange={(e) => setAppDescription(e.target.value)}
//                 placeholder="New list description"
//             />           <Button onClick={handleCreateList} variant="contained" color="primary"><span>Create</span></Button>

//             <h1>Lists</h1>
//             <div>

//                 <Button onClick={() => handleCreateList(newListName, newListDescription, newListLimit, () => fetchLists(setLists))} variant="contained" color="primary"><span>Create List</span></Button>
//             </div>
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             <List sx={{ width: '100%', maxWidth: 1300, bgcolor: 'background.paper' }}>
//                 {lists.map((list) => (
//                     <React.Fragment key={list.id}>
//                         <ListItem alignItems="flex-start">
//                             <ListItemText
//                                 primary={list.id}

//                             />


//                             <Button
//                                 onClick={() => handleToggleShowApps(list.id)}
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{
//                                     fontSize: '0.4em',
//                                     width: '25px',
//                                     height: '20px'
//                                 }}
//                             >
//                                 {showApps[list.id] ? 'Hide' : 'Show'}
//                             </Button>

//                         </ListItem>
//                         <Divider variant="inset" component="li" />

//                         {showApps[list.id] && (
//                             <>
//                                 <ListItem>

//                                     <>
//                                         <Typography
//                                             sx={{ display: 'inline' }}
//                                             component="span"
//                                             variant="body2"
//                                             color="text.primary"
//                                         >
//                                             Description: {list.description}
//                                         </Typography>
//                                         <br />
//                                         <Typography
//                                             sx={{ display: 'inline' }}
//                                             component="span"
//                                             variant="body2"
//                                             color="text.primary"
//                                         >
//                                             Limit: {list.limit}
//                                         </Typography>
//                                         <br />
//                                         <Typography
//                                             sx={{ display: 'inline' }}
//                                             component="span"
//                                             variant="body2"
//                                             color="text.primary"
//                                         >
//                                             Creation Date: {new Date(list.creationDate).toLocaleString()}
//                                         </Typography>
//                                         <br />
//                                         <Typography
//                                             sx={{ display: 'inline' }}
//                                             component="span"
//                                             variant="body2"
//                                             color="text.primary"
//                                         >
//                                             Updated Date: {new Date(list.updatedDate).toLocaleString()}
//                                         </Typography>
//                                     </>


//                                     <br></br>
//                                     <TextField
//                                         type="number"
//                                         min="1"
//                                         value={newLimit[list.id] || ''}
                                     
//                                         onChange={(e) => handleLimitInputChange(list.id, e.target.value, setNewLimit, setError)}
//                                         placeholder="New Limit"
//                                         style={{ marginRight: '10px', width: '100px' }}
//                                         size="small"
//  />
//                                     <TextField
//                                         size="small"

//                                         type="text"
//                                         value={newDescription[list.id] || ''}
//                                         // onChange={(e) => handleDescriptionChange(list.id, e.target.value, setNewDescription)
//                                         //     setAddUpdateDescriptionError('');

//                                         // }
//                                         onChange={(e) => {
//                                             handleDescriptionChange(list.id, e.target.value, setNewDescription);
//                                             setAddUpdateDescriptionError('');; // Clear error message on input change
//                                         }}

//                                         placeholder="New Description"
//                                         style={{ marginRight: '10px' }}
//                                     />
//                                     <Button onClick={() => handleUpdateLimit(list.id, newLimit, setError, () => fetchLists(setLists))} variant="contained" color="primary" style={{ marginRight: '10px' }}><span>Update Limit</span></Button>

//                                     <Button onClick={() => handleUpdateDescription(list.id, newDescription, () => fetchLists(setLists))} variant="contained" color="primary"><span>Update Description</span></Button>
//                                     {addUpdateDescriptionError && <p style={{ color: 'red' }}>{addUpdateDescriptionError}</p>}
//                                 </ListItem>
//                                 <Divider variant="inset" component="li" />

//                                 <List>
//                                     {list.list.map((item) => (
//                                         <React.Fragment key={item.id}>
//                                             <ListItem alignItems="flex-start">
//                                                 <ListItemText
//                                                     primary={item.appName}
//                                                     secondary={
//                                                         <>
//                                                             <Button onClick={() => handleDeleteAppFromListByName(list.id, item.id)} variant="contained" color="primary"><span>Delete app</span></Button>
//                                                             <Typography
//                                                                 sx={{ display: 'inline' }}
//                                                                 component="span"
//                                                                 variant="body2"
//                                                                 color="text.primary"
//                                                             >
//                                                                 Id: {item.id}
//                                                             </Typography><br></br>
//                                                             <Typography
//                                                                 sx={{ display: 'inline' }}
//                                                                 component="span"
//                                                                 variant="body2"
//                                                                 color="text.primary"
//                                                             >
//                                                                 Description: {item.description}
//                                                             </Typography>
//                                                         </>
//                                                     }
//                                                 />
//                                             </ListItem>
//                                             <Divider variant="inset" component="li" />

//                                             <ListItem>
//                                                 <TextField
//                                                     type="text"
//                                                     value={newAppDescriptions[list.id]?.[item.id] || ''}
//                                                     onChange={(e) => handleAppDescriptionChange(list.id, item.id, e.target.value, setNewAppDescriptions)}
//                                                     placeholder="New App Description"
//                                                     style={{ marginRight: '10px', width: '100px' }}
//                                                     size="small"

//                                                 />
//                                                 <Button onClick={() => handleUpdateAppDescription(list.id, item.id, newAppDescriptions, () => fetchLists(setLists))} variant="contained" color="primary">Update App Description</Button>
//                                             </ListItem>
//                                             <Divider variant="inset" component="li" />
//                                         </React.Fragment>
//                                     ))}
//                                 </List>
//                                 <div>
//                                     <TextField

//                                         type="text"
//                                         size="small"
//                                         style={{ width: '100px' }}
//                                         // value={appId}
//                                         onChange={(e) => setAppId(e.target.value)}
//                                         placeholder="New list name"
//                                     />
//                                     <TextField

//                                         type="text"
//                                         size="small"
//                                         style={{ width: '100px' }}
//                                         onChange={(e) => setAppDescription(e.target.value)}
//                                         placeholder="New list description"
//                                     />

//                                     <Button onClick={() => handleAddApp(list.id)} variant="contained" color="primary"><span>insert ListApp</span></Button>
//                                 </div>
//                                 <ListItem>  <Button onClick={() => handleDeleteListById(list.id)} variant="contained" color="primary"><span>Delete LIst by ID</span></Button></ListItem>



//                                 <Divider variant="inset" component="li" />
//                             </>
//                         )}
//                     </React.Fragment>
//                 ))}
//             </List>
//             <h2>Convert List to String</h2>
//             <Button onClick={handleConvertListToString} variant="contained" color="primary"><span>Convert List to String</span></Button>
//             {statusString && <p>{convertedList}</p>}

//             <h2>Check if String is in List</h2>
//             <TextField

//                 type="text"
//                 size="small"
//                 style={{ width: '100px' }}
//                 value={stringToCheck}
//                 onChange={(e) => {
//                     setStringToCheck(e.target.value);
//                     setStringMessageErorr(''); // Clear error message on input change
//                 }}

//                 placeholder="Enter string to check"
//             />
//             <Button onClick={handleCheckStringInList} variant="contained" color="primary"><span>Check String in List</span></Button>
//             <p>{isInList !== null ? (isInList ? 'String is in list' : 'String is not in list') : ''}</p>
//             {srtingMessageErorr && <p style={{ color: 'red' }}>{srtingMessageErorr}</p>}
//             <div>

//                 <div>
//                 </div>

//                 {/* <h2>Limited Lists</h2>
//                 <TextField
             
//                     type="number"
//                     value={limit} */}
//                 {/* // onChange={(e) => setLimit(Number(e.target.value))}
//                     min="1"
//                     placeholder="Enter limit"
//                     onChange={handleLimitInputChange}
//                 /> */}
//                 {/* <Button onClick={handleGetListByLimit}  variant="contained" color="primary">Get Lists by Limit</Button>
//                 {limitMessageErorr && <p style={{ color: 'red' }}>{limitMessageErorr}</p>} */}
//                 <ul>
//                     {limitedLists.map((list) => (
//                         <li key={list.id}>
//                             <p>{list.id}</p>
//                             <p>Description: {list.description}</p>
//                             <p>Limit: {list.limit}</p>
//                             <p>Creation Date: {new Date(list.creationDate).toLocaleString()}</p>
//                             <p>Updated Date: {new Date(list.updatedDate).toLocaleString()}</p>
//                             <ul>
//                                 {list.list.map((item, index) => (
//                                     <li key={index}>
//                                         <p>App Name: {item.id}</p>
//                                         <p>Description: {item.description}</p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div>
//                 <h2>get list by names</h2>
//                 <TextField

//                     type="text"
//                     value={searchName}
//                     size="small"
//                     style={{ width: '100px' }}
//                     // onChange={(e) => setSearchName(e.target.value)}
//                     onChange={handleInputChange}
//                     placeholder="Enter list name"
//                 />
//                 <Button onClick={handleGetListByName} variant="contained" color="primary"><span>Get list by name</span></Button>
//                 {messageErorr && <p style={{ color: 'red' }}>{messageErorr}</p>}
//                 {listByName && (
//                     <div>
//                         <p>{listByName.id}</p>
//                         <p>Description: {listByName.description}</p>
//                         <p>Limit: {listByName.limit}</p>
//                         <p>Creation Date: {new Date(listByName.creationDate).toLocaleString()}</p>
//                         <p>Updated Date: {new Date(listByName.updatedDate).toLocaleString()}</p>
//                         <ul>
//                             {listByName.list.map((item, index) => (
//                                 <li key={index}>
//                                     <p>App Name: {item.appName}</p>
//                                     <p>Description: {item.description}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ListComponent;
import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, List, ListItem, Divider, ListItemText, Typography, Paper, Grid, Box } from '@mui/material';
import { getList, createList, deleteListById, convertListToString, isStringInList, deleteAppFromList, addApp, getListByLimit, getListByName, updateLimit, updateDescription, updateAppDescription } from './Service';
import logo from '../images/logo.png'

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
    const [searchName, setSearchName] = useState('');
    const [newLimit, setNewLimit] = useState({});
    const [newDescription, setNewDescription] = useState({});
    const [newAppDescriptions, setNewAppDescriptions] = useState({});
    const [error, setError] = useState('');
    const [showApps, setShowApps] = useState({});
    const [listId, setListId] = useState('');
    const [idAppFromList, setIdAppFromList] = useState('');
    const [idListDelete, setIdListDelete] = useState('');
    const [statusString, setStatusString] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [limitMessageError, setLimitMessageError] = useState('');
    const [stringMessageError, setStringMessageError] = useState('');
    const [srtingMessageErorr, setStringMessageErorr] = useState('');
    const [deleteMessageError, setDeleteMessageError] = useState('');
    const [createListError, setCreateListError] = useState('');
    const [deleteAppMessageError, setDeleteAppMessageError] = useState('');
    const [deleteListMessageError, setDeleteListMessageError] = useState('');
    const [addAppError, setAddAppError] = useState('');
    const [addUpdateDescriptionError, setAddUpdateDescriptionError] = useState('');
      const [idList, setIdList] = useState('');
      const [messageErorr, setMessageErorr] = useState('');

    useEffect(() => {
        fetchLists();
    }, []);

    const handleInputChange = (e) => {
        setSearchName(e.target.value);
        setMessageError('');
        setListByName(null);
    }

    const handleLimitInputChange = (id, value, setState, setError) => {
        const limit = Number(value);
        if (limit >= 1) {
            setState(prevState => ({ ...prevState, [id]: limit }));
            setError('');
        } else {
            setState(prevState => ({ ...prevState, [id]: 1 }));
            setError('There is not like this limit');
        }
    };

    const handleAddApp = async (idList) => {
        let errorMessages = [];

        if (!idList.trim()) {
            errorMessages.push('Please enter the name of the list.');
        } else if (/^\d+$/.test(idList)) {
            errorMessages.push('The list name must be text, not a number.');
        }

        if (!appId.trim()) {
            errorMessages.push('Please enter the name of the app.');
        } else if (/^\d+$/.test(appId)) {
            errorMessages.push('The app name must be text, not a number.');
        }

        if (!appDescription.trim()) {
            errorMessages.push('Please enter the description of the app.');
        }
        if (/^\d+$/.test(appDescription)) {
            errorMessages.push('The app description must be text, not a number.');
        }
        if (errorMessages.length > 0) {
            setAddAppError(errorMessages.join(' '));
            return;
        }

        try {
            const app = {
                id: appId,
                description: appDescription
            }
            await addApp(idList, app);
            fetchLists();
            setAddAppError('The app added successfully');
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    const fetchLists = async () => {
        try {
            const data = await getList();
            setLists(data);
        } catch (error) {
            console.error('Error fetching lists:', error);
        }
    };

    const handleCreateList = async () => {
        if (!newListName.trim()) {
            setCreateListError('List name is required.');
            return;
        }

        if (!newListDescription.trim()) {
            setCreateListError('List description is required.');
            return;
        }

        if (isNaN(newListLimit) || newListLimit <= 0) {
            setCreateListError('Limit must be a positive number.');
            return;
        }
        try {
            const newList = {
                id: newListName,
                description: newListDescription,
                limit: newListLimit,
                creationDate: new Date(),
                updatedDate: new Date(),
            };
            await createList(newList);
            handleAddApp(newListName);
            fetchLists();
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    const handleGetListByName = async () => {
        if (!searchName.trim()) {
            setMessageError('Please enter the name of the list you want to search.');
            return;
        }

        if (/^\d+$/.test(searchName)) {
            setMessageError('The name must be text, not a number.');
            return;
        }

        try {
            const data = await getListByName(searchName);
            setListByName(data);
            setMessageError('');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessageError('List not found.');
            }
            console.error('Error fetching list by name:', error);
        }
    };

    const handleDeleteListById = async (id) => {
        if (!idListDelete.trim()) {
            setDeleteMessageError('Please enter a string to delete.');
            return;
        }

        if (/^\d+$/.test(idListDelete)) {
            setDeleteMessageError('The input must be text, not a number.');
            return;
        }
        try {
            await deleteListById(id);
            fetchLists();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setDeleteMessageError('List not found.');
            }
            console.error('Error deleting list by id:', error);
        }
    };

    const handleDeleteAppFromListByName = async (idList, idApp) => {
        let hasError = false;
        if (!idList.trim()) {
            setDeleteListMessageError('Please enter the name of the list.');
            hasError = true;
        }

        if (/^\d+$/.test(idList)) {
            setDeleteListMessageError('The list name must be text, not a number.');
            hasError = true;
        }

        if (!idApp.trim()) {
            setDeleteAppMessageError('Please enter the name of the app.');
            hasError = true;
        }

        if (/^\d+$/.test(idApp)) {
            setDeleteAppMessageError('The app name must be text, not a number.');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            await deleteAppFromList(idList, idApp);
            fetchLists();
            setDeleteAppMessageError('');
            setDeleteListMessageError('');
        } catch (error) {
            console.error('Error deleting list by idList, idApp:', error);
        }
    };

    const handleConvertListToString = async () => {
        setStatusString(!statusString)
        try {
            const result = await convertListToString();
            setConvertedList(result);
        } catch (error) {
            console.error('Error converting list to string:', error);
        }
    };

    const handleCheckStringInList = async () => {
        if (!stringToCheck.trim()) {
            setStringMessageError('Please enter a string to check.');
            return;
        }

        if (/^\d+$/.test(stringToCheck)) {
            setStringMessageError('The input must be text, not a number.');
            return;
        }
        try {
            const result = await isStringInList(stringToCheck);
            setIsInList(result);
        } catch (error) {
            console.error('Error checking if string is in list:', error);
            setStringMessageError('An error occurred while checking the string.');
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
        if (!newDescription[id]?.trim()) {
            setAddUpdateDescriptionError('Please enter a description.');
            return;
        }

        if (/^\d+$/.test(newDescription[id])) {
            setAddUpdateDescriptionError('The description must be text, not a number.');
            return;
        }

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
        <Container>  
            {/* <div className="home-page"> */}
        <img src={logo} alt="Description" className="header-image"/>
      {/* </div> */}
            <div id='line'>
             <Paper style={{ padding: '20px', marginTop: '20px', maxWidth: '400px', margin: '0 auto' }}>
    <Typography variant="h5" component="h2" gutterBottom>
      
    </Typography>
    <Button onClick={handleConvertListToString} variant="contained" color="primary" fullWidth><span className='buttonName'>
        Convert List to String
        </span>
    </Button>
    {statusString && <Typography variant="body1" style={{ marginTop: '20px' }}>{convertedList}</Typography>}
</Paper>
            {/* <h2>Check if String is in List</h2>
            <TextField
                type="text"
                size="small"
                style={{ width: '100px' }}
                value={stringToCheck}
                onChange={(e) => {
                    setStringToCheck(e.target.value);
                    setStringMessageError('');
                }}
                placeholder="Enter string to check"
            /> */}
            {/* <Button onClick={handleCheckStringInList} variant="contained" color="primary">Check String in List</Button> */}
            {/* <p>{isInList !== null ? (isInList ? 'String is in list' : 'String is not in list') : ''}</p> */}
            {/* {stringMessageError && <p style={{ color: 'red' }}>{stringMessageError}</p>} */}
            <Paper style={{ padding: '20px', marginTop: '100px', maxWidth: '400px', margin: '0 auto' }}>
    <Typography variant="h5" component="h2" gutterBottom>
    
    </Typography>
    <TextField
        type="text"
        size="small"
        fullWidth
        value={stringToCheck}
        onChange={(e) => {
            setStringToCheck(e.target.value);
            setStringMessageErorr(''); // Clear error message on input change
        }}
        placeholder="Enter string to check"
        style={{ marginBottom: '10px' }}
    />
    <Button onClick={handleCheckStringInList} variant="contained" color="primary" fullWidth><span className='buttonName'>
        Check String in List
        </span>
    </Button>
    <Typography variant="body1" style={{ marginTop: '20px' }}>
        {isInList !== null ? (isInList ? 'String is in list' : 'String is not in list') : ''}
    </Typography>
    {srtingMessageErorr && <Typography variant="body1" color="error">{srtingMessageErorr}</Typography>}
</Paper>
            <div>
           {/* <TextField
                    type="text"
                    value={searchName}
                    size="small"
                    style={{ width: '100px' }}
                    onChange={handleInputChange}
                    placeholder="Enter list name"
                />
                <Button onClick={handleGetListByName} variant="contained" color="primary"><span className='buttonName'>Get List by Name</span></Button> */}
                {/* {messageError && <p style={{ color: 'red' }}>{messageError}</p>}
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
                    </div> */}
                {/* )} */}

                <Paper style={{ padding: '20px', marginTop: '100px', maxWidth: '400px', margin: '0 auto' }}>
    <Typography variant="h5" component="h2" gutterBottom>
      
    </Typography>
    <TextField
        type="text"
        size="small"
        fullWidth
        value={searchName}
        onChange={handleInputChange}
        placeholder="Enter list name"
        style={{ marginBottom: '10px' }}
    />
    <Button onClick={handleGetListByName} variant="contained" color="primary" fullWidth><span className='buttonName'>
        Get List by Name
        </span></Button>
        {messageError && <Typography style={{ color: 'red' }}>{messageError}</Typography>}
    {/* {messageErorr && <Typography variant="body1" color="error" style={{ marginTop: '10px' }}>{messageErorr}</Typography>} */}
    {listByName && (
        <div style={{ marginTop: '20px' }}>
            <Typography variant="body1">ID: {listByName.id}</Typography>
            <Typography variant="body1">Description: {listByName.description}</Typography>
            <Typography variant="body1">Limit: {listByName.limit}</Typography>
            <Typography variant="body1">Creation Date: {new Date(listByName.creationDate).toLocaleString()}</Typography>
            <Typography variant="body1">Updated Date: {new Date(listByName.updatedDate).toLocaleString()}</Typography>
            <ul>
                {listByName.list.map((item, index) => (
                    <li key={index}>
                        <Typography variant="body2">App Name: {item.appName}</Typography>
                        <Typography variant="body2">Description: {item.description}</Typography>
                    </li>
                ))}
            </ul>
        </div>
    )}
</Paper></div></div><div id='line'>
             <Paper style={{ padding: '20px', marginTop: '100px', maxWidth: '400px', margin: '0 auto' }}>
        <Typography variant="h5" component="h2" gutterBottom>
        
        </Typography>
            <div>
                <TextField
                    type="text"
                    size="small"
                    fullWidth
                    style={{ width: '100px' }}
                    onChange={(e) => {
                        setIdListDelete(e.target.value);
                        setDeleteMessageError('');
                    }}
                    placeholder="Delete list by name"
                />
                <Button onClick={() => handleDeleteListById(idListDelete)}   variant="contained" color="primary" fullWidth style={{ marginRight: '10px' }}><span className='buttonName'>Delete list by name</span></Button>
                {deleteMessageError && <p style={{ color: 'red' }}>{deleteMessageError}</p>}
            </div>
            
            </Paper>  <Paper style={{ padding: '20px', marginTop: '100px', maxWidth: '400px', margin: '0 auto' }}>
    <Typography variant="h5" component="h2" gutterBottom>
    
    </Typography>
            <div>
                <TextField
                    type="text"
                    size="small"
                    style={{ width: '100px' }}
                    onChange={(e) => {
                        setIdList(e.target.value);
                        setDeleteListMessageError('');
                    }}
                    placeholder="List name"
                />
                <TextField
                    size="small"
                    style={{ width: '100px' }}
                    type="text"
                    onChange={(e) => {
                        setIdAppFromList(e.target.value);
                        setDeleteAppMessageError('');
                    }}
                    placeholder="App name"
                />
                <Button onClick={() => handleDeleteAppFromListByName(idList, idAppFromList)}  variant="contained" color="primary" fullWidth><span className='buttonName'>Delete app by name</span></Button>
                {deleteAppMessageError && <p style={{ color: 'red' }}>{deleteAppMessageError}</p>}
                {deleteListMessageError && <p style={{ color: 'red' }}>{deleteListMessageError}</p>}
            </div></Paper>
            <br />  <Paper style={{ padding: '20px', marginTop: '100px', maxWidth: '400px', margin: '0 auto',marginTop:'20px' }}>
    <Typography variant="h5" component="h2" gutterBottom>
    
    </Typography>
            <TextField
                size="small"
                style={{ width: '100px' }}
                type="text"
                onChange={(e) => {
                    setListId(e.target.value);
                    setAddAppError('');
                }}
                placeholder="which app list you want to add"
            />
            <TextField
                size="small"
                style={{ width: '100px' }}
                type="text"
                onChange={(e) => {
                    setAppId(e.target.value);
                    setAddAppError('');
                }}
                placeholder="New app list name"
            />
            <TextField
                size="small"
                style={{ width: '100px' }}
                type="text"
                onChange={(e) => {
                    setAppDescription(e.target.value);
                    setAddAppError('');
                }}
                placeholder="New app list description"
            />
            <Button onClick={() => handleAddApp(listId)}   variant="contained" color="primary" fullWidth><span className='buttonName'>Insert ListApp</span></Button>
            {addAppError && <p style={{ color: 'red' }}>{addAppError}</p>}
            <br /> 
            </Paper>
             <Paper style={{ padding: '20px', marginTop: '50px', maxWidth: '400px', margin: '0 auto'}}>

    <Typography variant="h5" component="h2"style={{  marginTop:'20px'}} gutterBottom>
    
    </Typography>
            <TextField
                size="small"
                style={{ width: '100px' }}
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="New list name"
            />
            <TextField
                size="small"
                style={{ width: '100px' }}
                type="text"
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
                placeholder="New list description"
            />
            <TextField
                size="small"
                style={{ width: '100px' }}
                type="number"
                value={newListLimit}
                onChange={(e) => setNewListLimit(e.target.value)}
                placeholder="Limit"
            />
            <TextField
                size="small"
                style={{ width: '100px' }}
                type="text"
                // value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="New list name"
            />
            <TextField
                size="small"
                style={{ width: '100px' }}
                type="text"
                onChange={(e) => setAppDescription(e.target.value)}
                placeholder="New list description"
            />
            <Button onClick={handleCreateList}  variant="contained" color="primary" fullWidth><span className='buttonName'>Create</span></Button>
            </Paper></div>
            <h1>Lists</h1>
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
                                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                        Description: {list.description}
                                    </Typography>
                                    <br />
                                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                        Limit: {list.limit}
                                    </Typography>
                                    <br />
                                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                        Creation Date: {new Date(list.creationDate).toLocaleString()}
                                    </Typography>
                                    <br />
                                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                        Updated Date: {new Date(list.updatedDate).toLocaleString()}
                                    </Typography>
                                    <br />
                                    <TextField
                                        type="number"
                                        min="1"
                                        value={newLimit[list.id] || ''}
                                        onChange={(e) => handleLimitInputChange(list.id, e.target.value, setNewLimit, setError)}
                                        placeholder="New Limit"
                                        style={{ marginRight: '10px', width: '100px' }}
                                        size="small"
                                    />
                                    <TextField
                                        size="small"
                                        type="text"
                                        value={newDescription[list.id] || ''}
                                        onChange={(e) => {
                                            handleDescriptionChange(list.id, e.target.value, setNewDescription);
                                            setAddUpdateDescriptionError('');
                                        }}
                                        placeholder="New Description"
                                        style={{ marginRight: '10px' }}
                                    />
                                    <Button onClick={() => handleUpdateLimit(list.id, newLimit, setError, fetchLists)} variant="contained" color="primary" style={{ marginRight: '10px' }}>Update Limit</Button>
                                    <Button onClick={() => handleUpdateDescription(list.id, newDescription, fetchLists)} variant="contained" color="primary"><span className='buttonName'>Update Description</span></Button>
                                    {addUpdateDescriptionError && <p style={{ color: 'red' }}>{addUpdateDescriptionError}</p>}
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <List>
                                    {list.list.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={item.appName}
                                                    secondary={
                                                        <>
                                                            <Button onClick={() => handleDeleteAppFromListByName(list.id, item.id)} variant="contained" color="primary"><span className='buttonName'>Delete app</span></Button>
                                                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                                                Id: {item.id}
                                                            </Typography><br />
                                                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
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
                                                    style={{ marginRight: '10px', width: '100px' }}
                                                    size="small"
                                                />
                                                <Button onClick={() => handleUpdateAppDescription(list.id, item.id, newAppDescriptions, fetchLists)} variant="contained" color="primary"><span className='buttonName'>Update App Description</span></Button>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </React.Fragment>
                                    ))}
                                </List>
                                <TextField
                                    type="text"
                                    size="small"
                                    style={{ width: '100px' }}
                                    onChange={(e) => setAppId(e.target.value)}
                                    placeholder="New app name"
                                />
                                <TextField
                                    type="text"
                                    size="small"
                                    style={{ width: '100px' }}
                                    onChange={(e) => setAppDescription(e.target.value)}
                                    placeholder="New app description"
                                />
                                <Button onClick={() => handleAddApp(list.id)} variant="contained" color="primary"><span className='buttonName'>Insert ListApp</span></Button>
                                <ListItem>
                                    <Button onClick={() => handleDeleteListById(list.id)} variant="contained" color="primary"><span className='buttonName'>Delete List by ID</span></Button>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )}
                    </React.Fragment>
                ))}
            </List>
           
            {/* </div> */}
        </Container>
    );
};

export default ListComponent;
