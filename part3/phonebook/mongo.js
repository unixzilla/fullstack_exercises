const mongoose = require('mongoose')

//check command has sufficient params 
if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
//get password from command input
const password = process.argv[2]

//Define DB connection  //<username>:<password>@host/<database>?privileges
const url = `mongodb+srv://fullstackMongoDB:${password}@cluster0.lec8r.mongodb.net/phonebook?retryWrites=true&w=majority`

// connect to DB
mongoose.connect(url)

// Collection(table) schema
const personSchema = new mongoose.Schema({
    name:String,
    number:String,
})
//get data model object
const Person = mongoose.model('Person',personSchema)

//insert new document
if(process.argv.length === 5){
    const name = process.argv[3]
    const phoneNumber = process.argv[4]
    const person = Person({
        name:name,
        number:phoneNumber,
    })
    person.save().then(result=>{
        console.log('person added to phonebook')
        //finish insert task, close the connection
        mongoose.connection.close()
    })
}

//fatch all documents
if(process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(persons => {
        persons.forEach(person=>{
            console.log(`${person.name} ${person.number}`)
        })
        //finish query, close the connection
        mongoose.connection.close()
    })
}


