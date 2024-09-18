require('dotenv').config();
const { ZammadApi } = require('./index');
const {ZAMMAD_URL,ZAMMAD_USER,ZAMMAD_PSW} = process.env;
const zammad = new ZammadApi(ZAMMAD_URL,ZAMMAD_USER,ZAMMAD_PSW);

// Call the API and log results
/*
zammad.doGetCall('tickets').then((tickets) => {
    console.log(tickets);
}).catch((error) => {
    console.error('Error:', error);
});
*/

// Call the API and log results doGetCallWithParams(endpoint, params) 
// Search user by email
const testByEmail = async (email) => {
    try {
        const userInfo = await zammad.doGetCallWithParams('/users/search', { query: `email:${email}` });
        
        console.log('User Info:', userInfo); // Log for debugging
        if (userInfo && userInfo.length > 0) {
            return userInfo[0].id; // Return user ID
        } else {
            return null; // Return null if no user is found
        }
    } catch (error) {
        console.error('Error in testByEmail:', error);
        return null; // Return null on error
    }
};
const ticketBycustomerId = async (customerId) => {
    try {
        const userTicket = await zammad.doGetCallWithParams('/tickets/search', { query: `customer_id:${customerId}` });
        
        console.log('User Ticket fetched:', userTicket); // Log for debugging
        if (userTicket && userTicket.length > 0) {
            return userTicket; // Return user ID
        } else {
            return null; // Return null if no user is found
        }
    } catch (error) {
        console.error('Error in ticketBycustomerId:', error);
        return null; // Return null on error
    }
};

const testTicketsByEmail = async (email) => {
    try{
        const fetchUserId = await testByEmail(email);
        if(!fetchUserId){throw new Error ('Nessun utente trovato');}
        else{
            console.log('ID:',fetchUserId);
            const userTickets = await ticketBycustomerId(4609);
            if(!userTickets){throw new Error ('Nessun ticket trovato');}
            else{
                console.log('User Ticket:',userTickets);
            }
        }
    }
    catch(e){
        console.log('Error:', e);
    }
};

testTicketsByEmail('supporto@work-in.it');