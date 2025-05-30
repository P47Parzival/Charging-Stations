const mongoose = require('mongoose');

const chargingStationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    powerOutput: {
        type: Number,
        required: true
    },
    connectorType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create index for geospatial queries
chargingStationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('ChargingStation', chargingStationSchema); 