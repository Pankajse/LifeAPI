const axios = require('axios');

module.exports.askChatbot = async (question) => {
    try {
        const response = await axios.post("http://localhost:1234/v1/chat/completions", {
            model: "deepseek-r1-distill-qwen-14b",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful and concise health assistant. Provide direct and accurate answers to health-related questions without unnecessary explanations."
                },
                {
                    role: "user",
                    content: question
                }
            ],
            max_tokens: 300, // Limit the response length
            temperature: 0.3 // Lower temperature for more focused answers
        });

        // Extract the chatbot's response
        const answer = response.data.choices[0].message.content;

        // Return the response
        return answer;
    } catch (error) {
        // Log the full error for debugging
        console.error("Error asking chatbot:", error.response ? error.response.data : error.message);
        throw error;
    }
};