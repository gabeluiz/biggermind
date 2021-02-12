import nextConnect from 'next-connect';
import bancoDados from '../../utils/database';
import { ObjectID } from 'mongodb';

const handler = nextConnect();

handler.use(bancoDados);

handler.get(async (req, res) => {

    const dataModel = {
        "_id": new ObjectID(),
        "nome_logo": "nome_logo",
        "facebook_url": "facebook_url",
        "instagram_url": "instagram_url",
        "whatsapp_url": "whatsapp_url",
        "whatsapp_titulo": "whatsapp_titulo",
        "img_principal": "img_principal",
        "titulo": "titulo",
        "sub_titulo": "sub_titulo",
        "img_card_um": "img_card_um",
        "titulo_card_um": "titulo_card_um",
        "sub_titulo_card_um": "sub_titulo_card_um",
        "img_card_dois": "img_card_dois",
        "titulo_card_dois": "titulo_card_dois",
        "sub_titulo_card_dois": "sub_titulo_card_dois",
        "img_card_tres": "img_card_tres",
        "titulo_card_tres": "titulo_card_tres",
        "sub_titulo_card_tres": "sub_titulo_card_tres",
        "titulo_landing": "titulo_landing",
        "sub_titulo_landing": "sub_titulo_landing",
        "titulo_sub_landing_um": "titulo_sub_landing_um",
        "sub_titulo_sub_landing_um": "sub_titulo_sub_landing_um",
        "titulo_sub_landing_dois": "titulo_sub_landing_dois",
        "sub_titulo_sub_landing_dois": "sub_titulo_sub_landing_dois",
        "titulo_sub_landing_tres": "titulo_sub_landing_tres",
        "sub_titulo_sub_landing_tres": "sub_titulo_sub_landing_tres",
        "titulo_form_contato": "titulo_form_contato",
        "sub_titulo_form_contato": "sub_titulo_form_contato",
        "titulo_button_form_contato": "titulo_button_form_contato",
        "titulo_footer": "titulo_footer",
        "sub_titulo_footer": "sub_titulo_footer",
        "link_util_um": "link_util_um",
        "link_util_dois": "link_util_dois",
        "link_util_tres": "link_util_tres",
        "link_util_quatro": "link_util_quatro",
        "link_outros_um": "link_outros_um",
        "link_outros_dois": "link_outros_dois",
        "link_outros_tres": "link_outros_tres",
        "link_outros_quatro": "link_outros_quatro",
    }

    let doc = {}
    doc = await req.db.collection('site').find({}).toArray();

    if (doc == null) {
        doc = dataModel
    }
    res.json(doc)
});

handler.post(async (req, res) => {
    let data = req.body
    data = JSON.parse(data);

    //Esse update é um tipo de update espertão, com o parametro upsert:true ele faz insert caso não exista ID igual no banco.
    if (!data._id) {
        data._id = new ObjectID();
    }

    let doc = await req.db.collection('site').updateOne({ _id: data._id }, { $set: data }, { upsert: true })

    res.json({ message: 'ok' });
})

export default (req, res) => handler.run(req, res) 