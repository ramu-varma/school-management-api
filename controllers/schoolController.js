const db = require('../db/db');
const { calculateDistance } = require('../utils/distanceCalculator');

/**
 * Add a new school
 */
exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, address, latitude, longitude];
    
    await db.query(query, values);
    
    res.status(201).json({
      success: true,
      message: 'School added successfully'
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while adding school'
    });
  }
};

/**
 * List schools sorted by distance
 */
exports.listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid latitude or longitude provided'
    });
  }

  try {
    const result = await db.query('SELECT * FROM schools');
    const schools = result.rows;

    const sortedSchools = schools.map(school => {
      const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
      return {
        ...school,
        distance_km: distance
      };
    }).sort((a, b) => a.distance_km - b.distance_km);

    res.status(200).json(sortedSchools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching schools'
    });
  }
};
