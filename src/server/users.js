let users = []

const addUser = ({id, name, room}) =>{
    let tname = name.trim().toLowerCase() 
    let troom = room.trim().toLowerCase()

    const isExistingUser = users.find(element => element.name === tname && element.room === troom)

    if(isExistingUser){
        return {error: 'User alredy there...'}

    }else{
        const user = {id: id, name: tname, room: troom};
        users.push(user)
        return {user}
    }
    
}

const removeUser = (id) =>{
    let index = users.findIndex(element => element.id === id)
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id) => users.find(element => element.id === id)

module.exports = {addUser, getUser, removeUser}