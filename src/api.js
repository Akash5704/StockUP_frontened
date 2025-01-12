import axios from "axios"
const URL = "http://localhost:3000"
export async function get(user) {

    // https://localhost:3000/posts/12345
    const response = await axios.get(`${URL}/users/${user}`)
    if(response.status == 200){
        return response.data
    }
    else{
        return
    }   
}

export async function createUser(user) {
    // http://localhost:3000/users,
    const respone = await axios.post(`${URL}/users`,user)
    return respone
}


export async function verifyUser(user) {
    const response = await axios.post(`${URL}/users/login`,user)
    console.log(response);
    
    if(response.data.success){
        return response.data.token
    }
    else{
        return
    }
}



// Buy a Stocks
export async function buyStock(user,stock,total,quantity) {
    const payload = { user, stock, total,quantity };
    const response = await axios.post(`${URL}/users/buy`,payload)
    console.log(response);
    
    if(response.data.success){
        return response.data.token
    }
    else{
        return
    }
}

// Sell a Stocks
export async function sellStock(user,stock,total,quantity) {
    const payload = { user, stock, total,quantity };
    const response = await axios.post(`${URL}/users/sell`,payload)
    console.log(response);
    
    if(response.data.success){
        return response.data.token
    }
    else{
        return
    }
}

// Getting Users Stocks
export async function usersStocks(email) {
    try {
        const response = await axios.post(`${URL}/users/portfolio`, { email });
        console.log(response.data); // Debug to ensure the correct structure
        if (response.data.success) {
            return response.data.data; // Return the full document, including stocks
        } else {
            console.error(response.data.message); // Log failure messages
            return null;
        }
    } catch (error) {
        console.error("Error fetching user stocks:", error);
        throw error;
    }
}
