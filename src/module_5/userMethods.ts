import USERS, { Hobbies, User } from './userdDatabase';

let userDataBase = USERS;

const getUsers = () => userDataBase.map(({ id, name, email }) => ({ id, name, email }));

const getUser = (id: number): Omit<User, 'hobbies'> | null => {
    const user = userDataBase.find((user) => user.id === id);
    if (user) {
        const { id, name, email } = user
        return { id, name, email }
    }
    return null
};

const addUser = (user: User): User => {
    userDataBase.push(user);
    return user;
};

const editUser = (editedUser: User): User | null => {
    const userIndex = userDataBase.findIndex((user) => user.id === editedUser.id)
    if (!userIndex) {
        return null
    }
    const updatedUser = {
        ...userDataBase[userIndex],
        ...editedUser
    }
    userDataBase.splice(userIndex, 1, updatedUser);
    return updatedUser;
};

const deleteUser = (id: number): null | undefined => {
    const user = getUser(id);
    if (user === null) {
        return null
    }

    userDataBase = userDataBase.filter((user) => user.id !== id);
    return undefined;
}

const updateUserHobby = ({ id, hobbies }: Pick<User, 'id' | 'hobbies'>): User | null => {
    const userToUpdate = getUser(id);
    if (userToUpdate) {
        const editedUser = ({
            ...userToUpdate,
            hobbies
        })
        editUser(editedUser);
        return editedUser;
    }
    return null;
}

const addHobby = ({ id, hobbies }: Pick<User, 'id' | 'hobbies'>): User | null => {
    return updateUserHobby({ id, hobbies })
}

const deleteHobbies = (id: number): null | undefined => {
    const user = getUser(id);
    if (user === null) {
        return null
    }
    updateUserHobby({ id, hobbies: [] });
    return undefined;
}

const getUserHobbies = (id: number): Hobbies | null => {
    const user = userDataBase.find((user) => user.id === id);
    if (user) {
        return user.hobbies;
    }
    return null;
}

export { getUsers, getUser, addUser, editUser, deleteUser, addHobby, deleteHobbies, getUserHobbies }
