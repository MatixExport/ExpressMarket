const config = require('../config/config')



fetchGroq = async (method,url,data)=>{
    let fetch_data = {
        method: method,
        headers:{

        }
    };
    if (data) {
        fetch_data['headers']['Content-Type'] = 'application/json'
        fetch_data['headers']['Authorization'] = `Bearer `+config['GROQ_AUTH'];
        fetch_data['body'] = JSON.stringify(data);
    }
    let response = await fetch(url, fetch_data);
    let responseBody = await response.json();
    return {status:response.status,body:responseBody}
}


getSeoDescFromGroq = async (product)=>{
    return await fetchGroq(
        "POST",
        "https://api.groq.com/openai/v1/chat/completions",
        {
            messages: [
              {
                "role": "user",
                "content": "Genereate product description optimized for search engines(SEO) based on {name,description,price,weight} \n {\""+product.name+"\", \""+product.description+"\", \""+product.price.toString()+"\",  \""+product.weight.toString()+"\"}.\n Reply only with description itself"
              },
              
            ],
            model: "llama3-8b-8192",
            max_tokens: 60,
          }
    )
}

module.exports = {getSeoDescFromGroq}