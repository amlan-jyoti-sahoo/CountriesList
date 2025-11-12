const express = require('express');
const app = express();
const PORT = 3000;

// --- 1. SIMULATED DATABASE DATA ---
// A simple array to simulate a table of names (countries in this case)
const namesDatabase = [
    { id: 1, name: "Afghanistan" }, { id: 2, name: "Brazil" },
    { id: 3, name: "Canada" },      { id: 4, name: "Denmark" },
    { id: 5, name: "Egypt" },       { id: 6, name: "France" },
    { id: 7, name: "Germany" },     { id: 8, name: "India" },
    { id: 9, name: "Japan" },       { id: 10, name: "Kenya" },
    { id: 11, name: "Lebanon" },    { id: 12, name: "Mexico" },
    { id: 13, name: "Norway" },     { id: 14, name: "Oman" },
    { id: 15, name: "Peru" },       { id: 16, name: "Qatar" },
    { id: 17, name: "Russia" },     { id: 18, name: "Spain" },
    { id: 19, name: "Thailand" },   { id: 20, name: "Uganda" },
    { id: 21, name: "Vietnam" },    { id: 22, name: "Yemen" },
];
const TOTAL_COUNT = namesDatabase.length;

// --- 2. API ENDPOINT WITH PAGINATION LOGIC ---
app.get('/names', (req, res) => {
    // 3. Extract and Sanitize Parameters
    // Parse query parameters, defaulting to 20 for limit and 0 for offset
    const defaultLimit = 5;
    const defaultOffset = 0;

    // Use parseInt() to ensure they are treated as numbers
    let limit = parseInt(req.query.limit) || defaultLimit;
    let offset = parseInt(req.query.offset) || defaultOffset;

    // Optional: Add bounds checks
    if (limit <= 0 || offset < 0) {
        return res.status(400).json({ error: "Limit must be positive and Offset non-negative." });
    }
    
    // Cap limit to prevent fetching too much data at once
    limit = Math.min(limit, 100); 

    // --- 4. Apply Pagination Logic (Simulating SQL LIMIT/OFFSET) ---
    // JavaScript Array.slice(start, end)
    const startIndex = offset;
    const endIndex = offset + limit;

    const paginatedNames = namesDatabase.slice(startIndex, endIndex);

    // --- 5. Construct and Send Response ---
    const response = {
        meta: {
            total_count: TOTAL_COUNT,
            limit: limit,
            offset: offset,
            // You could also calculate next/prev URLs here
        },
        data: paginatedNames,
    };

    res.status(200).json(response);
});

// --- 6. START THE SERVER ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Try: http://localhost:${PORT}/names?offset=5&limit=3`);
});