/** source/controllers/recombeeController.ts */
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { Cinema} from '../models/interfaces';
import {Config} from '../config/config';
import jwt_decode from "jwt-decode";

let config: Config = require('../config/config.json');


const register = async (req: Request, res: Response, next: NextFunction) => {
    //registriamo utente su loginsystem
    try {
        var login_response = await axios.post(config.login_system_url+'/register', req.body);
        var data = await login_response.data;
        try {
            //registiamo su recombee 
            await axios.post(config.recombee_url+'/add-user', {
                token: data.token,
                user_id: data._id
            });
            return res.json(data);
        } catch (e:any){
            res.status(500);
            return res.json({message: e.response.data});
        }    
    } catch (e:any){
        return res.status(500).send({message: e.response.data});
    }
   
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    //loggiamo utente 
    console.log(req.body)
    try {
        var login_response = await axios.post(config.login_system_url+'/login', req.body);
        var data = await login_response.data;
        res.status(200);
        res.json(data);
    } catch (e:any){
        return res.status(500).send({message: e.response.data});
    }
   
};

const searchCinema = async (req:Request, res:Response, next:NextFunction) => {
    //facciamo ricerca dei titoli 
    let keywords = req.params.keywords;
    let type = req.params.type == undefined ? 'all' : req.params.type;
    let genre = req.params.genre == undefined ? 0 : parseInt(req.params.genre);
    //prendiamo user_id dal token 
    let token = req.body.token;
    let user:any = jwt_decode(token);
    let user_id = user.user_id;
    try {
        var film_adapter_response = await axios.get(config.film_adapter_url+'/search-cinema/'+keywords+'/'+type+'/'+genre, {
            headers: {
                'x-access-token': token
            },
          });
        var searched = await film_adapter_response.data;
        try {
            var recombee_response = await axios.get(config.recombee_url+'/get-recomendations'+'/user/'+user_id+'/number/'+5, {
                headers: {
                    'x-access-token': token
                },
            });
            var recom = await recombee_response.data;
            var final = {
                'search-result':searched,
                'recomendation':recom
            }
            res.status(200);
            return res.json(final);
        } catch (e:any){
            //errore recomendation
            return res.status(500).send({message: e.response.data});
        }
    } catch(e:any){
            //errore search 
        return res.status(500).send({message: e.response.data, service:"filmadapter"});
    }


    
}

const searchGame = async (req:Request, res:Response, next:NextFunction) => {
    //facciamo ricerca dei titoli 
    let keywords = req.params.keywords;
    let genre = req.params.genre == undefined ? '' : parseInt(req.params.genre);
    //prendiamo user_id dal token 
    let token = req.body.token;
    let user:any = jwt_decode(token);
    let user_id = user.user_id;
    console.log(config.film_adapter_url+'/search-games/'+keywords+'/'+genre)
    try {
        var film_adapter_response = await axios.get(config.film_adapter_url+'/search-games/'+keywords+'/'+genre, {
            headers: {
                'x-access-token': token
            },
          });
        var searched = await film_adapter_response.data;
        try {
            var recombee_response = await axios.get(config.recombee_url+'/get-recomendations/games'+'/user/'+user_id+'/number/'+5, {
                headers: {
                    'x-access-token': token
                },
            });
            var recom = await recombee_response.data;
            var final = {
                'search-result':searched,
                'recomendation':recom
            }
            res.status(200);
            return res.json(final);
        } catch (e:any){
            //errore recomendation
            return res.status(500).send({message: e.response.data});
        }
    } catch(e:any){
            //errore search 
        return res.status(500).send({message: e.response.data, service:"filmadapter"});
    }
}


const showMovie = async (req:Request, res:Response, next:NextFunction) => {
    //facciamo ricerca dei titoli 
    let keywords = req.params.keywords;
    let genre = req.params.genre == undefined ? '' : parseInt(req.params.genre);
    //prendiamo user_id dal token 
    let token = req.body.token;
    let user:any = jwt_decode(token);
    let user_id = user.user_id;
    console.log(config.film_adapter_url+'/search-games/'+keywords+'/'+genre)
    try {
        var film_adapter_response = await axios.get(config.film_adapter_url+'/search-games/'+keywords+'/'+genre, {
            headers: {
                'x-access-token': token
            },
          });
        var searched = await film_adapter_response.data;
        try {
            var recombee_response = await axios.get(config.recombee_url+'/get-recomendations/games'+'/user/'+user_id+'/number/'+5, {
                headers: {
                    'x-access-token': token
                },
            });
            var recom = await recombee_response.data;
            var final = {
                'search-result':searched,
                'recomendation':recom
            }
            res.status(200);
            return res.json(final);
        } catch (e:any){
            //errore recomendation
            return res.status(500).send({message: e.response.data});
        }
    } catch(e:any){
            //errore search 
        return res.status(500).send({message: e.response.data, service:"filmadapter"});
    }
}
export default { register, login, searchCinema, searchGame};