const express = require('express')
const axios = require('axios')
const cheerio  = require('cheerio')

const app =express()
// separate arrays created for all data 
let priceArray = [] 
let areaArray = []
let urlArray = []
let dateArray = []

const dataScraping = async ()=>{
    try {
        const response = await axios.get('https://www.nobroker.in/flats-for-sale-in-koramangala_bangalore')

        const htmlData = response.data
        const $ = cheerio.load(htmlData)

        $('.font-semi-bold.heading-6').each(function(){
            const price = $(this).find('span').text()
            if(price!=='' && price !=='₹'){
                priceArray.push({
                    price 
                })
            }
        })
    
        $('#unitCode').each(function(){
            const area = $(this).text()
            areaArray.push({
                area 
            }) 
        })

        $('.heading-6.flex.items-center.font-semi-bold.m-0').each(function(){
            const head = 'https://www.nobroker.in/'
            let url = $(this).find('a').attr('href')
            url=head + url
            urlArray.push({
                url
            }) 
        })
        
        for (const element of urlArray) {
            const dateResponse = await axios.get(element.url);
            const dateData = dateResponse.data;
            const $date = cheerio.load(dateData);
      
            $date('#details-summary-lastUpdateDate').each(function () {
              const date = $(this).text();
              dateArray.push({
                date,
              });
            });
          }


        console.log(priceArray);
        console.log(areaArray);
        console.log(urlArray);
        console.log(dateArray);


    } catch (error) {
        console.log(error);
    }
}

dataScraping();

app.listen(4000,()=>{
    console.log('server is running on port 4000');
})


