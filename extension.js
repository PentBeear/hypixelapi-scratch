class hypixelWrapper {
    getInfo() {
        return {
            "id": "HypixelBazaarWrapper",
            "name": "HypixelBazaarWrapper",
            "blocks": [{
                "opcode": "jsonGetInfo",
                "blockType": "reporter",
                "text": "GetBazaarItem: key: [key] product name: [product] select value: [oper]",
                "arguments": {
                    "key": {
                        "type": "string",
                        "defaultValue": "put ya key here"
                    },
                    "product": {
                        "type": "string",
                        "defaultValue": "INK_SACK:3"
                    },
                    "oper": {
                        "type": "string",
                        "menu": "selectvalue",
                        "defaultValue": "0"
                    },
                }
            }],
            "menus": {
                selectvalue: this._formatMenu(['BuyVolume', 'SellVolume', 'BuyPrice', 'SellPrice', 'BuyOrders', 'SellOrders']),
            }
        };
    }
   async jsonGetInfo ({key, product, oper}) {
    console.log(oper);
    console.log(key);
    console.log(product);
    var output = "";
    var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
    fetch("https://api.hypixel.net/skyblock/bazaar/product?key=" + key + "&productId=" + product)
    .then((resp) => resp.json())
    .then(function(data)
    {
        console.log(data)
        if (oper == 0) {
            console.log("Getting Buy Volume")
            output = JSON.stringify(data.product_info.quick_status.buyVolume)   
            console.log(output);  
 
        }
        if (oper == 1) {
            console.log("Getting Sell Volume")
            output = JSON.stringify(data.product_info.quick_status.sellVolume)  
            console.log(output);  

        }
        if (oper == 2) {
            console.log("Getting Buy Price")
            output = JSON.stringify(data.product_info.quick_status.buyPrice)  
            console.log(output); 
     
        }
        if (oper == 3) {
            console.log("Getting Sell Price")
            output = JSON.stringify(data.product_info.quick_status.sellPrice) 
            console.log(output);   
           
        }
        if (oper == 4) {
            console.log("Getting Buy Orders")
            output = JSON.stringify(data.product_info.quick_status.buyOrders)  
            console.log(output);   
        
        }
        if (oper == 5) {
            console.log("Getting Sell Orders")
            output = JSON.stringify(data.product_info.quick_status.sellOrders)   
            console.log(output);  
           
        }      
    });
    await wait(1000)
    console.log("Returning value! " + output);
    return output
    };

    _formatMenu(menu) {
        const m = [];
        for (let i = 0; i < menu.length; i++) {
            const obj = {};
            obj.text = menu[i];
            obj.value = i.toString();
            m.push(obj);
        }
        return m;
    }
   

}

    
Scratch.extensions.register(new hypixelWrapper());
