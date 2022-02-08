/** source/routes/recombeeRoutes.ts */
import express from 'express';
import controller from '../controllers/multimedia_controller';
const router = express.Router();

//registra un utente su loginsystem e recombee
router.post('/register', controller.register);
//logga un utente
router.post('/login', controller.login);
//search cinema: prende in input una query di testo per fare ricerca sul titolo, e user_id.
router.get('/search-cinema/:keywords/:type?/:genre?', controller.searchCinema);
//ritorna oggetti cinema risultato della ricerca e N raccomandazioni per l'utente


//search game: prende in input una query di testo per fare ricerca sul titolo, e user_id.
router.get('/search-games/:keywords/:genre?', controller.searchGame); 
//ritorna oggetti game risultato della ricerca e N raccomandazioni per l'utente

//show movie/serie/film/game
//ritorna l'oggetto richiesto e aggiunge un intereazione di tipo detail 
router.get('/show-movie/:id', controller.searchGame);
router.get('/show-game/:id', controller.searchGame);
router.get('/show-serie/:id', controller.searchGame);

//watch movie/serie/film/game
//simula la visualizzazione di un film o l'aver comprato un gioco e aggiunge un interazione di tipo purchase

//get recomendation for logged user 


//init-user-interaction
//aggiunge N utenti e N raccomandazioni per inizializzare l'applicazione

export = router;