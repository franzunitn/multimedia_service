/** source/routes/recombeeRoutes.ts */
import express from 'express';
import controller from '../controllers/multimedia_controller';
const router = express.Router();

//registra un utente su loginsystem e recombee
router.post('/register', controller.register);
//logga un utente
router.post('/login', controller.login);

router.get('/top-movies/:limit?', controller.getTopMovie);
router.get('/top-tv/:limit?', controller.getTopTv);
router.get('/top-games/:limit?', controller.getTopGames);

//search cinema: prende in input una query di testo per fare ricerca sul titolo, e user_id.
router.get('/search-cinema/:keywords/:type?/:genre?', controller.searchCinema);
//ritorna oggetti cinema risultato della ricerca e N raccomandazioni per l'utente


//search game: prende in input una query di testo per fare ricerca sul titolo, e user_id.
router.get('/search-games/:keywords/:genre?', controller.searchGame); 
//ritorna oggetti game risultato della ricerca e N raccomandazioni per l'utente

//show movie/serie/film/game
//ritorna l'oggetto richiesto e aggiunge un intereazione di tipo detail 
router.get('/show-movie/:id', controller.showMovie);
router.get('/show-game/:id', controller.showGame);
router.get('/show-tv/:id', controller.showTv);
//ritorna oggetto richiesto e aggiunge interazione purchase (simula visione/aquisto)
router.get('/watch-movie/:id', controller.watchMovie);
router.get('/purchase-game/:id', controller.purchaseGame);
router.get('/watch-tv/:id', controller.watchTv);

//get recomendation for logged user 
router.get('/recomendations/:type/:number', controller.getRecomendations);

export = router;