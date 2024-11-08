const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.get('/config', ticketController.getConfig);
router.post('/addTickets', ticketController.addTickets);
router.post('/bookTicket', ticketController.bookTicket);

module.exports = router;
