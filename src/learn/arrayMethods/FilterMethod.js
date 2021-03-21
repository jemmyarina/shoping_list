
const items =[
    {name:'Bike', price:230},
    {name:'TV', price:500},
    {name:'Glue', price:2},
    {name:'Computer', price:2000},
    {name:'Mouse', price:100},
    {name:'Keyboard', price:10}
]

const filteredItem=items.filter(itm=>{
    return itm.price>200
})
console.log(" Original array");
console.log("================");
console.log(items);
console.log(" Filtered array");
console.log("================");
console.log(filteredItem)

// to display this: node src/learn/FilterMethod