import fs from "fs";

export const _insertData = (data: any) => {
    const _dataToAdd = JSON.stringify(data)
    fs.writeFileSync('src/users.json', _dataToAdd)
}

export const _fetchData = () => {
    const _dataToFetch = fs.readFileSync('src/users.json', 'utf-8')
    return JSON.parse(_dataToFetch);
}

export const getRandomInt = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
