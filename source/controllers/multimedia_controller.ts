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
            res.status(200);
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
    let token = req.header('x-access-token');
    if (token == undefined){
        return res.status(500).send({message: 'Cant find access token'});;
    }
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
    let token = req.header('x-access-token');
    if (token == undefined){
        return res.status(500).send({message: 'Cant find access token'});;
    }
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


const intercat_show_purchase = async (req:Request, res:Response, next:NextFunction, type:string, interaction:string) => {
    //facciamo ricerca dei titoli 
    let id = req.params.id;
    let recombee_id = type+'-'+id;
    if (type == 'movie'){
        var searchurl = config.film_adapter_url+'/movie/'+id;
    } else if (type == 'tv'){
        var searchurl = config.film_adapter_url+'/tv/'+id;
    } else if (type == 'game'){
        var searchurl = config.film_adapter_url+'/game/'+id;
    } else {
        return null;
    }
    //prendiamo user_id dal token 
    let token = req.header('x-access-token');
    if (token == undefined){
        return res.status(500).send({message: 'Cant find access token'});;
    }
    let user:any = jwt_decode(token);
    let user_id = user.user_id;
   
    
    try {
        var film_adapter_response = await axios.get(searchurl, {
            headers: {
                'x-access-token': token
            },
          });
        var result = await film_adapter_response.data;
        try {
            var recom_response = await axios.post(config.recombee_url+'/add-interaction', {
                 
                user_id:user_id, 
                item_id:recombee_id,
                interaction_type: interaction,
                
            },
            { 
                headers: {
                "x-access-token": token
                }
            });
            res.status(200);
            return res.json(result);
        } catch (e:any){
            //errore recomendation
            return res.status(500).send({message: e.response.data, service:"recombee"});
        }
    } catch(e:any){
            //errore search 
        return res.status(500).send({message: e.response.data, service:"filmadapter"});
    }
}

const showMovie = async (req:Request, res:Response, next:NextFunction) => {
    return intercat_show_purchase(req,res,next, 'movie', 'detail_view');
}
const showTv = async (req:Request, res:Response, next:NextFunction) => {
    return intercat_show_purchase(req,res,next, 'tv', 'detail_view');
}
const showGame = async (req:Request, res:Response, next:NextFunction) => {
    return intercat_show_purchase(req,res,next, 'game', 'detail_view');
}
const watchMovie = async (req:Request, res:Response, next:NextFunction) => {
    return intercat_show_purchase(req,res,next, 'movie', 'purchase');
}
const watchTv = async (req:Request, res:Response, next:NextFunction) => {
    return intercat_show_purchase(req,res,next, 'tv', 'purchase');
}
const purchaseGame = async (req:Request, res:Response, next:NextFunction) => {
    return intercat_show_purchase(req,res,next, 'game', 'purchase');
}


const getRecomendations = async (req:Request, res:Response, next:NextFunction) => {
    //prendiamo user_id dal token 
    let token = req.header('x-access-token');
    if (token == undefined){
        return res.status(500).send({message: 'Cant find access token'});;
    }
    let user:any = jwt_decode(token);
    let user_id = user.user_id;
    let number = parseInt(req.params.number);
    let type = req.params.type;

        try {
            var recombee_response = await axios.get(config.recombee_url+'/get-recomendations/'+type+'/user/'+user_id+'/number/'+number, {
                headers: {
                    'x-access-token': token
                },
            });
            var recom = await recombee_response.data;
            res.status(200);
            return res.json(recom);
        } catch (e:any){
            //errore recomendation
            return res.status(500).send({message: e.response.data});
        }
}


export default { register, login, searchCinema, searchGame, showMovie, showGame, showTv, watchMovie, watchTv, purchaseGame, getRecomendations};