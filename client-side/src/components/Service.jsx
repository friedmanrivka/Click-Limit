import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
// const API_URL1 = 'http://localhost:8080/api/list/B';
export const getList = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lists:', error);
        throw error;
    }
};

export const createList = async (listData) => {
    try {console.log(listData)

        const response = await axios.post(`${API_URL}/list/add`, listData);
        console.log(response)

        return response.data;
    } catch (error) {
        console.error('Error creating list:', error);
        throw error;
    }
};
export const deleteListById = async (id) => {
    try {
        console.log(id); 

        const response = await axios.delete(`${API_URL}/list/${id}`);
        console.log('1'); 
        return response.data;
    } catch (error) {
        console.error('Error deleting list:', error);
        throw error; 
    }
};
export const convertListToString = async () => {
    try {
        const response = await axios.get(`${API_URL}/list/convert`);
        return response.data;
    } catch (error) {
        console.error('Error converting list to string:', error);
        throw error;
    }
};
export const deleteAppFromList = async (listId, appId) => {
    try {
        const response = await axios.delete(`${API_URL}/list/${listId}/app/${appId}`);
        return response.data;
    }
    catch(error){
        console.error('Error deleting app from list:', error);
        throw error;
    }
};

export const addApp = async (listId,app) => {
    try {
        const response = await axios.post(`${API_URL}/list/${listId}/app`, app);
        return response.data;
        } catch (error) {
            console.error('Error deleting app from list:', error);
            throw error;
        }
    };

export const isStringInList = async (i) => {
    try {
        const response = await axios.get(`${API_URL}/list/isStringInList/${i}`);
        return response.data;
    } catch (error) {
        console.error('Error checking if string is in list:', error);
        throw error;
    }
};
export const getListByLimit=async (limit)=>{
    try{
        const response=await axios.get(`${API_URL}/list/limit/${limit}`);
        return response.data;
    }
    catch (error) {
        console.error('Error getting list by limit:', error);
        throw error;
    }
        
};
export const getListByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/list/id/${name}`);
        return response.data;
    } catch (error) {
       
        throw error;
    }
};
export const updateLimit = async (id, newLimit) => {
    try {
        const response = await axios.put(`${API_URL}/list/${id}/limit`, { limit: newLimit });
        return response.data;
    } catch (error) {
        console.error('Error updating limit:', error);
        throw error;
    }
};
export const updateDescription = async(id, newDescription) =>{
    try{
        const response = await axios.put(`${API_URL}/list/${id}/description`,{description: newDescription});
        return response.data;
    }
    catch(error){
        console.error('Error updating description:', error);
        throw error;
    }
    };
    export const updateAppDescription = async(id,appId, newAppDescription) =>{
        try{
            const response= await axios.put(`${API_URL}/list/id/${id}/app/${appId}/description`,{description:newAppDescription });
                return response.data;
        }
        catch(error){
                console.error('Error updating description:', error);
        throw error;
        }
    };
