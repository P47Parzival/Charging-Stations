const ChargingStation = require('../models/ChargingStation');

exports.createStation = async (req, res) => {
    try {
        const station = new ChargingStation(req.body);
        await station.save();
        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ message: 'Error creating charging station' });
    }
};

exports.getAllStations = async (req, res) => {
    try {
        const stations = await ChargingStation.find();
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching charging stations' });
    }
};

exports.updateStation = async (req, res) => {
    try {
        const station = await ChargingStation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!station) {
            return res.status(404).json({ message: 'Charging station not found' });
        }
        res.json(station);
    } catch (error) {
        res.status(500).json({ message: 'Error updating charging station' });
    }
};

exports.deleteStation = async (req, res) => {
    try {
        const station = await ChargingStation.findByIdAndDelete(req.params.id);
        if (!station) {
            return res.status(404).json({ message: 'Charging station not found' });
        }
        res.json({ message: 'Charging station deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting charging station' });
    }
}; 