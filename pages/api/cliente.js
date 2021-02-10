import nextConnect from 'next-connect';
import bancoDados from '../../utils/database';
import {ObjectID} from 'mongodb';

const handler = nextConnect();

handler.use(bancoDados);

handler.get(async (req, res) => {

    const dataModel = { "_id": new ObjectID(), "name": "name", "email": "email", "telefone": "telefone", "mensagem": "mensagem"}

    let doc = {}
    doc = await req.db.collection('cliente').find({}).toArray();

    if(doc == null){    
        doc = dataModel
    }
    res.json(doc)
});

handler.post(async (req, res) => {
    let data = req.body
    data = JSON.parse(data);

    //Esse update é um tipo de update espertão, com o parametro upsert:true ele faz insert caso não exista ID igual no banco.
    if(!data._id){
        data._id = new ObjectID();
    }

    let doc = await req.db.collection('cliente').updateOne({_id:data._id}, {$set:data}, {upsert: true})

    res.json({message: 'ok'});
})

export default (req, res) => handler.run(req, res) 