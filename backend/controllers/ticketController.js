// backend/controllers/ticketController.js
const db = require('../db');

// Load configuration
exports.getConfig = (req, res) => {
    db.query('SELECT * FROM configurations LIMIT 1', (err, result) => {
        if (err) {
            return res.status(500).send('Error retrieving configuration');
        }
        res.json(result[0]);
    });
};

// Add tickets (vendor action)
exports.addTickets = (req, res) => {
    const { count } = req.body;
    const tickets = Array(count).fill(['available']);
    db.query('INSERT INTO tickets (status) VALUES ?', [tickets], (err) => {
        if (err) {
            return res.status(500).send('Error adding tickets');
        }
        res.send(`Successfully added ${count} tickets.`);
    });
};

// Book a ticket (user action)
exports.bookTicket = (req, res) => {
    db.query("SELECT * FROM tickets WHERE status = 'available' LIMIT 1", (err, tickets) => {
        if (err || tickets.length === 0) {
            return res.status(404).send('No available tickets');
        }
        const ticketId = tickets[0].ticket_id;
        db.query('UPDATE tickets SET status = "booked" WHERE ticket_id = ?', [ticketId], (err) => {
            if (err) {
                return res.status(500).send('Error booking ticket');
            }
            res.send(`Successfully booked ticket ${ticketId}.`);
        });
    });
};
