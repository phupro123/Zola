require('dotenv').config();

const classifyPostText = async (text) => {

    // const response = await fetch(
    //     `${process.env.AI_SERVICE_URL}/text-classifier`,
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             text: text,
    //         }),
    //     }
    // )
    const data ={text:text};
    console.log(data);
    // return data;
};

module.exports = { classifyPostText };
