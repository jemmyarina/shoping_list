
const items =[
    {name:'Bike', price:230, time:20},
    {name:'TV', price:500},
    {name:'Glue', price:2},
    {name:'Computer', price:2000},
    {name:'Mouse', price:100},
    {name:'Keyboard', price:10}
]

const newArray=items.map(itm=>{
    return itm.name
})
console.log(items);
console.log(newArray)