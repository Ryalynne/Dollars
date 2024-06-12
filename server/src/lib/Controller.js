import DBConnection from './DBConnection.js';

export const getChats = async () => {

    try {
        const query = await DBConnection.connectDB().query("SELECT * FROM table_chat");
        if (!query[0] || !query[0].length) {
            throw new Error("No chat messages found");
        }
        const chatMessages = query[0];
        return chatMessages; 
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch chat messages");
    }
}


export const postChat = async (formData) => {
    "use server"
    try {
        const { username, message } = Object.fromEntries(formData);
        const query = await DBConnection.connectDB().query(`INSERT INTO table_chat (username, message) VALUES('${username}', '${message}')`);
        if (query[0].serverStatus === 1) {
             return { success: true, message: "Success" };
        } else {
            return { success: false, message: "Failed to insert chat messages" };
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to insert chat messages");
    }
}

