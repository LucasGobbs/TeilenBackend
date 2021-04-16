import * as fs from 'fs'
interface User {
    id: string
    name: string
}
export class UserRepository {
    static get(id: string): Promise<User>{
        try{
            const users =  UserRepository.list();
            const user = users['id']
            if(user){return user}
        }catch(error){
            return error;
        }
    }
    static list(): Promise<any> {
        try{
            const raw_data = fs.readFileSync("./static_clients.json");
            const data = JSON.parse(JSON.stringify(raw_data));
            return data['users']

        }catch(error){
            return error;
        }
    }
}