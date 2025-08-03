import axios from "axios";
export async function updatePremiumStatus(token : string) {

    if(!token) return;

    try {
        const updateStatus = await axios.put("http://localhost:8080/auth/addSubscription", {}, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log(updateStatus.data);
        return updateStatus;

    } catch (error) {
        console.error("Error verifying order:", error);
    }   
    
}