import { NextApiRequest, NextApiResponse } from 'next';
import connect from "../../utils/database";

interface ErrorResponseType{
    error: string;
}

interface SuccesResponseType{
    _id: string;
    name: string;
    email: string;
    password: string;
    profile: string;
}



export default  async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SuccesResponseType>
): Promise<void> => {
    if (req.method === "POST"){
        
        const {name, email, password, profile} = req.body;

        if(!name || !email || !password || !profile){
            res.status(400).json({error:'Missing body parameter'});
            return;
        }

        const {db} = await connect();

        const response = await db.collection('users').insertOne({
            name,
            email,
            password,
            profile,
        });
    
        res.status(200).json(response.ops[0]);
    }else{

        res.status(400).json({error: 'Wrong request'});
    }
}